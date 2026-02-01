import PageLayout from "@/components/layout/page-layout";
import React from "react";
import Hero from "./components/hero";
import Footer from "@/components/layout/footer";
import TermsInfo from "./components/terms-of-use-info";

const TermsOfUsePage = () => {
  return (
    <PageLayout>
      <Hero />
      <TermsInfo />
      <Footer />
    </PageLayout>
  );
};

export default TermsOfUsePage;
