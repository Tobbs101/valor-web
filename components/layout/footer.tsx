"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/assets/Logo.png";
import Image from "next/image";

const browseLinks = [
  { title: "Home", href: "/" },
  { title: "Meet the Team", href: "/meet-the-team" },
  { title: "Office Visits", href: "/office-visits" },
  { title: "Pediatrics", href: "/pediatric-dentistry" },
  { title: "Orthodontics", href: "/about-orthodontics" },
  { title: "Contact Us", href: "/contact-us" },
];

const socialLinks = [
  {
    icon: "mdi:map-marker",
    href: "https://www.google.com/maps/place/5500+Walzem+Rd,+San+Antonio,+TX+78218",
    label: "Location",
  },
  {
    icon: "mdi:facebook",
    href: "https://www.facebook.com/windcrestpediatricdentistry",
    label: "Facebook",
  },
  {
    icon: "mdi:youtube",
    href: "https://www.youtube.com",
    label: "YouTube",
  },
  {
    icon: "mdi:twitter",
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: "simple-icons:yelp",
    href: "https://www.yelp.com",
    label: "Yelp",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#5BA4C9] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <Image
            src={Logo}
            alt="Windcrest Pediatric Dentistry"
            className="w-40 lg:w-48"
          />
          {/* Browse Section */}

          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wide">BROWSE</h3>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {browseLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-wide">CONNECT</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  <Icon icon={social.icon} className="text-2xl" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-white/80">
            <span>
              © {new Date().getFullYear()} Windcrest Pediatric Dentistry
            </span>
            <span className="hidden sm:inline">|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link
              href="/terms-of-use"
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
