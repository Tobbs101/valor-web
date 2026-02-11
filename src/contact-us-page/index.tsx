import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import ContactUsPageBody from "./components/contact-us-page-body";

const ContactUsPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <ContactUsPageBody />
      <Footer />
    </PageLayout>
  );
};

export default ContactUsPage;
