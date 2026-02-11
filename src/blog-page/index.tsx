import Footer from "@/components/layout/footer";
import PageLayout from "@/components/layout/page-layout";
import React from "react";
import BlogPageBody from "./components/blog-page-body";

const BlogPage = () => {
  return (
    <PageLayout className="min-h-screen overflow-x-hidden w-full">
      <BlogPageBody />
      <Footer />
    </PageLayout>
  );
};

export default BlogPage;
