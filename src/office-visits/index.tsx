import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import OfficeVisitsBody from "./components/body";

const OfficeVisits = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <OfficeVisitsBody />
      <Footer />
    </PageLayout>
  );
};

export default OfficeVisits;
