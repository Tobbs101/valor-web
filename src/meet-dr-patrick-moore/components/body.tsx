"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBg from "@/assets/meet-dr-patrick-moore.jpg";

const achievements = [
  {
    icon: "🏃",
    title: "Marathon Runner",
    description: "Three-and-a-half-hour marathon running time",
  },
  {
    icon: "🏔️",
    title: "Mountain Climber",
    description: "Climbed all 14,400 feet of Mt. Rainier in Washington State",
  },
  {
    icon: "🚴",
    title: "Charity Cyclist",
    description:
      "Numerous completions of the Bike to the Beach MS charity event",
  },
];

const hobbies = ["Bicycling", "Golfing", "Snow Skiing", "Family Time"];

const MeetDrPatrickMooreBody = () => {
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-indigo-300 to-purple-400">
                <Image
                  src={HeroBg}
                  alt="Dr. Patrick Moore"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 right-0 lg:right-12 bg-white rounded-xl shadow-lg p-4 border-l-4 border-indigo-500"
            >
              <p className="text-indigo-600 font-bold text-lg">DDS</p>
              <p className="text-gray-500 text-sm">Orthodontist</p>
            </motion.div>
          </div>

          {/* Introduction */}
          <div className="lg:pl-8">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4"
            >
              Orthodontist
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Dr. Patrick Moore
            </h1>
            <p className="text-xl text-indigo-600 font-semibold mb-6">DDS</p>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I believe in practicing the best, strongest, and most lasting
                orthodontic care for the benefit of my patients throughout their
                lives.
              </p>
              <p className="font-medium text-gray-700">
                I appreciate the opportunity to change the lives of the people
                who come to me for orthodontic care.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
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
              <h2 className="text-2xl font-bold text-gray-800">My Education</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Military Background */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🎖️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    U.S. Army Background
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  I bring discipline and the expectation of excellence to my
                  orthodontic work that I learned during my time in the U.S.
                  Army. I&apos;m the son of a military family and I began my
                  service after graduating from the dental school at the{" "}
                  <strong>
                    University of Texas Health Science Center in San Antonio
                  </strong>
                  .
                </p>
              </div>

              {/* Global Experience */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🌍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Global Experience
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  My time in the Army took me all over the world and it gave me
                  the opportunity to study orthodontics in one of the best
                  programs in America. This gave me incredible experiences like
                  my time as the{" "}
                  <strong>
                    Orthodontic Consultant to the European Dental Commander
                  </strong>{" "}
                  while I was stationed in Italy.
                </p>
              </div>
            </div>

            {/* Teaching Positions */}
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Teaching Positions
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-800">
                    Oral and Maxillofacial Surgery Resident
                  </p>
                  <p className="text-sm text-indigo-600">
                    Brooke Army Medical Center
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-800">
                    Tri-Service Orthodontic Resident
                  </p>
                  <p className="text-sm text-indigo-600">
                    Lackland Air Force Base
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">My Philosophy</h2>
            </div>
            <p className="text-indigo-100 leading-relaxed text-lg">
              I maintain a philosophy of orthodontics that spares treatment
              unless it is the healthiest, most necessary option for patient
              care. I rely on research-based medicine and techniques. My work
              around the world has proven to be the best and most effective.
            </p>
          </div>
        </motion.div>

        {/* Outside the Office Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100"
        >
          <div className="flex items-center gap-3 mb-8">
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
              My Time Beyond The Office
            </h2>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              I have always lived a very active life outside my practice of
              orthodontics. I am happy to live and work in my home town of San
              Antonio, and to spend time with my beautiful, growing family.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Hobbies Tags */}
          <div className="flex flex-wrap gap-3">
            <span className="text-gray-600 font-medium">Daily activities:</span>
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
              >
                {hobby}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetDrPatrickMooreBody;
