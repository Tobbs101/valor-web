"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/assets/logo-white.png";
import Image from "next/image";
import { ImageField, KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

// Default static data
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

const defaultFooterLinks = [
  { label: "Terms and Condition", href: "/terms-and-conditions" },
  {
    label: "Cancellation & Refund Policy",
    href: "/cancellation-refund-policy",
  },
];

// Types for Prismic data
interface SocialLink {
  icon?: KeyTextField;
  url?: LinkField;
  label?: KeyTextField;
}

interface FooterLink {
  label?: KeyTextField;
  url?: LinkField;
}

interface SiteSettingsData {
  footer_logo?: ImageField;
  footer_links?: FooterLink[];
  social_links?: SocialLink[];
  copyright_text?: KeyTextField;
}

interface PrismicFooterProps {
  data?: SiteSettingsData | null;
}

const PrismicFooter = ({ data }: PrismicFooterProps) => {
  // Use Prismic data if available, otherwise use defaults
  const footerLinks = data?.footer_links?.length
    ? data.footer_links.map((link) => ({
        label: link.label || "",
        href: link.url && "url" in link.url ? link.url.url || "#" : "#",
      }))
    : defaultFooterLinks;

  const socialLinks = data?.social_links?.length
    ? data.social_links.map((social) => ({
        icon: social.icon || "mdi:link",
        href: social.url && "url" in social.url ? social.url.url || "#" : "#",
        label: social.label || "Social",
      }))
    : defaultSocialLinks;

  const copyrightText =
    data?.copyright_text ||
    `Copyright ©${new Date().getFullYear()} All rights reserved. Valorhire Technologies Limited`;

  return (
    <footer className="bg-[#023047] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-start md:items-center gap-8">
          {/* Logo */}
          {data?.footer_logo?.url ? (
            <PrismicNextImage
              field={data.footer_logo}
              className="w-40 lg:w-48 h-auto object-contain"
            />
          ) : (
            <Image
              src={Logo}
              alt="Valor"
              className="w-40 lg:w-48 h-auto object-contain"
            />
          )}

          {/* Links */}
          <div className="flex flex-wrap justify-start md:justify-center gap-8">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors text-[16px] underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex w-full md:justify-center justify-start gap-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Icon icon={social.icon} className="text-[#023047] text-2xl" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[14px] w-full text-white/80 text-left md:text-center mt-4">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PrismicFooter;
