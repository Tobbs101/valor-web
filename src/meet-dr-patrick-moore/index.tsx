import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import MeetDrPatrickMooreBody from "./components/body";

const MeetDrPatrickMoore = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <MeetDrPatrickMooreBody />
      <Footer />
    </PageLayout>
  );
};

export default MeetDrPatrickMoore;
