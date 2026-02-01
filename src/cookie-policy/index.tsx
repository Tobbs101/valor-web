import PageLayout from "@/components/layout/page-layout";
import React from "react";
import Hero from "./components/hero";
import Footer from "@/components/layout/footer";
import CookiePolicyInfo from "./components/cookie-policy-info";

const CookiePolicyPage = () => {
  return (
    <PageLayout>
      <Hero />
      <CookiePolicyInfo />
      <Footer />
    </PageLayout>
  );
};

export default CookiePolicyPage;
