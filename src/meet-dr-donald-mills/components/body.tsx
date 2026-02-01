"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBg from "@/assets/meet-dr-donald-mills.jpg";

const affiliations = [
  "American Dental Association",
  "Texas Dental Association",
  "American Association of Orthodontists",
  "Texas Tweed Society",
  "Texas Orthodontic Association",
];

const communityWork = [
  {
    icon: "🏫",
    title: "Elementary School Mentor",
    description:
      "Received lifetime membership in the Parent Teacher Association",
  },
  {
    icon: "🦷",
    title: "Dental Volunteer",
    description:
      "Volunteered with local dental society doing school dental exams",
  },
];

const MeetDrDonaldMillsBody = () => {
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
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200 via-teal-300 to-emerald-400">
                <Image
                  src={HeroBg}
                  alt="Dr. Donald Mills"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-500 rounded-full opacity-20 blur-xl" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 right-0 lg:right-12 bg-white rounded-xl shadow-lg p-4 border-l-4 border-teal-500"
            >
              <p className="text-teal-600 font-bold text-lg">DDS</p>
              <p className="text-gray-500 text-sm">40+ Years Experience</p>
            </motion.div>
          </div>

          {/* Introduction */}
          <div className="lg:pl-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4"
            >
              Orthodontist
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Dr. Donald Mills
            </h1>
            <p className="text-xl text-teal-600 font-semibold mb-6">DDS</p>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I have been practicing orthodontics for over 40 years. My father
                was an orthodontist and I naturally followed in his footsteps,
                wanting to make a difference in a child&apos;s life by helping
                to give them confidence through lasting oral health.
              </p>
              <p className="font-medium text-gray-700">
                There is nothing more rewarding to me than taking a child who is
                ashamed of the way his or her teeth look and creating a
                beautiful smile. It can change the child&apos;s entire
                personality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-4xl text-center mx-auto">
            <svg
              className="w-12 h-12 text-white/30 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-teal-100 leading-relaxed text-xl italic">
              I think orthodontics is the best profession in the world as it
              gives those of us who practice a chance to change people&apos;s
              lives. We can literally turn an introvert who is ashamed to smile
              because of bad teeth into an extrovert who smiles all the time!
            </p>
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
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
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
              <h2 className="text-2xl font-bold text-gray-800">
                Education & Experience
              </h2>
            </div>
            <div className="space-y-4">
              <div className="relative pl-6 border-l-2 border-teal-200 hover:border-teal-500 transition-colors">
                <div className="absolute left-[-5px] top-1 w-2 h-2 bg-teal-500 rounded-full" />
                <h3 className="font-semibold text-gray-800">
                  Originally from Corpus Christi, Texas
                </h3>
                <p className="text-sm text-gray-500">Hometown</p>
              </div>
              <div className="relative pl-6 border-l-2 border-teal-200 hover:border-teal-500 transition-colors">
                <div className="absolute left-[-5px] top-1 w-2 h-2 bg-teal-500 rounded-full" />
                <h3 className="font-semibold text-gray-800">
                  Undergraduate Studies
                </h3>
                <p className="text-sm text-gray-500">University of Houston</p>
              </div>
              <div className="relative pl-6 border-l-2 border-teal-200 hover:border-teal-500 transition-colors">
                <div className="absolute left-[-5px] top-1 w-2 h-2 bg-teal-500 rounded-full" />
                <h3 className="font-semibold text-gray-800">
                  Doctorate of Dental Surgery
                </h3>
                <p className="text-sm text-gray-500">
                  University of Texas Dental Branch
                </p>
              </div>
              <div className="relative pl-6 border-l-2 border-teal-200 hover:border-teal-500 transition-colors">
                <div className="absolute left-[-5px] top-1 w-2 h-2 bg-teal-500 rounded-full" />
                <h3 className="font-semibold text-gray-800">
                  Orthodontic Residency
                </h3>
                <p className="text-sm text-gray-500">Three-year program</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-teal-50 rounded-xl">
              <p className="text-sm text-gray-600 italic">
                Because the practice and science of orthodontics is
                ever-changing, I am constantly interested in keeping up with the
                latest techniques by attending applicable courses each year.
              </p>
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

        {/* Windcrest Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-2xl p-8 md:p-10 mb-16 border border-teal-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              At Windcrest Pediatric Dentistry
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Working at Windcrest Pediatric Dentistry has given me the
            opportunity to be with a great orthodontic team where not only are
            we committed to the highest level of professional service, but also
            to giving our patients personalized and loving care.
          </p>
          <p className="text-gray-600 leading-relaxed">
            One of the most important elements in orthodontic practice is
            establishing trust and rapport. I try to show my patients how
            exciting it is to observe the positive changes during treatment, and
            love their joyous responses when they see the final result.
          </p>
        </motion.div>

        {/* Outside Office & Community Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Outside the Office */}
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Outside the Office
              </h2>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                I currently live in the community of{" "}
                <strong>Oakwell Farms</strong> and have been here since 1992. I
                am married to my wonderful wife, <strong>Reenie</strong>, who
                worked as a school teacher, reading specialist, and finally a
                counselor before she retired.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We have four children, all grown up with kids of their own,
                which makes me a proud grandfather.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⛳</span>
                <h3 className="font-semibold text-gray-800">Avid Golfer</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                When I am not working, you can probably find me on the golf
                course. I am an avid golfer, although not a very good one, but I
                keep trying. I find golf to be a great respite from the daily
                grind. There is something serene about the beauty of the golf
                course and surrounding area.
              </p>
            </div>
          </motion.div>

          {/* Community Involvement */}
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Community Involvement
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              I enjoy giving back to my community as much as possible.
            </p>
            <div className="space-y-4">
              {communityWork.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-5 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{work.icon}</span>
                    <h3 className="font-bold text-gray-800">{work.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{work.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetDrDonaldMillsBody;
