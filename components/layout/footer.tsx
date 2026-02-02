"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/assets/logo-white.png";
import Image from "next/image";

const socialLinks = [
  {
    icon: "mdi:whatsapp",
    href: "https://wa.me/",
    label: "WhatsApp",
  },
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com",
    label: "Instagram",
  },
  {
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: "ic:baseline-tiktok",
    href: "https://www.tiktok.com",
    label: "TikTok",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#023047] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Image
            src={Logo}
            alt="Valor"
            className="w-40 lg:w-48 h-auto object-contain"
          />

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="/terms-and-conditions"
              className="text-white/90 hover:text-white transition-colors text-[16px] underline underline-offset-4"
            >
              Terms and Condition
            </Link>
            <Link
              href="/cancellation-refund-policy"
              className="text-white/90 hover:text-white transition-colors text-[16px] underline underline-offset-4"
            >
              Cancellation & Refund Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
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
          <p className="text-[14px] text-white/80 text-center mt-4">
            Copyright ©{new Date().getFullYear()} All rights reserved. Valorhire
            Technologies Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
