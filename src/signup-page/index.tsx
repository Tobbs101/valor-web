import React from "react";
import Image from "next/image";
import login_bg from "@/assets/login-background.jpg";
import Logo from "@/components/custom/logo";
import SignUpForm from "./components/signup-form";

const SignupPage = () => {
  return (
    <div className={`flex relative items-start justify-between min-h-screen`}>
      <SignUpForm />

      <div className="h-[100vh] lg:inline hidden overflow-hidden flex-1 relative">
        <Image src={login_bg} alt="" className="h-full w-full z-1" />
        <div className="absolute top-0 left-0 h-full w-full bg-black/50"></div>
      </div>

      <Logo
        orientation="dark"
        width={200}
        className="absolute lg:block hidden cursor-pointer w-[200px] top-7 right-7"
      />
    </div>
  );
};

export default SignupPage;
