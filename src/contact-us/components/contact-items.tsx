"use client";

import Container from "@/components/layout/container";
import React, { ReactNode, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import Link from "next/link";
import { SubmitBtn } from "@/components/ui/submit-btn";
import FormTextArea from "@/components/form/form-textarea";
import { Icon } from "@iconify/react/dist/iconify.js";
import Each from "@/components/helpers/each";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "@/components/ui/dialog";
import SuccessModalCard from "@/components/custom/success-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfficeLocation from "../views/office-location";
import AppointmentRequest from "../views/appointment-request";
import ReferPatient from "../views/refer-a-patient";
import { useSearchParams, useRouter } from "next/navigation";

type ContactProps = {
  id: number;
  icon: React.ReactElement;
  type: string;
  entry1: string;
};

const formSchema = z.object({
  name: z.string().min(5, { message: "Please enter your full name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(3, { message: "Please enter your message." }),
});

type ModalProps = {
  show: boolean;
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
  secondaryBtn?: { label: string; onClick: any };
  loading?: boolean;
};

const modalDefaults = {
  show: false,
  title: "",
  info: "",
  primaryBtnLabel: "",
};

const ContactItems = () => {
  const ITEMS: ContactProps[] = [
    {
      id: 1,
      icon: <Icon icon="line-md:email" className="text-[48px] text-primary" />,
      type: "email",
      entry1: "info@limitbreakers.co.uk",
    },
    {
      id: 2,
      icon: <Icon icon="line-md:phone" className="text-[48px] text-primary" />,
      type: "phone",
      entry1: "+447832314114",
    },

    // {
    //   id: 3,
    //   icon: (
    //     <Icon icon="line-md:my-location" className="text-[48px] text-primary" />
    //   ),
    //   type: "Office",
    //   entry1: "Tutoring & Childcare Address:",
    //   entry2: "Hoo, Rochester",
    // },
  ];

  const SOCIAL_LINKS = [
    {
      id: 1,
      icon: <Icon icon="mdi:instagram" className="text-[48px] text-primary" />,
      type: "Instagram",
      url: "https://www.instagram.com/limit_breakers_tutoring_?igsh=ODNpbTMzcmk1ZmV6&utm_source=qr",
      label: "Follow us on Instagram",
    },
    {
      id: 2,
      icon: <Icon icon="mdi:facebook" className="text-[48px] text-primary" />,
      type: "Facebook",
      url: "https://www.facebook.com/share/1ByypT1KD2/?mibextid=wwXIfr",
      label: "Connect with us on Facebook",
    },
    {
      id: 3,
      icon: <Icon icon="mdi:twitter" className="text-[48px] text-primary" />,
      type: "Twitter",
      url: "https://x.com/lbreakerst?s=21",
      label: "Follow us on Twitter",
    },
    {
      id: 4,
      icon: <Icon icon="mdi:linkedin" className="text-[48px] text-primary" />,
      type: "LinkedIn",
      url: "https://www.linkedin.com/posts/limit-breakers-b71593376_tips-like-this-are-just-a-glimpse-of-the-ugcPost-7363838039934070784-H4-X?utm_medium=ios_app&rcm=ACoAAFz9j8UBLiMu81ZiDVmoDtrycBe0WliR1KI&utm_source=social_share_send&utm_campaign=copy_link",
      label: "Connect with us on LinkedIn",
    },
  ];

  const [successModal, setSuccessModal] = useState<ModalProps>(modalDefaults);

  const handleCloseOnSuccess = () => {
    setSuccessModal(modalDefaults);
  };

  const ContactForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        message: "",
      },
    });

    const { toast } = useToast();

    const onSubmit = async (payload: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch("https://formspree.io/f/xvgrjgkk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccessModal({
            show: true,
            title: "Success",
            info: "Thank you for contacting us! We will get back to you soon.",
            primaryBtnLabel: "Okay",
          });
        } else {
          toast({
            title: "Error",
            description:
              result.error || "Failed to send message. Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive",
        });
      }
    };

    const { isSubmitting } = form.formState;
    return (
      <div className="p-5">
        <h1 className="text-primary w-full text-[32px] md:text-[40px] font-[700]">
          Contact Us
        </h1>
        <p className="text-gray-600 text-[12px] md:text-[14px] font-[400] md:text-base">
          Have questions or need assistance? Reach out to us—we're here to help!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  field={field}
                  className="border border-gray-300 bg-transparent shadow-none py-5"
                  type="text"
                  label={"Name"}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  field={field}
                  className="border border-gray-300 bg-transparent shadow-none py-5"
                  containerClassName="mt-5"
                  label={"Email"}
                />
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormTextArea
                  field={field}
                  className="border border-gray-300 bg-transparent shadow-none py-2 placeholder:text-xs"
                  containerClassName="mt-5 px-0"
                  placeholder="Type your message..."
                  label={"Message"}
                  rows={5}
                />
              )}
            />

            <div className="">
              <SubmitBtn
                className="w-[100px] h-[40px] mt-5"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                Submit
              </SubmitBtn>
            </div>
          </form>
        </Form>
      </div>
    );
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("ref");

  const updateRef = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("ref", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <SuccessModalCard
        isOpen={successModal.show}
        title={successModal.title}
        info={successModal.info}
        primaryBtnLabel={successModal.primaryBtnLabel}
        onProceed={() => handleCloseOnSuccess()}
      />

      <Container className="py-5 px-5 sm:py-[70px] overflow-hidden">
        <div className="w-full">
          <Tabs defaultValue={ref ?? "office-location"}>
            <div className="flex items-center justify-center mb-10">
              <TabsList className="bg-[#F3F4F6] mx-auto flex items-center justify-center gap-2 flex-wrap text-primary rounded-full h-fit py-2 px-2 mb-4">
                <TabsTrigger
                  onClick={() => updateRef("office-location")}
                  className="data-[state=active]:bg-white data-[state=active]:text-black px-7 h-[35px] rounded-3xl"
                  value="office-location"
                >
                  Office Location
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => updateRef("appointment-request")}
                  className="data-[state=active]:bg-white data-[state=active]:text-black px-7 h-[35px] rounded-3xl"
                  value="appointment-request"
                >
                  Appointment Request
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => updateRef("refer-a-patient")}
                  className="data-[state=active]:bg-white data-[state=active]:text-black px-7 h-[35px] rounded-3xl"
                  value="refer-a-patient"
                >
                  Refer a Patient
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="office-location">
              <OfficeLocation />
            </TabsContent>
            <TabsContent value="appointment-request">
              <AppointmentRequest />
            </TabsContent>
            <TabsContent value="refer-a-patient">
              <ReferPatient />
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default ContactItems;
