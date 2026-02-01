"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

const whatToBring = [
  {
    icon: "📋",
    title: "Patient Information Form",
    description: "Your completed patient information form",
  },
  {
    icon: "💳",
    title: "Insurance Card",
    description: "Your child's insurance card",
  },
  {
    icon: "🪪",
    title: "Parent/Guardian ID",
    description: "Valid identification for the parent or guardian",
  },
];

const visitSteps = [
  {
    step: 1,
    title: "Review Forms",
    description: "We will review your dental and medical history forms",
    icon: "📝",
  },
  {
    step: 2,
    title: "X-Rays",
    description: "Take X-rays of your teeth and mouth",
    icon: "🔬",
  },
  {
    step: 3,
    title: "Consultation",
    description:
      "The doctor will discuss your X-rays and create your individual treatment plan",
    icon: "👨‍⚕️",
  },
  {
    step: 4,
    title: "Cleaning",
    description:
      "At your next visit, our hygienists will clean and polish your teeth",
    icon: "✨",
  },
];

const OfficeVisitsBody = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4"
          >
            Your Visit
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Office <span className="text-sky-600">Visits</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Our practice is committed to providing you and your family with
            safe, gentle, high-quality dental care. We understand that you, or
            your child, may feel anxious about visiting the dentist. We are
            sensitive to your needs, and it is our goal to make you feel
            comfortable visiting our practice while providing the best care
            possible.
          </p>
        </motion.div>

        {/* First Visit Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">
                <Icon icon="dashicons:smiley" />
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your First Visit Is All About You
            </h2>
            <p className="text-sky-100 text-xl">
              Your comfort, your happiness, and your health.
            </p>
          </div>
        </motion.div>

        {/* What To Expect - Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What To Expect During Your Visit
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here&apos;s what will happen during your first visit and follow-up
              appointment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visitSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 left-6 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.step}
                </div>
                <div className="pt-4">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What To Bring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-10 mb-16 border border-amber-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎒</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                What To Bring
              </h2>
              <p className="text-gray-600">
                Bring your smile, but also remember these items!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whatToBring.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regular Checkups & Appointment Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Regular Checkups */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Regular Checkups
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Regular checkups are an important part of maintaining a healthy
              smile!
            </p>
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🦷</span>
                <p className="font-semibold text-emerald-800">
                  ADA Recommendation
                </p>
              </div>
              <p className="text-emerald-700 text-sm">
                The American Dental Association recommends visiting your dentist
                every six months for regular checkups and routine teeth
                cleanings to keep your teeth and gums healthy.
              </p>
            </div>
          </motion.div>

          {/* Appointment Duration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Appointment Duration
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We understand that you have a busy schedule, so when you&apos;re
              preparing to visit the dentist, please remember:
            </p>
            <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">45-90</span>
                </div>
                <div>
                  <p className="font-semibold text-violet-800">Minutes</p>
                  <p className="text-violet-600 text-sm">
                    Your appointments can last between 45 and 90 minutes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-50 to-sky-50 rounded-3xl p-10 border border-sky-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Schedule Your Visit?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              We look forward to meeting you and your family. Contact us today
              to schedule your first appointment!
            </p>
            <Link
              href="/contact-us?ref=appointment-request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Schedule Appointment
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
      </div>
    </section>
  );
};

export default OfficeVisitsBody;
