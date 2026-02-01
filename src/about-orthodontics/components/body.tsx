"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";
import HeroBg from "@/assets/dental-procedure-installing-braces-close-up-dentistry-braces-teeth.jpg";

const issuesList = [
  {
    title: "Difficulty with Chewing and Speaking",
    description:
      "Poorly aligned teeth can make biting and chewing more difficult and may even affect speech.",
  },
  {
    title: "Tooth Decay and Gum Disease",
    description:
      "Crowded or crooked teeth can be harder to clean, increasing the risk of cavities and gum disease.",
  },
  {
    title: "Jaw Pain and Headaches",
    description:
      "An improper bite can place extra strain on your jaw muscles, leading to discomfort, headaches, or even jaw joint disorders (TMJ).",
  },
  {
    title: "Aesthetics and Confidence",
    description:
      "A straight, healthy smile can boost self-esteem and improve your overall appearance.",
  },
];

const treatmentSteps = [
  {
    step: "1",
    title: "Consultation and Planning",
    description:
      "Your orthodontist will first conduct a thorough examination, which may include X-rays, photographs, and impressions of your teeth. Based on this, a personalized treatment plan is created.",
  },
  {
    step: "2",
    title: "Appliances",
    description:
      "Depending on your needs, your orthodontist may recommend traditional braces, clear aligners, or other specialized appliances. These devices help guide the teeth into proper alignment.",
  },
  {
    step: "3",
    title: "Regular Adjustments",
    description:
      "Throughout your treatment, you'll visit your orthodontist every four to eight weeks for regular checkups and adjustments. Each adjustment allows the appliances to continue guiding your teeth toward their ideal position.",
  },
  {
    step: "4",
    title: "Retention",
    description:
      "After your teeth have moved into place, you'll wear a retainer to ensure they stay in their new position and don't shift back.",
  },
];

const successTips = [
  {
    icon: "📋",
    title: "Follow Your Orthodontist's Instructions",
    description:
      "Whether it's wearing aligners for the recommended time each day or showing up for regular adjustments, sticking to your orthodontist's plan is crucial.",
  },
  {
    icon: "🪥",
    title: "Maintain Excellent Oral Hygiene",
    description:
      "Brushing and flossing regularly is essential, especially with braces or aligners, to prevent plaque buildup and cavities.",
  },
  {
    icon: "🚫",
    title: "Avoid Harmful Habits",
    description:
      "Chewing on hard objects (like ice or pens) or eating sticky, crunchy foods can damage braces or disrupt the treatment process.",
  },
  {
    icon: "😁",
    title: "Wear Retainers as Prescribed",
    description:
      "Once your treatment is complete, wearing retainers will ensure your teeth stay in their new position and don't shift back over time.",
  },
];

const AboutOrthodonticsBody = () => {
  return (
    <div className="bg-gradient-to-b from-sky-10 via-white to-blue-10 py-16 px-4 sm:px-6 lg:px-8">
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
            About Orthodontics
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-sky-600">Orthodontics</span>
          </h1>
        </motion.div>

        {/* Introduction Section with Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Orthodontic treatment is a specialized branch of dentistry focused
              on correcting misaligned teeth and jaws. It involves the
              diagnosis, prevention, and treatment of dental and facial
              irregularities.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Orthodontists use a variety of appliances, such as braces and
              clear aligners, to guide teeth into their proper position. The
              goal is not only to improve the appearance of your smile but also
              to enhance the overall function of your bite, making it easier to
              speak, chew, and maintain good oral hygiene.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
            {/* Replace with actual image */}
            <Image
              src={HeroBg}
              alt="About Orthodontics"
              fill
              className="object-cover"
            />
            {/* <div className="text-center p-8">
              <span className="text-6xl mb-4 block">🦷</span>
              <p className="text-sky-600 font-medium">Image Placeholder</p>
            </div> */}
          </div>
        </motion.div>

        {/* Why Orthodontic Treatment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🤔 Why Orthodontic Treatment is{" "}
              <span className="text-sky-600">Necessary</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Orthodontic treatment is often essential for both functional and
              aesthetic reasons. Misaligned teeth or jaws can lead to a range of
              issues:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {issuesList.map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-500 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {issue.title}
                </h3>
                <p className="text-gray-600">{issue.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-lg text-gray-700 mt-8 max-w-3xl mx-auto"
          >
            Orthodontic treatment addresses these concerns by correcting bite
            issues, improving oral health, and enhancing your smile.
          </motion.p>
        </motion.div>

        {/* How Treatment Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              ⚙️ How Does Orthodontic Treatment Work?
            </h2>
            <p className="text-xl text-sky-100 text-center max-w-3xl mx-auto">
              Orthodontic treatment works by applying gentle, constant pressure
              to the teeth over time, gradually moving them into the desired
              position.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatmentSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="absolute -top-4 left-6 w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌟 How to Make Orthodontic Treatment{" "}
              <span className="text-sky-600">Successful</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Success in orthodontic treatment requires a combination of regular
              orthodontic care and good personal habits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {successTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-sky-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-sky-100"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-500 via-blue-600 to-sky-700 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl gap-2 flex items-center justify-center md:text-3xl font-bold mb-4">
            Ready for a Beautiful, Healthy Smile?{" "}
            <span className="text-3xl text-white">
              <Icon icon="dashicons:smiley" />
            </span>
          </h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-6">
            With dedication and proper care, orthodontic treatment can deliver
            long-lasting, life-changing results, leaving you with a healthy,
            beautiful smile!
          </p>
          <a
            href="/contact-us?ref=appointment-request"
            className="inline-block px-8 py-4 bg-white text-sky-600 font-semibold rounded-full hover:bg-sky-50 transition-colors shadow-lg"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutOrthodonticsBody;
