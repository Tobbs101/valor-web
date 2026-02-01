import PageLayout from "@/components/layout/page-layout";
import React from "react";
import Hero from "./components/hero";
import Footer from "@/components/layout/footer";
import PrivacyPolicyInfo from "./components/privacy-policy-info";

const PrivacyPolicyPage = () => {
  return (
    <PageLayout>
      <Hero />
      <PrivacyPolicyInfo />
      <Footer />
    </PageLayout>
  );
};

export default PrivacyPolicyPage;
