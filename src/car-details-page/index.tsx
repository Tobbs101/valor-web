import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import CarDetailsPageBody from "./components/car-details-page-body";

const CarDetailsPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <CarDetailsPageBody />
      <Footer />
    </PageLayout>
  );
};

export default CarDetailsPage;
