import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import TestimonialsBody from "./components/body";

const Testimonials = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <TestimonialsBody />
      <Footer />
    </PageLayout>
  );
};

export default Testimonials;
