import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import CancellationPolicyPageBody from "./components/cancellation-policy-page-body";

const CancellationPolicyPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <CancellationPolicyPageBody />
      <Footer />
    </PageLayout>
  );
};

export default CancellationPolicyPage;
