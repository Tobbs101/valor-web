"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is orthodontics?",
    answer:
      "Orthodontics (also referred to as dentofacial orthopedics) is a specialized form of dentistry focusing on the diagnosis, prevention, and treatment of dental and facial abnormalities.",
  },
  {
    question: "What is an orthodontist?",
    answer:
      "An orthodontist is a dental specialist who has received two to three years of additional training and experience. Your orthodontist is able to straighten teeth, correct misaligned jaw structure, and improve the function of your smile.",
  },
  {
    question: "What's the best age to visit the orthodontist?",
    answer:
      "If you want to improve the look and feel of your smile, then any age can be a great age to see the orthodontist. The American Association of Orthodontists recommends that children first visit an orthodontist around the age of seven; however, orthodontic treatment is not exclusive to children and teens, with about one in every five orthodontic patients being over the age of 21. Whether you're considering treatment for yourself or for a child, any time is a good time to visit the orthodontist.",
  },
  {
    question:
      "How can I take care of my teeth if I'm wearing braces or a retainer?",
    answer: null,
    bulletPoints: [
      "ALWAYS remember to brush your teeth after every meal and floss at least once a day.",
      "Make sure to use toothpaste that contains fluoride, and ask your orthodontist or family dentist if you need a fluoride rinse. This will help prevent cavities!",
      "If you take out your retainer to eat, make sure you brush your teeth, floss, and remember to keep it safe in its container so that it does not get lost or broken.",
      "Keep your retainer clean, too, by brushing it gently with a toothbrush and toothpaste. You may also soak it in denture cleaner as instructed by your orthodontist. Do not put your retainer in boiling water or in the dishwasher.",
      "During your treatment, try to avoid foods with a lot of sugar, which increases the amount of bacteria that grows in your mouth, causing more plaque and possibly cavities.",
      "Avoid sticky and chewy foods (caramel, chewing gum, gummy bears), hard foods (hard candy, nuts, ice cubes), or any foods that could possibly get stuck in your braces (corn on the cob, soft bagels, ribs, taffy, etc.).",
      "Be sure to schedule your routine checkups with your family dentist. It is recommended that you continue to visit the dentist every six months.",
    ],
  },
  {
    question: "What are braces?",
    answer:
      "Braces are used by your orthodontist to help you improve the look and feel of your smile. There are several different types of braces to choose from, including:",
    bracesTypes: [
      "Clear braces",
      "Ceramic braces",
      "Lingual braces",
      "Self-ligating braces",
      "Invisible braces",
      "Traditional metal braces",
    ],
  },
  {
    question: "If I get braces, how long do I have to wear them?",
    answer:
      "The amount of time spent in braces will vary depending on the individual patient, because every smile responds differently to treatment. Treatment times can take anywhere between six and 30 months, but most standard treatments take about 22 months.",
  },
  {
    question: "Do braces hurt?",
    answer:
      "Braces do not often hurt though you may feel a small amount of discomfort for a couple days as your teeth, gums, cheeks, and mouth get used to your new braces.",
  },
  {
    question: "Do I need to brush my teeth more often if I have braces?",
    answer:
      "With braces, you should brush your teeth at least three times a day to keep your teeth, gums, and mouth healthy and clean. Brushing regularly will help remove any food that may be caught between the braces. You should also floss daily to get in between your braces where your brush isn't able to reach. Your orthodontist can show you how to properly brush and floss once your braces are placed.",
  },
  {
    question:
      "If I have braces, do I still need dental checkups every six months?",
    answer:
      "Yes! In fact, it's even more important that patients receiving orthodontic treatment visit their dentist regularly. With braces, food may be caught in places that your toothbrush can't reach. This causes bacteria to build up that can lead to cavities, gingivitis, and gum disease. Your dentist will work closely with your orthodontist to make sure that your teeth stay clean and healthy while wearing braces.",
  },
  {
    question:
      "Will my braces interfere with my school activities like sports, playing an instrument, or singing?",
    answer:
      "Playing an instrument or a contact sport may require some adjustment when you first get your braces, but wearing braces will not stop you from participating in any of your school activities. If you play a contact sport, it is recommended that you wear a mouthguard to protect your braces or appliance.",
  },
  {
    question: "How do I schedule my next appointment?",
    answer:
      "Simply call our practice! Our front desk staff will be happy to help schedule your next appointment at your convenience. If you are a new patient or have been referred to our practice, please let us know and we will provide you with all of the information you need.",
  },
];

const OrthodonticsFAQsBody = () => {
  return (
    <div className="bg-gradient-to-b from-sky-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
            Orthodontic FAQs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions About{" "}
            <span className="text-sky-600">Orthodontics</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about orthodontic treatment,
            braces, and caring for your smile.
          </p>
        </motion.div>

        {/* FAQ Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-5xl">🦷</span>
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 md:p-8"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-sky-100 rounded-xl px-4 data-[state=open]:bg-sky-50 transition-colors"
              >
                <AccordionTrigger className="text-left text-gray-900 font-semibold hover:text-sky-600 py-4 [&[data-state=open]]:text-sky-600">
                  <span className="flex items-start gap-3">
                    <span className="text-sky-500 font-bold min-w-[24px]">
                      {index + 1}.
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-4 pl-9">
                  {faq.answer && <p className="mb-3">{faq.answer}</p>}
                  {faq.bulletPoints && (
                    <ul className="space-y-2">
                      {faq.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-sky-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {faq.bracesTypes && (
                    <ul className="grid grid-cols-2 gap-2 mt-2">
                      {faq.bracesTypes.map((type, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 bg-sky-50 px-3 py-2 rounded-lg"
                        >
                          <span className="text-sky-500">✓</span>
                          <span className="text-gray-700">{type}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-700 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Schedule Your Appointment? 📅
          </h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-6">
            Our friendly team is here to help you achieve the beautiful, healthy
            smile you deserve. Contact us today to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="inline-block px-8 py-4 bg-white text-sky-600 font-semibold rounded-full hover:bg-sky-50 transition-colors shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="tel:2106574641"
              className="inline-block px-8 py-4 bg-sky-400/20 text-white font-semibold rounded-full hover:bg-sky-400/30 transition-colors border border-white/30"
            >
              Call (210) 657-4641
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrthodonticsFAQsBody;
