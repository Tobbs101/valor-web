"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

const onlineServices = [
  {
    icon: "📅",
    title: "View Appointments",
    description: "View your appointment and account information any time",
  },
  {
    icon: "🔔",
    title: "Appointment Reminders",
    description: "Sign up for email or text appointment reminders",
  },
  {
    icon: "💰",
    title: "Payment History",
    description: "Check your payment history and see current charges",
  },
  {
    icon: "🧾",
    title: "Print Receipts",
    description: "Print out flex spending reimbursement and tax receipts",
  },
];

const paymentMethods = [
  { icon: "💳", name: "Visa" },
  { icon: "💳", name: "Mastercard" },
  { icon: "💳", name: "American Express" },
  { icon: "💳", name: "Discover" },
  { icon: "🏥", name: "Insurance Plans" },
];

const FinancialInformationBody = () => {
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
            className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4"
          >
            Payment Options
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Financial <span className="text-emerald-600">Information</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            The cost of your treatment will vary depending on your individual
            needs and treatment plan. We will discuss with you the cost of your
            treatment and each of your available payment options before you
            begin, so that you can make the best choice for you.
          </p>
        </motion.div>

        {/* Affordable Payment Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-4xl">💵</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Affordable Payment Plans
                </h2>
                <p className="text-emerald-100">
                  Making quality dental care accessible
                </p>
              </div>
            </div>

            <p className="text-emerald-50 text-xl mb-8 max-w-3xl">
              Your smile is yours forever, and we want to make it as easy as
              possible for you to receive the best dental care when you need it.
            </p>

            {/* Payment Methods */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-emerald-100 font-medium mb-4">We Accept:</p>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full"
                  >
                    <span>{method.icon}</span>
                    <span className="text-white font-medium text-sm">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insurance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Insurance Help */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏥</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Insurance Assistance
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our practice accepts most major credit cards and insurance plans.
              Our office staff is always available to help you with insurance
              claims and paperwork.
            </p>
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-sky-600"
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
                <div>
                  <p className="font-semibold text-sky-800 mb-1">
                    We Work With Your Provider
                  </p>
                  <p className="text-sky-700 text-sm">
                    We&apos;ll work with your insurance provider to make sure
                    that your coverage meets your needs and your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">❓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Have Questions?
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Please let us know if you have any questions about your
                insurance coverage. Our friendly staff is here to help you
                understand your options and find the best solution for your
                family.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 w-fit"
            >
              Contact Us
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

        {/* Online Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">💻</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Convenient Online Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With the simple click of a mouse, our secure online service allows
              you to manage your account from anywhere.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {onlineServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Patient Login CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl ml-1.5 text-white">
                  <Icon icon="hugeicons:lock-key" />
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Need a Patient Login?</h2>
              <p className="text-gray-300 max-w-xl mx-auto mb-8">
                If you do not have a patient login, please let us know at your
                next appointment, and we will gladly help you set up your own
                personal account.
              </p>
              <Link
                href="/contact-us?ref=appointment-request"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Request Account Setup
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinancialInformationBody;
