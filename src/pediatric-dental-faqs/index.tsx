import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import PediatricDentalFAQsBody from "./components/body";

const PediatricDentalFAQs = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <PediatricDentalFAQsBody />
      <Footer />
    </PageLayout>
  );
};

export default PediatricDentalFAQs;
