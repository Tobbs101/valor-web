import PageLayout from "@/components/layout/page-layout";
import React from "react";
import SearchPageBody from "./components/search-page-body";
import Footer from "@/components/layout/footer";

const SearchPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <SearchPageBody />
      <Footer />
    </PageLayout>
  );
};

export default SearchPage;
