import PageLayout from "@/components/layout/page-layout";
import React from "react";
import MeetDrSlyvesterAwaguBody from "./components/body";
import Footer from "@/components/layout/footer";

const MeetDrSlyvesterAwagu = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <MeetDrSlyvesterAwaguBody />
      <Footer />
    </PageLayout>
  );
};

export default MeetDrSlyvesterAwagu;
