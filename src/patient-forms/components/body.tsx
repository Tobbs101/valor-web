"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";

const forms = [
  {
    icon: "📝",
    title: "Online Registration Form",
    description: "Complete your patient registration before your first visit",
    href: "https://patientviewer.com/WebFormsGWT/GWT/WebForms/WebForms.html?DOID=9375&RKID=2370&WSDID=58601",
    color: "sky",
  },
  {
    icon: "🏥",
    title: "Online Health History Form",
    description:
      "Provide your medical and dental health history securely online",
    href: "https://patientviewer.com/WebFormsGWT/GWT/WebForms/WebForms.html?DOID=9375&RKID=2370&WSDID=58607",
    color: "emerald",
  },
];

const steps = [
  {
    step: 1,
    title: "Fill Out Forms",
    description: "Complete the confidential forms online",
    icon: "✍️",
  },
  {
    step: 2,
    title: "Submit Securely",
    description: "Click submit to send with secure encryption",
    icon: "🔒",
  },
  {
    step: 3,
    title: "We Receive It",
    description: "Your information will be ready when you arrive",
    icon: "📬",
  },
  {
    step: 4,
    title: "Verify at Office",
    description: "Provide a signature to verify accuracy",
    icon: "✅",
  },
];

const PatientFormsBody = () => {
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
            Get Started
          </motion.span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Patient <span className="text-sky-600">Forms</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Take a few minutes to fill out these confidential forms, then click
            the &quot;Submit&quot; button and your information will be sent to
            our office with secure encryption. We will already have your
            information when you arrive for your first appointment.
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-16 border border-amber-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Important Note
              </h3>
              <p className="text-gray-600">
                You will need to provide a signature at the office to verify
                that the information you submitted online is accurate.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Forms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {forms.map((form, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                target="_blank"
                href={form.href}
                className={`block bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group ${
                  form.color === "sky"
                    ? "hover:border-sky-200"
                    : "hover:border-emerald-200"
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                    form.color === "sky"
                      ? "bg-gradient-to-br from-sky-400 to-blue-500"
                      : "bg-gradient-to-br from-emerald-400 to-teal-500"
                  } shadow-lg`}
                >
                  <span className="text-4xl">{form.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors">
                  {form.title}
                </h2>
                <p className="text-gray-600 mb-6">{form.description}</p>
                <div
                  className={`inline-flex items-center gap-2 font-semibold ${
                    form.color === "sky" ? "text-sky-600" : "text-emerald-600"
                  }`}
                >
                  Fill Out Form
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our simple process ensures your information is secure and ready
              before your visit
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
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

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl text-white">
                <Icon icon="lets-icons:lock-alt-light" />
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Your Information Is Safe
            </h2>
            <p className="text-sky-100 max-w-2xl mx-auto text-lg">
              All forms are submitted using secure encryption to protect your
              personal and medical information. Your privacy is our priority.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientFormsBody;
