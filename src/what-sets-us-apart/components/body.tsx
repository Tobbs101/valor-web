"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroBg from "@/assets/happy-girl-with-adorable-hair-smiling.jpg";

const sedationOptions = [
  {
    icon: "💨",
    title: "Nitrous Oxide Sedation",
    description:
      "Safe and gentle sedation to help children relax during procedures.",
  },
  {
    icon: "💊",
    title: "Oral Conscious Sedation",
    description:
      "Medication to calm anxious patients while keeping them responsive.",
  },
  {
    icon: "😴",
    title: "General Anesthesia",
    description: "Complete sedation for complex procedures when appropriate.",
  },
];

const orthodonticFeatures = [
  {
    icon: "🛡️",
    title: "Safe Treatments",
    description:
      "All procedures prioritize your child's safety and well-being.",
  },
  {
    icon: "✨",
    title: "Comfortable Care",
    description: "Modern techniques that minimize discomfort during treatment.",
  },
  {
    icon: "🎯",
    title: "Effective Results",
    description: "Proven methods that deliver beautiful, lasting smiles.",
  },
  {
    icon: "🔬",
    title: "Latest Technology",
    description: "State-of-the-art orthodontic equipment for complete care.",
  },
];

const WhatSetsUsApartBody = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4"
          >
            Why Choose Us
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Sets Us <span className="text-sky-600">Apart</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dedicated to providing exceptional pediatric dental and orthodontic
            care in a warm, welcoming environment where every child feels at
            home.
          </p>
        </motion.div>

        {/* Smallest Smiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">👶</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Taking Care of the Smallest Smiles
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                We understand how daunting the dentist&apos;s office can seem to
                little ones, and we are skilled at helping to ease our
                patients&apos; anxieties over being in our office.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium mb-8">
                Giving your child proper and excellent oral healthcare is
                vitally important and we are committed to doing everything we
                can to help you provide this invaluable service to your child.
              </p>

              {/* Sedation Options */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Sedation Options Available
                </p>
                {sedationOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{option.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={HeroBg}
                  alt="Happy child at dentist"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-300 rounded-full opacity-30 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-300 rounded-full opacity-30 blur-xl" />
            </motion.div>
          </div>
        </motion.div>

        {/* Beautiful Smiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Making All Smiles Beautiful for Life
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-sky-100 leading-relaxed text-lg mb-4">
                  We also have a reputation for offering the most complete
                  orthodontic care in a friendly, inviting, and professional
                  environment.
                </p>
                <p className="text-white font-semibold text-xl">
                  When you visit our practice, you&apos;re not just another
                  smile – you&apos;re family!
                </p>
              </div>
              <div>
                <p className="text-sky-100 leading-relaxed">
                  We provide a variety of orthodontic treatments that are
                  comfortable, safe, and effective. Our practice is equipped
                  with the latest orthodontic technology, so that we can provide
                  complete care for your smile.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {orthodonticFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors"
                >
                  <span className="text-3xl mb-3 block">{feature.icon}</span>
                  <h3 className="font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sky-200 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dedication Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Dedicated to Your Family&apos;s Health
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              Our entire pediatric dental and orthodontic team is dedicated to
              your family&apos;s health and helping you achieve and maintain a
              beautiful smile for many years to come. We look forward to getting
              to know you and your family.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Contact Our Practice
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "40+", label: "Years Experience" },
            { number: "3", label: "Expert Doctors" },
            { number: "1000s", label: "Happy Families" },
            { number: "100%", label: "Dedicated Care" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <p className="text-3xl md:text-4xl font-bold text-sky-600 mb-2">
                {stat.number}
              </p>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatSetsUsApartBody;
