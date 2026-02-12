"use client";

import React from "react";
import Container from "@/components/layout/container";
import PlaceholderImage from "@/assets/placeholde-image.jpg";
import DummyImage from "@/assets/blog-dummy-image.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

// Mock related posts data
const relatedPosts = [
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
];

const socialShareLinks = [
  { icon: "mdi:whatsapp", label: "WhatsApp" },
  { icon: "mdi:instagram", label: "Instagram" },
  { icon: "mdi:linkedin", label: "LinkedIn" },
  { icon: "ic:baseline-tiktok", label: "TikTok" },
];

const BlogCard = ({
  post,
  index,
}: {
  post: (typeof relatedPosts)[0];
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
      <div className="relative h-[180px] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-[16px] md:text-[18px] font-[700] text-primary leading-[24px] mb-2">
          {post.title}
        </h3>
        <p className="text-[13px] md:text-[14px] text-[#535353] leading-[20px] mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-[10px] font-[600]">VALOR</span>
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

const BlogPageBody = () => {
  const [email, setEmail] = React.useState("");

  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[450px] w-full">
        <Image
          src={PlaceholderImage}
          alt="Blog Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[28px] md:text-[40px] font-[700] text-white leading-[36px] md:leading-[48px] max-w-2xl mb-6"
          >
            Top 5 Luxury Cars Perfect for Business Trips
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
            <p className="text-[14px] text-white font-[500]">Valor Team</p>
            <p className="text-[12px] text-white/90">
              11 Jan 2026 • 5 min read
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
            <span className="text-primary font-[500]">Category</span>
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
        <article className="w-full">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-[24px] md:text-[28px] font-[700] text-primary mb-4">
              Introduction
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              First impressions matter in business, and arriving in a luxury
              vehicle can set the tone for successful negotiations and
              partnerships. Here are our top picks for business travel.
            </p>
          </section>

          {/* Car List */}
          <section className="mb-8">
            <h3 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
              1. Mercedes-Benz S-Class
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              The epitome of executive luxury, the S-Class offers unparalleled
              comfort, cutting-edge technology, and a prestigious image that
              commands respect. Perfect for airport pickups and high-stakes
              meetings.
            </p>

            <h3 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
              2. BMW 7 Series
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              Combining dynamic performance with supreme comfort, the 7 Series
              is ideal for executives who appreciate both style and driving
              pleasure. The spacious rear cabin is perfect for reviewing
              presentations on the go.
            </p>

            <h3 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
              3. Lexus LX 570
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              When you need the commanding presence of an SUV with luxury
              refinements, the LX 570 delivers. It&apos;s especially popular for
              navigating Lagos roads while maintaining executive comfort.
            </p>

            <h3 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
              4. Range Rover Autobiography
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              British luxury meets capability in this iconic SUV. The Range
              Rover makes a statement while handling any terrain Lagos might
              throw at you.
            </p>

            <h3 className="text-[16px] md:text-[18px] font-[700] text-primary mb-2">
              5. Toyota Land Cruiser Prado
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-6">
              A reliable classic that combines Japanese engineering with comfort
              and versatility. It&apos;s a popular choice for business travelers
              who value dependability.
            </p>
          </section>

          {/* Image with Caption */}
          <section className="mb-8">
            <div className="relative h-[250px] md:h-[350px] w-full rounded-[12px] overflow-hidden">
              <Image
                src={DummyImage}
                alt="Luxury car interior"
                fill
                className="object-cover"
              />
            </div>
            {/* <p className="text-[12px] text-[#646464] mt-2 italic">
              | Image caption goes here
            </p> */}
          </section>

          {/* Booking Tips */}
          <section className="mb-8">
            <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
              Booking Tips for Business Travel
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[14px] md:text-[16px] text-[#535353] leading-[26px]">
              <li>
                Book at least 48 hours in advance for guaranteed availability
              </li>
              <li>Consider hiring a professional driver for seamless travel</li>
              <li>Request a clean, detailed vehicle for the best impression</li>
            </ul>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mt-4">
              Browse our luxury collection and elevate your next business trip
              with Valor.
            </p>
          </section>

          {/* Conclusion */}
          <section className="mb-10">
            <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
              Conclusion
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus
              id scelerisque est ultrices ultrices. Duis est sit sed nisi,
              blandit elit sagittis. Quisque tristique consequat quam sed. Nisl
              at scelerisque amet nulla purus habitasse.
            </p>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px] mb-4">
              Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
              condimentum mi massa. In tincidunt pharetra consectetur sed duis
              facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit
              dictum eget nibh tortor commodo cursus.
            </p>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[26px]">
              Odio fells sagittis, morbi feugiat tortor vitae feugiat fusce
              aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare
              id metus eget ipsum. Aliquam senectus neque ut id eget consectetur
              dictum. Donec posuere pharetra odio consequat scelerisque et, nunc
              tortor.Nulla adipiscing erat a erat. Condimentum lorem posuere
              gravida enim posuere cursus diam.
            </p>
          </section>

          {/* Share This Post */}
          <section className="text-center py-8 border-t border-gray-100">
            <p className="text-[16px] font-[600] text-primary mb-4">
              Share this post
            </p>
            <div className="flex items-center justify-center gap-4">
              {socialShareLinks.map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Icon icon={social.icon} className="text-primary text-xl" />
                </button>
              ))}
            </div>
          </section>

          {/* Author Section */}
          <section className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-[10px] font-[600]">VALOR</span>
            </div>
            <p className="text-[16px] font-[600] text-primary">Valor Team</p>
          </section>
        </article>
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[48px] rounded-full px-6 border-gray-200 max-w-[300px] mx-auto sm:mx-0"
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

      {/* Related Posts Section */}
      <Container className="px-5 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[14px] text-[#646464] mb-2">Blog</p>
          <h2 className="text-[28px] md:text-[40px] font-[700] text-primary mb-4">
            Related posts
          </h2>
          <p className="text-[14px] md:text-[16px] text-[#535353]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {relatedPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog">
            <Button className="h-[48px] px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-[500]">
              View all
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default BlogPageBody;
