"use client";

import React from "react";
import Container from "@/components/layout/container";
import DummyImage from "@/assets/blog-dummy-image.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlogPost = any;

interface PrismicBlogPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const socialShareLinks = [
  { icon: "mdi:whatsapp", label: "WhatsApp" },
  { icon: "mdi:instagram", label: "Instagram" },
  { icon: "mdi:linkedin", label: "LinkedIn" },
  { icon: "ic:baseline-tiktok", label: "TikTok" },
];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/blog/${post.uid}`);
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
      <div className="relative h-[180px] w-full">
        {post.data.featured_image?.url ? (
          <PrismicNextImage
            field={post.data.featured_image}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={DummyImage}
            alt={post.data.title || "Blog post"}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-[16px] md:text-[18px] font-[700] text-primary leading-[24px] mb-2">
          {post.data.title || "Untitled"}
        </h3>
        <p className="text-[13px] md:text-[14px] text-[#535353] leading-[20px] mb-4 line-clamp-2">
          {post.data.excerpt || ""}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-[10px] font-[600]">VALOR</span>
          </div>
          <div>
            <p className="text-[13px] font-[600] text-primary">
              {post.data.author || "Valor Team"}
            </p>
            <p className="text-[11px] text-[#646464]">
              {formatDate(post.data.publish_date)}
              {post.data.read_time && ` • ${post.data.read_time}`}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PrismicBlogPage = ({ post, relatedPosts }: PrismicBlogPageProps) => {
  const [email, setEmail] = React.useState("");

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] w-full">
        {post.data.featured_image?.url ? (
          <PrismicNextImage
            field={post.data.featured_image}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={DummyImage}
            alt={post.data.title || "Blog"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[28px] md:text-[40px] font-[700] text-white leading-[36px] md:leading-[48px] max-w-2xl mb-6"
          >
            {post.data.title || "Untitled"}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-[8px] font-[600]">VALOR</span>
            </div>
            <p className="text-[14px] text-white font-[500]">
              {post.data.author || "Valor Team"}
            </p>
            <p className="text-[12px] text-white/90">
              {formatDate(post.data.publish_date)}
              {post.data.read_time && ` • ${post.data.read_time}`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Content */}
      <Container className="px-5 max-w-4xl mx-auto py-10 md:py-16">
        {/* Breadcrumb & Share */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[14px]">
            <Link href="/blog" className="text-[#646464] hover:text-primary">
              Blog
            </Link>
            <span className="text-[#646464]">&gt;</span>
            <span className="text-primary font-[500]">
              {post.data.category || "Article"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {socialShareLinks.map((social) => (
              <button
                key={social.label}
                aria-label={social.label}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Icon icon={social.icon} className="text-primary text-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <article className="w-full prose prose-lg max-w-none blog-content">
          {post.data.body && (
            <PrismicRichText
              field={post.data.body}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-[24px] md:text-[28px] font-[700] text-primary mb-4 mt-8">
                    {children}
                  </h2>
                ),
                heading3: ({ children }) => (
                  <h3 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2 mt-6">
                    {children}
                  </h3>
                ),
                paragraph: ({ children }) => (
                  <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
                    {children}
                  </p>
                ),
                list: ({ children }) => (
                  <ul className="space-y-2 text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4 list-disc list-inside">
                    {children}
                  </ul>
                ),
                listItem: ({ children }) => <li>{children}</li>,
                oList: ({ children }) => (
                  <ol className="space-y-2 text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4 list-decimal list-inside">
                    {children}
                  </ol>
                ),
                oListItem: ({ children }) => <li>{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-primary">
                    {children}
                  </strong>
                ),
                image: ({ node }) => (
                  <div className="relative w-full h-[250px] md:h-[350px] rounded-[12px] overflow-hidden my-6">
                    <Image
                      src={node.url}
                      alt={node.alt || "Blog image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ),
                hyperlink: ({ children, node }) => (
                  <a
                    href={node.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          )}
        </article>
      </Container>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="bg-[#F8FBFD] py-16 md:py-24">
          <Container className="px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-[28px] md:text-[40px] font-[700] text-primary leading-[36px] md:leading-[48px] mb-4">
                Related Articles
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#535353]">
                Continue exploring our latest insights and stories
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="bg-white py-16 md:py-24">
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

export default PrismicBlogPage;
