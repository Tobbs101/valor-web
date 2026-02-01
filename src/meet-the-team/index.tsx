import React from "react";
import PageLayout from "@/components/layout/page-layout";
import MeetTheBody from "./components/body";
import Footer from "@/components/layout/footer";

const MeetTheTeam = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <MeetTheBody />
      <Footer />
    </PageLayout>
  );
};

export default MeetTheTeam;
