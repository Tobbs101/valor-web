"use client";

import React from "react";
import Container from "@/components/layout/container";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import FormSelect from "@/components/form/form-select";
import FormTextArea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import ExperienceValor from "@/components/shared/experience-valor";
import { KeyTextField, ImageField } from "@prismicio/client";

// Types for Prismic data
interface ContactUsPageData {
  title?: KeyTextField;
  description?: KeyTextField;
  phone_label?: KeyTextField;
  phone_number?: KeyTextField;
  email_label?: KeyTextField;
  email_address?: KeyTextField;
  address_label?: KeyTextField;
  address?: KeyTextField;
  social_title?: KeyTextField;
  map_embed_url?: KeyTextField;
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_keywords?: KeyTextField;
  og_image?: ImageField;
}

interface PrismicContactUsPageProps {
  data: ContactUsPageData;
}

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
  message: z.string().min(1, { message: "Please enter your message" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const inquiryOptions = [
  { id: 1, title: "General Inquiry", value: "general" },
  { id: 2, title: "Customer Support", value: "support" },
  { id: 3, title: "Partnership", value: "partnership" },
  { id: 4, title: "Feedback", value: "feedback" },
  { id: 5, title: "Other", value: "other" },
];

const defaultSocialLinks = [
  {
    icon: "mdi:whatsapp",
    href: "https://wa.me/2347031647277",
    label: "WhatsApp",
  },
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com/valorhire/",
    label: "Instagram",
  },
  {
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/company/valorhire1",
    label: "LinkedIn",
  },
  {
    icon: "ic:baseline-tiktok",
    href: "https://www.tiktok.com/@valorhire?_r=1&_t=ZS-93dfOtL1EOa",
    label: "TikTok",
  },
];

const PrismicContactUsPage = ({ data }: PrismicContactUsPageProps) => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: "",
    },
  });

  const onSubmit = (formData: ContactFormValues) => {
    console.log(formData);
    // Handle form submission here
  };

  // Google Maps embed URL (no API key required)
  const defaultMapUrl = `https://www.google.com/maps?q=6.4459777,3.4789411&z=16&output=embed`;
  const mapUrl = data.map_embed_url || defaultMapUrl;

  return (
    <div className="bg-white pt-[30px] md:pt-[60px] pb-[0px] md:pb-[80px] overflow-hidden">
      <Container className="px-5">
        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-10 lg:gap-20"
        >
          {/* Left Side - Title and Description */}
          <div className="flex-1 ">
            <h1 className="text-[28px] md:text-[40px] font-[700] text-primary leading-[36px] md:leading-[48px] mb-4">
              {data.title || "We'd Love to Hear from You!"}
            </h1>
            <p className="text-[14px] md:text-[16px] text-[#535353] leading-[24px]">
              {data.description ||
                "Whether you have a question, need assistance, or want to share your feedback, we are here to help."}
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 lg:max-w-[500px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Name (Required)"
                      placeholder="Enter your name"
                      className="h-[48px] rounded-[8px] border-gray-200"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormInput
                      field={field}
                      label="Email (Required)"
                      placeholder="Enter your email"
                      type="email"
                      className="h-[48px] rounded-[8px] border-gray-200"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormSelect
                      field={field}
                      label="Type of Inquiry"
                      placeholder="Select"
                      options={inquiryOptions}
                      className="h-[48px] rounded-[8px] border-gray-200"
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormTextArea
                      field={field}
                      label="Message"
                      placeholder="Enter your message"
                      rows={5}
                      className="rounded-[8px] border-gray-200"
                    />
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-10 h-[48px] rounded-full bg-primary hover:bg-primary/90 text-white font-[500]"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>

        {/* Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-24"
        >
          <h2 className="text-[24px] md:text-[32px] font-[700] text-primary mb-8">
            Contact Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div>
              <h4 className="text-[16px] font-[700] text-primary mb-2">
                {data.phone_label || "Phone"}
              </h4>
              <p className="text-[14px] md:text-[16px] text-[#535353]">
                {data.phone_number || "+234 703 164 7277"}
              </p>
            </div>

            {/* Email */}
            <div>
              <h4 className="text-[16px] font-[700] text-primary mb-2">
                {data.email_label || "Email"}
              </h4>
              <p className="text-[14px] md:text-[16px] text-[#535353]">
                {data.email_address || "info@valorhire.com (Customer Support)"}
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-[16px] font-[700] text-primary mb-2">
                {data.address_label || "Address"}
              </h4>
              <p className="text-[14px] md:text-[16px] text-[#535353]">
                {data.address ||
                  "30b Oyibo, Adjahor Street, Lekki Phase 1, Lagos Nigeria"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Follow Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16"
        >
          <h2 className="text-[24px] md:text-[32px] font-[700] text-primary mb-6">
            {data.social_title || "Follow Us on Social Media"}
          </h2>

          <div className="flex gap-4">
            {defaultSocialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-[40px] h-[40px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Icon icon={social.icon} className="text-primary text-xl" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16"
        >
          <div className="w-full h-[300px] md:h-[400px] rounded-[16px] overflow-hidden">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Valor Location Map"
            />
          </div>
        </motion.div>
      </Container>

      <div className="lg:hidden mt-10 block">
        <ExperienceValor />
      </div>
    </div>
  );
};

export default PrismicContactUsPage;
