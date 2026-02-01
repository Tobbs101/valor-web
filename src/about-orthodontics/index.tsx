import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import AboutOrthodonticsBody from "./components/body";

const AboutOrthodontics = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <AboutOrthodonticsBody />
      <Footer />
    </PageLayout>
  );
};

export default AboutOrthodontics;
