import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import PediatricDentistryBody from "./components/body";

const PediatricDentistry = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <PediatricDentistryBody />
      <Footer />
    </PageLayout>
  );
};

export default PediatricDentistry;
