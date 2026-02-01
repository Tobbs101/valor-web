"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  funFact?: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Angela",
    role: "Dental Assistant",
    image: "/images/team/angela.jpg",
  },
  {
    name: "Annavell",
    role: "Front Office Assistant",
    image: "/images/team/annavell.jpg",
  },
  {
    name: "Cynthia",
    role: "Executive Assistant/Office Manager",
    bio: "Cynthia has been with Windcrest Pediatric Dentistry since June 2012, where she started as a dental assistant. Her favorite thing about working at Windcrest Pediatric Dentistry is that no two days are ever the same. She loves doing a variety of tasks and taking care of patients in need.",
    funFact: "She's a huge wrestling fan (WWE, AEW, NXT).",
    image: "/images/team/cynthia.jpg",
  },
  {
    name: "Daniela",
    role: "Laboratory Assistant",
    image: "/images/team/daniela.jpg",
  },
  {
    name: "Jezabel",
    role: "Front Office Assistant",
    image: "/images/team/jezabel.jpg",
  },
  {
    name: "Judy",
    role: "Dental Assistant",
    bio: "Judy is a Harlingen, TX native who grew up in Raymondville, TX before making her way to the San Antonio area. She studied at the San Antonio College of Medical and Dental Assistants.",
    funFact:
      "In her free time, she loves to take her dog on walks and spend time with family and friends.",
    image: "/images/team/judy.jpg",
  },
  {
    name: "Kassandra",
    role: "Front Office Assistant",
    image: "/images/team/kassandra.jpg",
  },
  {
    name: "Maya",
    role: "Dental Assistant",
    image: "/images/team/maya.jpg",
  },
  {
    name: "Melissa",
    role: "Dental Assistant",
    bio: "Melissa graduated from the University of the Incarnate Word in 2019 as a Registered Dental Assistant.",
    funFact: "Her hobbies include attending rodeos, hunting and fishing.",
    image: "/images/team/melissa.jpg",
  },
  {
    name: "Priscilla",
    role: "Dental Assistant",
    bio: "Priscilla was born and raised in San Antonio and is a huge Spurs fan. She loves to work at Windcrest Pediatric Dentistry because she helps patients each day leave the office with a clean mouth and smile.",
    funFact:
      "When she's not working, she enjoys being outdoors, watching movies and spending time with her daughter and cat, Spider.",
    image: "/images/team/priscilla.jpg",
  },
  {
    name: "Sharon",
    role: "Orthodontic Assistant",
    bio: "Sharon is a Texas transplant via New Jersey and North Carolina. She also had a brief stint in Virginia Beach. Orthodontics is a passion for her as she brings 35+ years of experience to Windcrest Pediatric Dentistry (WPD), working with Dr. Awagu on early treatment and Dr. Moore for full treatment. What she loves about WPD is the close family feeling towards all of her patients. It's a lot of fun and laughter throughout the day.",
    funFact:
      "Sharon is a dog rescuer from way back. Beagles and Bullies are special to her and she enjoys nothing better than snuggling with her pup.",
    image: "/images/team/sharon.jpg",
  },
  {
    name: "Valerie",
    role: "Dental Assistant/Front Office Administrator",
    bio: "Valerie has been working for Windcrest Pediatric Dentistry for 4 years. Valerie helps coordinate visits and treatments of our patients. Valerie is a proud mother of two beautiful daughters.",
    funFact:
      "In her spare time, she enjoys taking her family on camping trips! She loves working at Windcrest Pediatric Dentistry because she knows that the patients always leave with a smile!",
    image: "/images/team/valerie.jpg",
  },
];

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-sky-100 to-sky-200">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-5xl font-bold">
                {member.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
        <p className="text-sky-600 font-semibold text-sm mb-3">{member.role}</p>

        {member.bio && (
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
            {member.bio}
          </p>
        )}

        {member.funFact && (
          <div className="mt-4 p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border-l-4 border-sky-500">
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">
              Fun Fact
            </p>
            <p className="text-sm text-gray-700 italic">{member.funFact}</p>
          </div>
        )}
      </div>

      {/* Decorative Element */}
      <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const MeetTheBody = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-customPurple/10 text-customPurple rounded-full text-sm font-semibold mb-4">
            Our Amazing Staff
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Meet Our <span className="text-sky-600">Dedicated Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our friendly and experienced team is committed to providing the best
            dental care experience for your child. Get to know the wonderful
            people behind our practice!
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl shadow-xl">
            <div className="text-left text-white">
              <h3 className="text-xl font-bold">Want to Join Our Team?</h3>
              <p className="text-sky-100 text-sm">
                We&apos;re always looking for talented individuals!
              </p>
            </div>
            <a
              href="/contact-us"
              className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors duration-300 whitespace-nowrap"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheBody;
