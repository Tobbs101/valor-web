"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBg from "@/assets/meet-dr-sylvester-awagu.jpg";

const education = [
  {
    degree: "Bachelor of Dental Surgery",
    institution: "University College Hospital",
  },
  {
    degree: "Doctorate of Dental Medicine",
    institution: "University of Pennsylvania School of Dental Medicine",
  },
  {
    degree: "Oral and Maxillofacial Surgery Internship",
    institution: "University of Maryland Medical Complex",
  },
  {
    degree: "Certificate in Pediatric Dentistry",
    institution: "Baylor College of Dentistry",
  },
  {
    degree: "Master of Science",
    institution: "Baylor College of Dentistry",
  },
];

const affiliations = [
  "Diplomate, American Board of Pediatric Dentistry",
  "Fellow, American Academy of Pediatric Dentistry",
  "American Academy of Pediatrics",
  "American Dental Association",
  "Society for Pediatric Sedation",
  "Texas Dental Association",
  "Texas Academy of Pediatric Dentistry",
  "San Antonio Dental District Society",
];

const honors = [
  "Omicron Kappa Upsilon National Dental Honor Society",
  "Academy Of Operative Dentistry Award for Academic Excellence",
  "Pass-International Dentist Award for Academic Excellence",
];

const MeetDrSlyvesterAwaguBody = () => {
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
          {/* Profile Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-300 to-blue-400">
                <Image
                  src={HeroBg}
                  alt="Dr. Sylvester Awagu"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sky-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 right-0 lg:right-12 bg-white rounded-xl shadow-lg p-4 border-l-4 border-sky-500"
            >
              <p className="text-sky-600 font-bold text-lg">DMD, MS</p>
              <p className="text-gray-500 text-sm">Board Certified</p>
            </motion.div>
          </div>

          {/* Introduction */}
          <div className="lg:pl-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold mb-4"
            >
              Pediatric Dentist
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Dr. Sylvester Awagu
            </h1>
            <p className="text-xl text-sky-600 font-semibold mb-6">DMD, MS</p>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I love the variety that pediatric dentistry provides. No day in
                dentistry is like the next, and every patient is different. I
                feel fortunate that I have been blessed with a gift and the
                ability to improve the quality of life of the patients I treat,
                whether examining a child at their first dental appointment or
                discussing with their family ways to ensure their child grows up
                cavity-free.
              </p>
              <p className="font-medium text-gray-700">
                I love showing children dentistry can be fun. My mission is to
                break down walls of fear and create a bond of trust that will
                last the rest of their lives.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Education & Affiliations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center">
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-sky-200 hover:border-sky-500 transition-colors"
                >
                  <div className="absolute left-[-5px] top-1 w-2 h-2 bg-sky-500 rounded-full" />
                  <h3 className="font-semibold text-gray-800">{item.degree}</h3>
                  <p className="text-sm text-gray-500">{item.institution}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Professional Affiliations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Professional Affiliations
              </h2>
            </div>
            <div className="grid gap-3">
              {affiliations.map((affiliation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-2 h-2 mt-2 bg-emerald-500 rounded-full flex-shrink-0" />
                  <p className="text-gray-700">{affiliation}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Commitment to Excellence
            </h2>
            <p className="text-sky-100 leading-relaxed text-lg">
              As a Diplomate of the American Board of Pediatric Dentistry, I am
              committed to continuing my education in many areas of pediatric
              dentistry. I have advanced training in the treatment of children
              under general anesthesia and oral conscious sedation, children
              with special needs, and cleft lip and palate dentistry.
              Additionally, through my memberships with the American Dental
              Association, the Society of Pediatric Sedation, and the Academy of
              Pediatric Dentists, I am able to confer with my peers on the
              latest, most effective, and most comfortable treatments and
              services in the field of pediatric dentistry.
            </p>
          </div>
        </motion.div>

        {/* Honors & Outside Office Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Honors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Honors</h2>
            </div>
            <div className="space-y-4">
              {honors.map((honor, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">{honor}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Outside the Office */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Outside the Office
              </h2>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-4">
                I am happily married to my wife, <strong>Nnenna</strong>, a
                Nurse Anesthetist. We have three daughters and one son.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In my free time I enjoy spending time with my family, hiking and
                fishing, playing lawn tennis, being active in my church, and
                going on dental missions to Africa and the Caribbean countries.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "Family Time",
                  "Hiking",
                  "Fishing",
                  "Tennis",
                  "Church",
                  "Dental Missions",
                ].map((hobby) => (
                  <span
                    key={hobby}
                    className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetDrSlyvesterAwaguBody;
