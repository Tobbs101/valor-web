"use client";

import React from "react";
import Container from "@/components/layout/container";
import DummyImage from "@/assets/blog-dummy-image.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 7,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 8,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
  {
    id: 9,
    title: "Top 5 Luxury Cars Perfect for Business Trips",
    excerpt:
      "Make a lasting impression on your business partners with these premium vehicles available on our platform.",
    image: DummyImage,
    author: "Valor Team",
    date: "11 Jan 2026",
    readTime: "5 min read",
  },
];

const BlogCard = ({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/blog/${post.id}`);
  };
  return (
    <motion.div
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Blog Image */}
      <div className="relative h-[180px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-[16px] md:text-[18px] font-[700] text-primary leading-[24px] mb-2">
          {post.title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-[#535353] leading-[20px] mb-4">
          {post.excerpt}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-[6px] font-[600]">VALOR</span>
          </div>
          <div>
            <p className="text-[13px] font-[600] text-primary">{post.author}</p>
            <p className="text-[11px] text-[#646464]">
              {post.date} • {post.readTime}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BlogsPageBody = () => {
  const [email, setEmail] = React.useState("");

  return (
    <div className="bg-white overflow-hidden">
      {/* Header Section */}
      <Container className="px-5 pt-[30px] md:pt-[50px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[14px] text-[#646464] mb-2">Blog</p>
          <h1 className="text-[32px] md:text-[48px] font-[700] text-primary mb-4">
            Our Blog
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#535353] max-w-xl mx-auto">
            Stay updated with the latest car rental tips, travel guides, and
            news from Valor
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </Container>

      {/* Newsletter Section */}
      <div className="bg-[#F8FBFD] py-16 md:py-24">
        <Container className="px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto"
          >
            <h2 className="text-[28px] md:text-[40px] font-[700] text-primary leading-[36px] md:leading-[48px] mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#535353] mb-8">
              Get the latest updates on new car listings, exclusive offers, and
              industry news delivered straight to your inbox.
            </p>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[48px] bg-white rounded-full px-6 border-gray-200 max-w-[300px] mx-auto sm:mx-0"
              />
              <Button className="h-[48px] px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-[500]">
                Sign Up
              </Button>
            </div>

            <p className="text-[12px] text-[#646464]">
              By clicking Sign Up you&apos;re confirming that you agree with our{" "}
              <Link
                href="/terms-and-conditions"
                className="underline underline-offset-2"
              >
                Terms and Conditions
              </Link>
            </p>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default BlogsPageBody;
