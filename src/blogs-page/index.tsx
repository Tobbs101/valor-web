import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import BlogsPageBody from "./components/blogs-page-body";

const BlogsPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <BlogsPageBody />
      <Footer />
    </PageLayout>
  );
};

export default BlogsPage;
