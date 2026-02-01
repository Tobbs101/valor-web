"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const officeHours = [
  { day: "Monday", hours: "8:00am to 5:00pm" },
  { day: "Tuesday", hours: "8:00am to 5:00pm" },
  { day: "Wednesday", hours: "8:00am to 5:00pm" },
  { day: "Thursday", hours: "8:00am to 5:00pm" },
  { day: "Friday", hours: "8:00am to 5:00pm" },
  { day: "Saturday", hours: "8:00am to 1:00pm" },
];

const googleMapsUrl =
  "https://www.google.com/maps/place/5500+Walzem+Rd,+San+Antonio,+TX+78218";
const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473.8!2d-98.3867!3d29.4969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865cf5e5e5e5e5e5%3A0x0!2s5500+Walzem+Rd%2C+San+Antonio%2C+TX+78218!5e0!3m2!1sen!2sus!4v1234567890";

const OfficeLocation = () => {
  return (
    <div className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
            San Antonio Office Location
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            San Antonio <span className="text-sky-600">Office Location</span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Doctors */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sky-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">👨‍⚕️</span> Our Doctors
              </h2>
              <div className="">
                <p className="text-lg hover:text-customPurple text-gray-700 font-medium">
                  <Link
                    href="/meet-dr-sylvester-awagu"
                    className="hover:underline hover:text-customPurple"
                  >
                    Sylvester Awagu, DMD, MS
                  </Link>
                </p>

                <p className="text-lg my-2 hover:text-customPurple text-gray-700 font-medium">
                  <Link
                    href="/meet-dr-patrick-moore"
                    className="hover:underline hover:text-customPurple"
                  >
                    Patrick Moore, DDS
                  </Link>
                </p>

                <p className="text-lg hover:text-customPurple text-gray-700 font-medium">
                  <Link
                    href="/meet-dr-donald-mills"
                    className="hover:underline hover:text-customPurple"
                  >
                    Donald Mills, DDS
                  </Link>
                </p>
              </div>
              {/* <p className="text-sky-600 font-semibold mt-4 text-lg">
                Windcrest Pediatric Dentistry
              </p> */}
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sky-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">📍</span> Address
              </h2>
              <address className="not-italic text-lg text-gray-700 leading-relaxed">
                5500 Walzem Rd.
                <br />
                San Antonio, TX 78218
              </address>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sky-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">📞</span> Contact
              </h2>
              <div className="space-y-3">
                <p className="text-lg text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href="tel:2106574641"
                    className="text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    (210) 657-4641
                  </a>
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:info@windcrestpediatricdentistry.com"
                    className="text-sky-600 hover:text-sky-700 transition-colors break-all"
                  >
                    info@windcrestpediatricdentistry.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Office Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl p-8 shadow-xl text-white h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🕐</span> Office Hours
              </h2>
              <div className="space-y-4">
                {officeHours.map((schedule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center py-3 border-b border-sky-400/30 last:border-0"
                  >
                    <span className="font-medium text-lg">{schedule.day}</span>
                    <span className="text-sky-100">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>

              {/* View Larger Map Button */}
              <motion.a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 font-semibold rounded-full hover:bg-sky-50 transition-colors shadow-lg w-full justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                View Larger Map
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl border-4 border-white"
        >
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Windcrest Pediatric Dentistry Location"
            className="w-full"
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-700 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl flex items-center justify-center gap-2 font-bold mb-4">
            Ready to Visit Us?{" "}
            <Icon icon="icon-park-outline:teeth" className="text-3xl" />
          </h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-6">
            We look forward to welcoming you and your family to Windcrest
            Pediatric Dentistry!
          </p>
          <a
            href="tel:2106574641"
            className="inline-block px-8 py-4 bg-white text-sky-600 font-semibold rounded-full hover:bg-sky-50 transition-colors shadow-lg"
          >
            Call (210) 657-4641
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default OfficeLocation;
