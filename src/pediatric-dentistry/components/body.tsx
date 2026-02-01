"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroBg from "@/assets/happy-afro-kid-regular-check-up-teeth-dental-clinic.jpg";
import { Icon } from "@iconify/react";

const teethTimeline = [
  {
    age: "6-12 months",
    title: "First Baby Teeth",
    description: "Primary teeth begin to erupt",
  },
  {
    age: "~3 years",
    title: "Full Baby Teeth",
    description: "All primary teeth have erupted",
  },
  {
    age: "6 years",
    title: "Permanent Teeth Start",
    description: "First permanent teeth begin erupting",
  },
  {
    age: "21 years",
    title: "Full Adult Teeth",
    description: "28-32 permanent teeth (including wisdom teeth)",
  },
];

const preventionTips = [
  {
    icon: "🦷",
    title: "Regular Checkups",
    description:
      "Visit the dentist every six months for cleanings and checkups",
  },
  {
    icon: "💧",
    title: "Fluoride Treatments",
    description: "Twice a year treatments to keep teeth their strongest",
  },
  {
    icon: "🛡️",
    title: "Tooth Sealants",
    description: "Seal deep grooves to prevent decay in hard-to-reach areas",
  },
];

const PediatricDentistryBody = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold mb-4"
            >
              For Little Smiles
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Pediatric <span className="text-pink-500">Dentistry</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A child&apos;s first visit to the dentist should be enjoyable.
              Children are not born with a natural fear of the dentist, but they
              can fear the unknown. Our office makes a special effort to use
              pleasant, non-frightening, simple words to describe each
              treatment.
            </p>
            <p className="text-gray-700 font-medium">
              We want you and your child to feel at ease from the moment your
              family arrives at our office.
            </p>
          </div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200">
              <Image
                src={HeroBg}
                alt="Child at pediatric dentist"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-400 rounded-full opacity-20 blur-xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-rose-400 rounded-full opacity-20 blur-xl" />
          </motion.div>
        </motion.div>

        {/* AAPD Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🏥</span>
                </div>
                <p className="text-sky-100 font-medium">
                  American Academy of Pediatric Dentistry recommends...
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Visit by First Birthday
              </h2>
              <p className="text-sky-100 leading-relaxed">
                Children should visit the dentist by their first birthday. It is
                important that your child&apos;s newly erupted teeth (erupting
                at six to 12 months of age) receive proper dental care and
                benefit from proper oral hygiene habits right from the
                beginning.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl block mb-2">🎂</span>
                  <p className="text-white font-bold">1st Birthday</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fun Kit Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-16 border border-amber-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎉</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Getting to know your teeth is fun!
                </h3>
                <p className="text-gray-600">
                  Download our Dynamite Dental Fun Kit!
                </p>
              </div>
            </div>
            <a
              href="/files/dynamite-dental-fun-kit.pdf"
              download="dynamite-dental-fun-kit.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Download Fun Kit
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* When New Teeth Arrive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🦷</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              When New Teeth Arrive
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">👶</span> Baby Teeth Eruption
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your child&apos;s first primary, or &quot;baby,&quot; teeth will
                begin to erupt between the ages of six to 12 months, and will
                continue to erupt until about age three. During this time, your
                child&apos;s gums may feel tender and sore.
              </p>
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                <p className="text-pink-800 font-medium mb-2">
                  To help alleviate discomfort:
                </p>
                <ul className="text-pink-700 text-sm space-y-1">
                  <li>• Soothe gums with a clean finger or cool, wet cloth</li>
                  <li>• Use a teething ring</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">😁</span> Permanent Teeth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your child&apos;s primary teeth are shed at various times
                throughout childhood. Permanent teeth begin erupting at age six,
                and continue until age 21. Adults have 28 permanent teeth (32
                teeth including wisdom teeth).
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teethTimeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-100 text-center"
              >
                <p className="text-pink-600 font-bold text-lg mb-1">
                  {item.age}
                </p>
                <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Healthy Oral Hygiene Habits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-100 mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Adopting Healthy Oral Hygiene Habits
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Examining Teeth */}
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                <span>🔍</span> Regular Examination
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                As your child&apos;s teeth erupt, be sure to examine them every
                two weeks, looking for lines and discoloration that may be
                caused by decay. Remember that sugary foods and liquids can
                attack a new tooth, so take care that your child brushes after
                feeding or eating.
              </p>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-emerald-700 font-medium">
                  💡 We recommend brushing two times a day for optimal oral
                  hygiene.
                </p>
              </div>
            </div>

            {/* Brushing */}
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                <span>🪥</span> Brushing Tips
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Brushing can be fun, and your child should brush as soon as the
                first tooth arrives. Parents should brush with a soft-bristled
                toothbrush and a pea-sized amount of toothpaste.
              </p>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <p className="text-amber-700 font-medium text-sm">
                  ⚠️ For children younger than two, do not use fluoride
                  toothpaste unless advised by your dentist or healthcare
                  professional.
                </p>
              </div>
            </div>

            {/* Flossing */}
            <div className="md:col-span-2">
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-100">
                <h3 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2">
                  <span>🧵</span> Flossing
                </h3>
                <p className="text-gray-600">
                  Flossing is also a part of good oral hygiene habits, and your
                  dentist will discuss with you the right time to start flossing
                  your child&apos;s teeth. If you notice signs of decay, contact
                  your dentist immediately.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preventing Tooth Decay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🛡️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Preventing Tooth Decay with Regular Checkups
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Tooth decay is caused by sugars left in your mouth that turn into
              an acid, which can break down your teeth. Children are at high
              risk for tooth decay for a simple reason: many children and
              adolescents do not practice regular, good oral hygiene habits.
              Proper brushing and flossing routines combined with regular dental
              visits help keep tooth decay away.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {preventionTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{tip.icon}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 6 Month Reminder */}
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Every 6 Months</h3>
              <p className="text-violet-100 max-w-xl mx-auto">
                Your child should visit the dentist every six months for regular
                dental cleanings and checkups. Sealants last for several years
                and will be monitored at your child&apos;s regular checkups.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-10 border border-pink-100">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-5xl text-white">
                <Icon icon="dashicons:smiley" />
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Schedule Your Child&apos;s Visit?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
              Let us help your child build healthy dental habits that will last
              a lifetime. Contact us today to schedule an appointment!
            </p>
            <Link
              href="/contact-us?ref=appointment-request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
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

export default PediatricDentistryBody;
