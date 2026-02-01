import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import OrthodonticsFAQsBody from "./components/body";

const OrthodonticsFAQs = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <OrthodonticsFAQsBody />
      <Footer />
    </PageLayout>
  );
};

export default OrthodonticsFAQs;
