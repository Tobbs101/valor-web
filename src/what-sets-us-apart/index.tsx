import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import WhatSetsUsApartBody from "./components/body";

const WhatSetsUsApart = () => {
  return (
    <PageLayout className="min-h-screen w-full">
      <WhatSetsUsApartBody />
      <Footer />
    </PageLayout>
  );
};

export default WhatSetsUsApart;
