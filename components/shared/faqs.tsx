"use client";

import React, { useState } from "react";
import Container from "../layout/container";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const faqData = [
  {
    question: "How do I choose the right vehicle?",
    answer:
      "You can browse different categories in the app and select the type that fits your need best.",
  },
  {
    question: "How do I make payments?",
    answer:
      "Payments can be made securely through our platform using various payment methods including cards and bank transfers.",
  },
  {
    question: "What if my request is not approved?",
    answer:
      "If your request is not approved, you will be notified and can try booking with another host or modify your request.",
  },
  {
    question: "What if my request is not approved?",
    answer:
      "If your request is not approved, you will be notified and can try booking with another host or modify your request.",
  },
  {
    question: "How do I make payments?",
    answer:
      "Payments can be made securely through our platform using various payment methods including cards and bank transfers.",
  },
  {
    question: "How do I make payments?",
    answer:
      "Payments can be made securely through our platform using various payment methods including cards and bank transfers.",
  },
];

const FaqItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  return (
    <motion.div
      className="bg-white rounded-[16px] border border-gray-50 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-[16px] font-[500] text-[#2B2B2B] pr-4">
          {question}
        </span>
        <div
          className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen ? "bg-[#9CA3AF]" : "bg-[#F3F4F6]"
          }`}
        >
          <Icon
            strokeWidth={3}
            icon={isOpen ? "mdi:minus" : "mdi:plus"}
            className={`text-xl ${isOpen ? "text-white" : "text-[#9CA3AF]"}`}
          />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-[14px] text-[#3C3C3C] leading-[22px]">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const leftColumnFaqs = faqData.slice(0, 3);
  const rightColumnFaqs = faqData.slice(3, 6);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-[80px]">
      <Container className="px-5">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[12px] md:text-[16px] text-[#646464] mb-1 md:mb-3">
            FAQs
          </p>
          <h2 className="text-[20px] md:text-[40px] font-[700] text-primary leading-[30px] md:leading-[48px]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Grid - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1100px] mx-auto">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {leftColumnFaqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4">
            {rightColumnFaqs.map((faq, index) => (
              <FaqItem
                key={index + 3}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index + 3}
                onToggle={() => handleToggle(index + 3)}
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Faqs;
