import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import ContactItems from "./components/contact-items";

const ContactUs = () => {
  return (
    <PageLayout>
      <ContactItems />
      <Footer />
    </PageLayout>
  );
};

export default ContactUs;
