import PageLayout from "@/components/layout/page-layout";
import React from "react";
import AboutUsHero from "./components/about-us-hero";
import WhyValor from "./components/why-valor";
import OurStory from "./components/our-story";
import OurValues from "./components/our-values";
import Footer from "@/components/layout/footer";

const AboutUsPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <AboutUsHero />
      <WhyValor />
      <OurStory />
      <OurValues />
      <Footer />
    </PageLayout>
  );
};

export default AboutUsPage;
