"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useMutation } from "react-query";
import { auth } from "@/apis/auth";
import { useSignupStore } from "@/store/signup-store";
import LoadingOverlay from "@/components/custom/loading-overlay";
import WelcomeSvg from "@/assets/welcome-svg.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/custom/logo";
import Link from "next/link";

const step1Schema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Host Step 1 Schema (includes address)
const hostStep1Schema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  companyAddress: z.string().min(1, { message: "Please enter your address" }),
});

const step2Schema = z
  .object({
    phoneNumber: z
      .string()
      .min(10, { message: "Please enter a valid phone number" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Please confirm your password" }),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

const SignUpForm = () => {
  const { step, signupData, setStep, setSignupData, resetStore } =
    useSignupStore();

  const searchParams = useSearchParams();
  const accountType = searchParams?.get("accountType") || "customer";
  const isHost = accountType === "host";
  const totalSteps = 2; // Both have 2 steps now

  // Get the OTP step number (step 3 for both)
  const otpStep = 3;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // OTP State
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(600);
  const [showResendSuccess, setShowResendSuccess] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Step 2 Error State
  const [step2Error, setStep2Error] = useState("");

  // Google Sign-In Error State
  const [googleSignInError, setGoogleSignInError] = useState("");

  // Terms checkbox state (for hosts)
  const [termsAccepted, setTermsAccepted] = useState(
    signupData.termsAccepted || false,
  );

  const { mutateAsync: GetOtp } = useMutation(auth.getOtp);
  const { mutateAsync: SignUp } = useMutation(auth.signUp);
  const { mutateAsync: CheckEmailExists } = useMutation(auth.checkEmailExists);
  const { mutateAsync: CheckPhoneExists } = useMutation(auth.checkPhoneExists);
  const { mutateAsync: GoogleSignIn } = useMutation(auth.googleSignIn);

  // Email & Phone availability state: null = not checked, true = available, false = taken
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [phoneAvailable, setPhoneAvailable] = useState<boolean | null>(null);
  const [phoneCheckMsg, setPhoneCheckMsg] = useState("");
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const emailCheckTimer = useRef<NodeJS.Timeout | null>(null);
  const phoneCheckTimer = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  // Google Sign-In Client ID
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Load Google Identity Services script
  useEffect(() => {
    if (!googleClientId || isHost) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, [googleClientId, isHost]);

  // Initialize forms with persisted data
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: signupData.firstName || "",
      lastName: signupData.lastName || "",
      email: signupData.email || "",
    },
    mode: "onChange",
  });

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      phoneNumber: signupData.phoneNumber || "",
      password: signupData.password || "",
      passwordConfirm: signupData.passwordConfirm || "",
      referralCode: signupData.referralCode || "",
    },
    mode: "onChange",
  });

  // Host Step 1 Form (includes address)
  const hostStep1Form = useForm<z.infer<typeof hostStep1Schema>>({
    resolver: zodResolver(hostStep1Schema),
    defaultValues: {
      firstName: signupData.firstName || "",
      lastName: signupData.lastName || "",
      email: signupData.email || "",
      companyAddress: signupData.companyAddress || "",
    },
    mode: "onChange",
  });

  // Handle Google Sign-In (defined after forms)
  const handleGoogleSignIn = useCallback(() => {
    if (!googleClientId) {
      console.error("Google Client ID not configured");
      return;
    }

    // @ts-expect-error - Google Identity Services types
    if (!window.google?.accounts?.oauth2) {
      console.error("Google Identity Services not loaded");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Connecting to Google...");
    setGoogleSignInError(""); // Clear any previous error

    // @ts-expect-error - Google Identity Services types
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: googleClientId,
      scope: "email profile",
      callback: async (response: { access_token?: string; error?: string }) => {
        if (response.error) {
          setIsLoading(false);
          setLoadingMessage("");
          setGoogleSignInError(
            "Google sign-in was cancelled or failed. Please try again.",
          );
          console.error("Google Sign-In error:", response.error);
          return;
        }

        try {
          setLoadingMessage("Signing you in...");

          // Call the googleSignIn API with the access token
          const signInResponse = await GoogleSignIn({
            payload: {
              accessToken: response.access_token,
              deviceToken: "web",
            },
          });

          // If we get a JWT token back, show success modal
          if (
            signInResponse?.token ||
            signInResponse?.jwt ||
            signInResponse?.data?.token
          ) {
            setShowSuccessModal(true);
          } else {
            // If no token but successful, still show success
            setShowSuccessModal(true);
          }
        } catch (error: any) {
          console.error("Google Sign-In error:", error);
          setGoogleSignInError(
            error?.response?.data?.message ||
              "Google sign-up failed. Please try again.",
          );
        } finally {
          setIsLoading(false);
          setLoadingMessage("");
        }
      },
    });

    client.requestAccessToken();
  }, [googleClientId, GoogleSignIn]);

  // Company name state for hosts (optional field in step 2)
  const [companyName, setCompanyName] = useState(signupData.companyName || "");

  // Debounced email availability check
  const checkEmailAvailability = useCallback(
    async (email: string) => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailAvailable(null);
        setEmailCheckMsg("");
        setIsCheckingEmail(false);
        return;
      }
      setIsCheckingEmail(true);
      try {
        await CheckEmailExists({ payload: { email } });
        setEmailAvailable(true);
        setEmailCheckMsg("Email is available");
      } catch (error: any) {
        setEmailAvailable(false);
        setEmailCheckMsg(
          error?.response?.data?.message || "Email is not available",
        );
      } finally {
        setIsCheckingEmail(false);
      }
    },
    [CheckEmailExists],
  );

  // Debounced phone availability check
  const checkPhoneAvailability = useCallback(
    async (phone: string) => {
      if (!phone || phone.length < 10) {
        setPhoneAvailable(null);
        setPhoneCheckMsg("");
        setIsCheckingPhone(false);
        return;
      }
      setIsCheckingPhone(true);
      try {
        await CheckPhoneExists({
          payload: { phoneNumber: `234${phone.replace(/^0+/, "")}` },
        });
        setPhoneAvailable(true);
        setPhoneCheckMsg("Phone number is available");
      } catch (error: any) {
        setPhoneAvailable(false);
        setPhoneCheckMsg(
          error?.response?.data?.message || "Phone number is not available",
        );
      } finally {
        setIsCheckingPhone(false);
      }
    },
    [CheckPhoneExists],
  );

  // Watch fields to reset state on change & start idle timer (3s)
  const watchedCustomerEmail = step1Form.watch("email");
  const watchedHostEmail = hostStep1Form.watch("email");
  const watchedPhone = step2Form.watch("phoneNumber");

  // Reset email state & start 3s idle timer on every keystroke
  useEffect(() => {
    const email = isHost ? watchedHostEmail : watchedCustomerEmail;

    setEmailAvailable(null);
    setEmailCheckMsg("");
    setIsCheckingEmail(false);
    if (emailCheckTimer.current) clearTimeout(emailCheckTimer.current);

    // Only check availability if email passes form validation (no errors)
    emailCheckTimer.current = setTimeout(() => {
      // Check field state from the appropriate form
      const fieldState = isHost
        ? hostStep1Form.getFieldState("email")
        : step1Form.getFieldState("email");

      if (!fieldState.invalid && email) {
        checkEmailAvailability(email);
      }
    }, 500);
    return () => {
      if (emailCheckTimer.current) clearTimeout(emailCheckTimer.current);
    };
  }, [
    watchedCustomerEmail,
    watchedHostEmail,
    isHost,
    checkEmailAvailability,
    step1Form,
    hostStep1Form,
  ]);

  // Reset phone state & start 3s idle timer on every keystroke
  useEffect(() => {
    setPhoneAvailable(null);
    setPhoneCheckMsg("");
    setIsCheckingPhone(false);
    if (phoneCheckTimer.current) clearTimeout(phoneCheckTimer.current);
    phoneCheckTimer.current = setTimeout(() => {
      checkPhoneAvailability(watchedPhone);
    }, 1000);
    return () => {
      if (phoneCheckTimer.current) clearTimeout(phoneCheckTimer.current);
    };
  }, [watchedPhone, checkPhoneAvailability]);

  // Blur handlers — trigger check immediately on blur
  const handleEmailBlur = useCallback(() => {
    if (!emailAvailable) return;

    if (emailCheckTimer.current) clearTimeout(emailCheckTimer.current);
    const email = isHost
      ? hostStep1Form.getValues("email")
      : step1Form.getValues("email");
    checkEmailAvailability(email);
  }, [isHost, hostStep1Form, step1Form, checkEmailAvailability]);

  const handlePhoneBlur = useCallback(() => {
    if (!phoneAvailable) return;
    if (phoneCheckTimer.current) clearTimeout(phoneCheckTimer.current);
    const phone = step2Form.getValues("phoneNumber");
    checkPhoneAvailability(phone);
  }, [step2Form, checkPhoneAvailability]);

  // Resend countdown timer
  useEffect(() => {
    if (step === otpStep && resendCountdown > 0) {
      const timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, resendCountdown, otpStep]);

  // OTP input handling
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 4) newOtp[idx] = char;
    });
    setOtp(newOtp);
  };

  const onStep1Submit = async (data: z.infer<typeof step1Schema>) => {
    setSignupData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    setStep(2);
  };

  // Host Step 1 Submit (includes address)
  const onHostStep1Submit = async (data: z.infer<typeof hostStep1Schema>) => {
    setSignupData({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      companyAddress: data.companyAddress,
    });
    setStep(2);
  };

  // This is the final step before OTP (Step 2 for both)
  const onFinalStepSubmit = async (data: z.infer<typeof step2Schema>) => {
    // For hosts, also save terms accepted state and company name
    if (isHost) {
      setSignupData({
        phoneNumber: data.phoneNumber,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        referralCode: data.referralCode || "",
        termsAccepted: termsAccepted,
        companyName: companyName,
        hostAccountType: companyName.trim() ? "company" : "individual",
      });
    } else {
      setSignupData({
        phoneNumber: data.phoneNumber,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        referralCode: data.referralCode || "",
      });
    }

    // Send OTP request
    setIsLoading(true);
    setLoadingMessage("Sending otp...");
    setStep2Error("");

    try {
      await GetOtp({
        payload: {
          email: signupData.email,
          fName: signupData.firstName,
        },
      });
      setStep(otpStep);
      setResendCountdown(600);
    } catch (error: any) {
      console.error("Failed to send OTP:", error);
      setStep2Error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setOtpError("Please enter all 4 digits");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Verifying...");

    try {
      const payload: any = {
        otp: parseInt(otpCode),
        fName: signupData.firstName,
        lName: signupData.lastName,
        email: signupData.email,
        phoneNumber: `234${signupData.phoneNumber.replace(/^0+/, "")}`,
        referalCode: signupData.referralCode || "",
        accountType: accountType,
        password: signupData.password,
        passwordConfirm: signupData.passwordConfirm,
        deviceToken: "device-token-placeholder",
      };

      // Add host-specific fields if host account
      if (isHost) {
        payload.companyName = signupData.companyName || "";
        payload.companyAddress = signupData.companyAddress || "";
        payload.hostAccountType = signupData.companyName.trim()
          ? "company"
          : "individual";
      }

      await SignUp({ payload });

      // Success - reset store and show modal
      resetStore();
      setOtp(["", "", "", ""]);

      setSignupData({}); // Clear all signup data

      step1Form.reset();
      step2Form.reset();

      setTimeout(() => {
        setShowSuccessModal(true);
        resetStore();
        setSignupData({}); // Clear all signup data
      }, 500);
    } catch (error: any) {
      setOtpError(
        error?.response?.data?.message ||
          "Wrong code. Please try again or contact support.",
      );
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;

    setIsLoading(true);
    setLoadingMessage("Resending code...");

    try {
      await GetOtp({
        payload: {
          email: signupData.email,
          fName: signupData.firstName,
        },
      });
      setResendCountdown(600);
      setShowResendSuccess(true);
      setOtp(["", "", "", ""]);
      setOtpError("");

      setTimeout(() => {
        setShowResendSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  // Step 2 is the password step for both
  const passwordStepNumber = 2;

  return (
    <>
      <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
      <div className=" overflow-y-auto w-full h-[100vh] flex-1">
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full min-h-[100vh] flex-1 gap-5 overflow-y-auto flex items-center justify-center px-5 py-5"
        >
          <div className="max-w-[500px] items-center justify-center w-full flex flex-col">
            <div className="flex mb-10 lg:hidden items-center justify-center w-full">
              <Logo
                orientation="light"
                width={200}
                className="cursor-pointer w-[200px]"
              />
            </div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  className=""
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-[32px] md:text-[40px] font-[700] text-primary">
                      Create an Account
                    </h1>
                    <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[14px] font-[500] text-primary">
                      Step 1/{totalSteps}
                    </span>
                  </div>
                  <p className="text-[16px] text-[#646464] mb-8">
                    Sign up as a {isHost ? "Host" : "Customer"}
                  </p>

                  {/* Google Button - Only for customers */}
                  {!isHost && (
                    <>
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors rounded-full py-4 px-6 mb-3"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        <span className="text-[16px] font-[600] text-primary">
                          Continue with Google
                        </span>
                      </button>

                      {/* Google Sign-In Error */}
                      {googleSignInError && (
                        <p className="text-red-500 text-[13px] font-[600] text-center mb-3">
                          {googleSignInError}
                        </p>
                      )}

                      {/* Divider */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                        <span className="text-[14px] text-[#9CA3AF]">OR</span>
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                      </div>
                    </>
                  )}

                  {/* Form - Customer */}
                  {!isHost && (
                    <Form {...step1Form}>
                      <form
                        onSubmit={step1Form.handleSubmit(onStep1Submit)}
                        className="space-y-5"
                      >
                        <FormField
                          control={step1Form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormInput
                              id="firstName"
                              label="First name"
                              type="text"
                              placeholder="Enter first name"
                              className="rounded-full border-gray-200 h-[56px] px-5"
                              field={field}
                            />
                          )}
                        />

                        <FormField
                          control={step1Form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormInput
                              id="lastName"
                              label="Last name"
                              type="text"
                              placeholder="Enter Last name"
                              className="rounded-full border-gray-200 h-[56px] px-5"
                              field={field}
                            />
                          )}
                        />

                        <FormField
                          control={step1Form.control}
                          name="email"
                          render={({ field }) => (
                            <div>
                              <FormInput
                                id="email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email address"
                                className={`rounded-full h-[56px] px-5 ${
                                  emailAvailable === true
                                    ? "border-green-500 border-2"
                                    : emailAvailable === false
                                      ? "border-red-500 border-2"
                                      : "border-gray-200"
                                }`}
                                field={{
                                  ...field,
                                  onBlur: () => {
                                    field.onBlur();
                                    handleEmailBlur();
                                  },
                                }}
                              />
                              {emailCheckMsg && (
                                <p
                                  className={`text-[12px] mt-[-6px] ml-3 ${
                                    emailAvailable
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {isCheckingEmail
                                    ? "Checking..."
                                    : emailCheckMsg}
                                </p>
                              )}
                              {isCheckingEmail && !emailCheckMsg && (
                                <p className="text-[12px] mt-[-6px] ml-3 text-gray-400">
                                  Checking...
                                </p>
                              )}
                            </div>
                          )}
                        />

                        <button
                          type="submit"
                          disabled={
                            !step1Form.formState.isValid ||
                            emailAvailable !== true
                          }
                          className={`w-full flex items-center justify-center gap-2 transition-colors rounded-full py-4 px-6 mt-8 ${
                            step1Form.formState.isValid &&
                            emailAvailable === true
                              ? "bg-primary hover:bg-primary/90"
                              : "bg-[#F5F5F5] hover:bg-[#EBEBEB] cursor-not-allowed"
                          }`}
                        >
                          <span
                            className={`text-[16px] font-[500] ${
                              step1Form.formState.isValid &&
                              emailAvailable === true
                                ? "text-white"
                                : "text-[#9CA3AF]"
                            }`}
                          >
                            Next
                          </span>
                          <ArrowRight
                            className={`w-5 h-5 ${
                              step1Form.formState.isValid &&
                              emailAvailable === true
                                ? "text-white"
                                : "text-[#9CA3AF]"
                            }`}
                          />
                        </button>
                      </form>
                    </Form>
                  )}

                  {/* Form - Host (with address field) */}
                  {isHost && (
                    <Form {...hostStep1Form}>
                      <form
                        onSubmit={hostStep1Form.handleSubmit(onHostStep1Submit)}
                        className="space-y-5"
                      >
                        <FormField
                          control={hostStep1Form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormInput
                              id="firstName"
                              label={
                                <>
                                  First Name{" "}
                                  <span className="text-gray-400">
                                    (your legal name)
                                  </span>
                                </>
                              }
                              type="text"
                              placeholder="Enter first name"
                              className="rounded-full border-gray-200 h-[56px] px-5"
                              field={field}
                            />
                          )}
                        />

                        <FormField
                          control={hostStep1Form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormInput
                              id="lastName"
                              label={
                                <>
                                  Last Name{" "}
                                  <span className="text-gray-400">
                                    (your legal name)
                                  </span>
                                </>
                              }
                              type="text"
                              placeholder="Enter Last name"
                              className="rounded-full border-gray-200 h-[56px] px-5"
                              field={field}
                            />
                          )}
                        />

                        <FormField
                          control={hostStep1Form.control}
                          name="email"
                          render={({ field }) => (
                            <div>
                              <FormInput
                                id="email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email address"
                                className={`rounded-full h-[56px] px-5 ${
                                  emailAvailable === true
                                    ? "border-green-500 border-2"
                                    : emailAvailable === false
                                      ? "border-red-500 border-2"
                                      : "border-gray-200"
                                }`}
                                field={{
                                  ...field,
                                  onBlur: () => {
                                    field.onBlur();
                                    handleEmailBlur();
                                  },
                                }}
                              />
                              {emailCheckMsg && (
                                <p
                                  className={`text-[12px] mt-[-6px] ml-1 ${
                                    emailAvailable
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {isCheckingEmail
                                    ? "Checking..."
                                    : emailCheckMsg}
                                </p>
                              )}
                              {isCheckingEmail && !emailCheckMsg && (
                                <p className="text-[12px] mt-[-6px] ml-1 text-gray-400">
                                  Checking...
                                </p>
                              )}
                            </div>
                          )}
                        />

                        <FormField
                          control={hostStep1Form.control}
                          name="companyAddress"
                          render={({ field }) => (
                            <FormInput
                              id="companyAddress"
                              label="Address"
                              type="text"
                              placeholder="Enter your address"
                              className="rounded-full border-gray-200 h-[56px] px-5"
                              field={field}
                            />
                          )}
                        />

                        <button
                          type="submit"
                          disabled={
                            !hostStep1Form.formState.isValid ||
                            emailAvailable !== true
                          }
                          className={`w-full flex items-center justify-center gap-2 transition-colors rounded-full py-4 px-6 mt-8 ${
                            hostStep1Form.formState.isValid &&
                            emailAvailable === true
                              ? "bg-primary hover:bg-primary/90"
                              : "bg-[#F5F5F5] hover:bg-[#EBEBEB] cursor-not-allowed"
                          }`}
                        >
                          <span
                            className={`text-[16px] font-[500] ${
                              hostStep1Form.formState.isValid &&
                              emailAvailable === true
                                ? "text-white"
                                : "text-[#9CA3AF]"
                            }`}
                          >
                            Next
                          </span>
                          <ArrowRight
                            className={`w-5 h-5 ${
                              hostStep1Form.formState.isValid &&
                              emailAvailable === true
                                ? "text-white"
                                : "text-[#9CA3AF]"
                            }`}
                          />
                        </button>
                      </form>
                    </Form>
                  )}

                  {/* Sign In Link */}
                  <p className="text-center my-6 text-[14px] text-[#646464]">
                    Already a member?{" "}
                    <button
                      type="button"
                      onClick={() => setShowSignInModal(true)}
                      className="font-[600] text-primary hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </motion.div>
              )}

              {/* Step 2 - Phone/Password (for both) */}
              {step === passwordStepNumber && (
                <motion.div
                  key="password-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Back Button */}
                  <button
                    onClick={goBack}
                    className="w-[50px] h-[50px] rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors flex items-center justify-center mb-6"
                  >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                  </button>

                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-[32px] md:text-[40px] font-[700] text-primary">
                      Create an Account
                    </h1>
                    <span className="px-4 py-1.5 border border-gray-300 rounded-full text-[14px] font-[500] text-primary">
                      Step {passwordStepNumber}/{totalSteps}
                    </span>
                  </div>
                  <p className="text-[16px] text-[#646464] mb-8">
                    Sign up as a {isHost ? "Host" : "Customer"}
                  </p>

                  {/* Form */}
                  <Form {...step2Form}>
                    <form
                      onSubmit={step2Form.handleSubmit(onFinalStepSubmit)}
                      className="space-y-5"
                    >
                      {/* Company Name Field (for hosts only - optional) */}
                      {isHost && (
                        <div>
                          <label className="block text-[14px] font-[600] text-primary mb-2">
                            Company Name (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your company name"
                            className="w-full border border-gray-200 rounded-full h-[56px] px-5 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[14px]"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                        </div>
                      )}

                      {/* Phone Number Field */}
                      <div>
                        <label className="block text-[14px] font-[600] text-primary mb-2">
                          Phone Number
                        </label>
                        <div
                          className={`flex items-center overflow-hidden rounded-full h-[56px] px-4 focus-within:ring-2 focus-within:ring-primary/20 ${
                            phoneAvailable === true
                              ? "border-2 border-green-500"
                              : phoneAvailable === false
                                ? "border-2 border-red-500"
                                : "border border-gray-200 focus-within:border-primary"
                          }`}
                        >
                          <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                            <span className="text-[20px]">🇳🇬</span>
                            <span className="text-[14px] text-[#9c9c9c]">
                              +234
                            </span>
                          </div>
                          <input
                            type="tel"
                            placeholder="80-11x-xxxxx"
                            className="flex-1 h-full pl-3 outline-none text-[14px]"
                            {...step2Form.register("phoneNumber")}
                            onBlur={(e) => {
                              step2Form.register("phoneNumber").onBlur(e);
                              handlePhoneBlur();
                            }}
                          />
                        </div>
                        {phoneCheckMsg && (
                          <p
                            className={`text-[12px] mt-1 ml-1 ${
                              phoneAvailable ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {isCheckingPhone ? "Checking..." : phoneCheckMsg}
                          </p>
                        )}
                        {isCheckingPhone && !phoneCheckMsg && (
                          <p className="text-[12px] mt-1 ml-1 text-gray-400">
                            Checking...
                          </p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div>
                        <label className="block text-[14px] font-[600] text-primary mb-2">
                          Password
                        </label>
                        <div className="flex overflow-hidden items-center border border-gray-200 rounded-full h-[56px] px-5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                          <input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="••••••••••"
                            className="flex-1 h-full outline-none text-[14px]"
                            {...step2Form.register("password")}
                          />
                          <button
                            type="button"
                            className="text-[#646464]"
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                          >
                            <Icon
                              icon={
                                isPasswordVisible
                                  ? "mdi:eye-outline"
                                  : "mdi:eye-off-outline"
                              }
                              className="text-xl"
                            />
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <label className="block text-[14px] font-[600] text-primary mb-2">
                          Confirm Password
                        </label>
                        <div className="flex overflow-hidden items-center border border-gray-200 rounded-full h-[56px] px-5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
                          <input
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            placeholder="••••••••••"
                            className="flex-1 h-full outline-none text-[14px]"
                            {...step2Form.register("passwordConfirm")}
                          />
                          <button
                            type="button"
                            className="text-[#646464]"
                            onClick={() =>
                              setIsConfirmPasswordVisible(
                                !isConfirmPasswordVisible,
                              )
                            }
                          >
                            <Icon
                              icon={
                                isConfirmPasswordVisible
                                  ? "mdi:eye-outline"
                                  : "mdi:eye-off-outline"
                              }
                              className="text-xl"
                            />
                          </button>
                        </div>
                        {step2Form.formState.errors.passwordConfirm && (
                          <p className="text-red-500 text-[12px] mt-1">
                            {step2Form.formState.errors.passwordConfirm.message}
                          </p>
                        )}
                      </div>

                      <FormField
                        control={step2Form.control}
                        name="referralCode"
                        render={({ field }) => (
                          <FormInput
                            id="referralCode"
                            label="Referral Code (Optional)"
                            type="text"
                            placeholder="Enter your referral code if any"
                            className="rounded-full border-gray-200 h-[56px] px-5"
                            field={field}
                          />
                        )}
                      />

                      {/* Terms and Conditions Checkbox (for hosts only) */}
                      {isHost && (
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => setTermsAccepted(!termsAccepted)}
                            className={`w-5 h-5 min-w-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                              termsAccepted
                                ? "bg-primary border-primary"
                                : "border-gray-300"
                            }`}
                          >
                            {termsAccepted && (
                              <Icon
                                icon="mdi:check"
                                className="text-white text-sm"
                              />
                            )}
                          </button>
                          <p className="text-[14px] text-[#646464]">
                            By creating your account you agree to our{" "}
                            <Link
                              href="/terms-of-use"
                              className="text-[#F59E0B] hover:underline"
                            >
                              terms and conditions
                            </Link>{" "}
                            and acknowledge our{" "}
                            <Link
                              href="/privacy-policy"
                              className="text-[#F59E0B] hover:underline"
                            >
                              privacy policy
                            </Link>
                          </p>
                        </div>
                      )}

                      {/* Error Message */}
                      {step2Error && (
                        <div className="text-red-600 text-center font-[500] px-4 rounded-2xl text-[12px]">
                          {step2Error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={
                          !step2Form.formState.isValid ||
                          (isHost && !termsAccepted) ||
                          phoneAvailable !== true
                        }
                        className={`w-full flex items-center justify-center gap-2 transition-colors rounded-full py-4 px-6 mt-8 ${
                          step2Form.formState.isValid &&
                          (!isHost || termsAccepted) &&
                          phoneAvailable === true
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-[#F5F5F5] hover:bg-[#EBEBEB] cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={`text-[16px] font-[500] ${
                            step2Form.formState.isValid &&
                            (!isHost || termsAccepted) &&
                            phoneAvailable === true
                              ? "text-white"
                              : "text-[#9CA3AF]"
                          }`}
                        >
                          Continue
                        </span>
                        <ArrowRight
                          className={`w-5 h-5 ${
                            step2Form.formState.isValid &&
                            (!isHost || termsAccepted) &&
                            phoneAvailable === true
                              ? "text-white"
                              : "text-[#9CA3AF]"
                          }`}
                        />
                      </button>
                    </form>
                  </Form>

                  {/* Sign In Link */}
                  <p className="text-center my-6 text-[14px] text-[#646464]">
                    Already a member?{" "}
                    <button
                      type="button"
                      onClick={() => setShowSignInModal(true)}
                      className="font-[600] text-primary hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </motion.div>
              )}

              {/* OTP Step */}
              {step === otpStep && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Back Button */}
                  <button
                    onClick={goBack}
                    className="w-[50px] h-[50px] rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors flex items-center justify-center mb-10"
                  >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                  </button>

                  {/* Header */}
                  <h1 className="text-[32px] md:text-[40px] font-[700] text-primary mb-3">
                    Please Check your Email
                  </h1>
                  <p className="text-[16px] text-[#646464] mb-10">
                    We&apos;ve sent a code to {signupData.email}
                  </p>

                  {/* OTP Inputs */}
                  <div className="flex w-full gap-4 mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpInputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className={`w-[100%] h-[100px] text-center text-[36px] font-[600] text-primary border-2 rounded-xl outline-none transition-colors ${
                          otpError
                            ? "border-red-500"
                            : digit
                              ? "border-primary"
                              : "border-gray-200"
                        } focus:border-primary`}
                      />
                    ))}
                  </div>

                  {/* Error Message */}
                  {otpError && (
                    <p className="text-red-500 text-[14px] mb-6">{otpError}</p>
                  )}

                  {/* Verify Button */}
                  <button
                    onClick={handleVerifyOtp}
                    disabled={!isOtpComplete}
                    className={`w-full flex items-center justify-center gap-2 transition-colors rounded-full py-4 px-6 mt-6 ${
                      isOtpComplete
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-[#F5F5F5] cursor-not-allowed"
                    }`}
                  >
                    <span
                      className={`text-[16px] font-[500] ${
                        isOtpComplete ? "text-white" : "text-[#9CA3AF]"
                      }`}
                    >
                      Verify
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 ${
                        isOtpComplete ? "text-white" : "text-[#9CA3AF]"
                      }`}
                    />
                  </button>

                  {/* Resend Code */}
                  <div className="text-center mt-6">
                    <button
                      onClick={handleResendOtp}
                      disabled={resendCountdown > 0}
                      className={`text-[14px] font-[600] ${
                        resendCountdown > 0
                          ? "text-[#9CA3AF] cursor-not-allowed"
                          : "text-primary hover:underline"
                      }`}
                    >
                      Send code again
                    </button>
                    {resendCountdown > 0 && (
                      <span className="text-[14px] text-[#9CA3AF] ml-2">
                        {Math.floor(resendCountdown / 60)
                          .toString()
                          .padStart(2, "0")}
                        :{(resendCountdown % 60).toString().padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Resend Success Message */}
                  <AnimatePresence>
                    {showResendSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6"
                      >
                        <div className="bg-orange-500 text-white text-center py-4 px-6 rounded-full text-[14px]">
                          A new code has been sent to your email
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            onClick={() => setShowSuccessModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white max-h-[95vh] rounded-3xl overflow-hidden max-w-[600px] w-full text-center"
            >
              {/* Illustration */}
              <div className="flex justify-center mb-6">
                <Image
                  src={WelcomeSvg}
                  alt="Welcome to Valor"
                  width={280}
                  height={200}
                  className="w-full object-cover min-h-[200px] h-[250px]"
                />
              </div>

              <div className="overflow-y-auto py-5 px-8">
                {/* Title */}
                <h2 className="text-[28px] md:text-[32px] font-[700] text-primary mb-2">
                  Welcome to Valor
                </h2>
                <p className="text-[16px] text-[#646464] mb-6">
                  Your signup is complete.
                </p>

                {/* Description */}
                <p className="text-[14px] text-[#646464] mb-8 leading-relaxed">
                  Download our mobile app to start renting vehicles from trusted
                  hosts. If you prefer personal assistance or aren&apos;t very
                  tech-savvy, you can also reach out to our team on{" "}
                  <a
                    href="https://wa.me/2348000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex relative pl-[20px] items-center gap-[3px] text-[#25D366] font-[600] hover:underline"
                  >
                    <Icon
                      icon="ic:baseline-whatsapp"
                      className="text-[20px] left-0 top-[50%] translate-y-[-50%] absolute"
                    />
                    WhatsApp
                  </a>{" "}
                  to place your request.
                </p>

                {/* App Store Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      width={140}
                      height={42}
                      className="h-[42px] w-auto"
                    />
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      width={140}
                      height={42}
                      className="h-[42px] w-auto"
                    />
                  </a>
                </div>

                {/* Close Button */}
                <div className="flex items-center justify-center gap-5">
                  <button
                    onClick={() => router.push("/search")}
                    className="mt-8 hover:underline text-[14px] text-[#585b62] hover:text-primary transition-colors"
                  >
                    Search for Vehicles{" "}
                    <ArrowRight className="inline-block w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In Modal */}
      <AnimatePresence>
        {showSignInModal && (
          <motion.div
            onClick={() => setShowSignInModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden max-w-[600px] w-full text-center"
            >
              {/* Illustration */}
              <div className="flex justify-center mb-6">
                <Image
                  src={WelcomeSvg}
                  alt="Sign In to Valor"
                  width={280}
                  height={200}
                  className="w-full h-auto"
                />
              </div>

              <div className="p-8">
                {/* Title */}
                <h2 className="text-[28px] md:text-[32px] font-[700] text-primary mb-2">
                  Sign In on Mobile
                </h2>
                <p className="text-[16px] text-[#646464] mb-6">
                  Sign in is only available on our mobile app.
                </p>

                {/* Description */}
                <p className="text-[14px] text-[#646464] mb-8 leading-relaxed">
                  Download our mobile app to sign in and start renting vehicles
                  from trusted hosts. If you prefer personal assistance or
                  aren&apos;t very tech-savvy, you can also reach out to our
                  team on{" "}
                  <a
                    href="https://wa.me/2348000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex relative pl-[20px] items-center gap-[3px] text-[#25D366] font-[600] hover:underline"
                  >
                    <Icon
                      icon="ic:baseline-whatsapp"
                      className="text-[20px] left-0 top-[50%] translate-y-[-50%] absolute"
                    />
                    WhatsApp
                  </a>{" "}
                  to place your request.
                </p>

                {/* App Store Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      width={140}
                      height={42}
                      className="h-[42px] w-auto"
                    />
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-105"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      width={140}
                      height={42}
                      className="h-[42px] w-auto"
                    />
                  </a>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="mt-8 text-[14px] text-[#9CA3AF] hover:text-primary transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignUpForm;
