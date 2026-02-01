import PageLayout from "@/components/layout/page-layout";
import React from "react";
import Hero from "./components/hero";
import CustomerTestimonials from "../landing-page/components/customer-testimonials";
import Footer from "@/components/layout/footer";
import OnlineClinicInfoSection from "./components/what-are-online-clinics";
import WhyChooseOnlineClinic from "./components/why-choose-online-clinic";

const OnlineClinic = () => {
  return (
    <PageLayout>
      <Hero />
      <OnlineClinicInfoSection />
      <WhyChooseOnlineClinic />
      <CustomerTestimonials />
      <Footer />
    </PageLayout>
  );
};

export default OnlineClinic;
