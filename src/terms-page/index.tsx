import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import TermsPageBody from "./components/terms-page-body";

const TermsPage = () => {
  return (
    <PageLayout>
      <TermsPageBody />
      <Footer />
    </PageLayout>
  );
};

export default TermsPage;
