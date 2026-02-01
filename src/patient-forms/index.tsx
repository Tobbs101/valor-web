import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import PatientFormsBody from "./components/body";

const PatientForms = () => {
  return (
    <PageLayout>
      <PatientFormsBody />
      <Footer />
    </PageLayout>
  );
};

export default PatientForms;
