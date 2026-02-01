import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import MeetDrDonaldMillsBody from "./components/body";

const MeetDrDonaldMills = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <MeetDrDonaldMillsBody />
      <Footer />
    </PageLayout>
  );
};

export default MeetDrDonaldMills;
