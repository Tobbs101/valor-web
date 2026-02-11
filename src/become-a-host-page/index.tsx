import PageLayout from "@/components/layout/page-layout";
import React from "react";
import BecomeAHostHero from "./components/become-a-host-hero";
import Footer from "@/components/layout/footer";
import HowToBecomeAHost from "./components/how-to-become-a-host";
import OnboardYourDriver from "./components/onboard-your-driver";
import WhatHostAreSaying from "./components/what-hosts-are-saying";

const BecomeAHost = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <BecomeAHostHero />
      <HowToBecomeAHost />
      <OnboardYourDriver />
      <WhatHostArewSaying />
      <Footer />
    </PageLayout>
  );
};

export default BecomeAHost;
