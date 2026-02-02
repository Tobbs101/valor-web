import PageLayout from "@/components/layout/page-layout";
import React from "react";
import Hero from "./components/hero";
import Footer from "@/components/layout/footer";
import Welcome from "./components/welcome";
import CarSelection from "./components/car-selection";
import AppFeatures from "./components/app-features";

const index = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <Hero />
      <Welcome />
      <CarSelection />
      <AppFeatures />
      <Footer />
    </PageLayout>
  );
};

export default index;
