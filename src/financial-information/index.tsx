import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import FinancialInformationBody from "./components/body";

const FinancialInformation = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <FinancialInformationBody />
      <Footer />
    </PageLayout>
  );
};

export default FinancialInformation;
