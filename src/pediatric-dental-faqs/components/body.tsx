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
    question: "When should I schedule my child's first visit to the dentist?",
    answer:
      "We recommend that you make an appointment to see the dentist as soon as your child gets their first tooth. The American Academy of Pediatric Dentistry recommends that children be seen by six months after their first tooth erupts, or at one year of age, whichever comes first.",
  },
  {
    question: "How is a pediatric dentist different from other dentists?",
    answer:
      "All dental specialists (pediatric dentists, orthodontists, oral surgeons, and others) begin by completing dental school, then continue their education with several years of additional specialized training. During training in the field of pediatric dentistry, your doctor gained extensive knowledge and experience in treating infants, children, and adolescents. Pediatric dentists enjoy working with children, and bring to each patient our expertise in childhood development and behavior. Because our office is geared toward young visitors, you'll find that our staff, as well as our office design, decorations, and activities all work together to provide an especially friendly and comfortable environment for children.",
  },
  {
    question: "What happens during my child's first visit to the dentist?",
    answer:
      "The first visit is usually short and simple. In most cases, we focus on getting to know your child and giving you some basic information about dental care. The doctor will check your child's teeth for placement and health, and will look for any potential problems with the gums and jaw. If necessary, we may do a bit of cleaning. We will also answer any questions you have about how to care for your child's teeth as they develop, and provide you with materials containing helpful tips that you can refer to at home.",
  },
  {
    question: "How can I prepare my child for their first dental appointment?",
    answer:
      "The best preparation for your child's first visit to our office is maintaining a positive attitude. Children pick up on adults' apprehensions, and if you make negative comments about trips to the dentist you can be sure that your child will fear an unpleasant experience and act accordingly. Show your child the pictures of the office and staff on the website. Let your child know that it's important to keep their teeth and gums healthy, and that the doctor will help do that. Remember that your dentist is specially trained to handle fears and anxiety, and our staff excels at putting children at ease during treatment.",
  },
  {
    question: "How often should my child visit the dentist?",
    answer:
      "We generally recommend scheduling checkups every six months. Depending on the circumstances of your child's oral health, we may recommend more frequent visits.",
  },
  {
    question: "Baby teeth aren't permanent. Why do they need special care?",
    answer:
      "Although they don't last as long as permanent teeth, your child's first teeth play an important role in development. While they're in place, these primary teeth help your little one speak, smile, and chew properly. They also hold space in the jaw for permanent teeth. If a child loses a tooth too early (due to damage or decay) nearby teeth may encroach on that space, which can result in crooked or misplaced permanent teeth. Also, your child's general health is affected by the oral health of the teeth and gums.",
  },
  {
    question: "What's the best way to clean my baby's teeth?",
    answer:
      "Even before your baby's first tooth appears, we recommend you clean the gums after feedings with a damp, soft washcloth. As soon as the first tooth appears, you can start using a toothbrush. Choose a toothbrush with soft bristles and a small head. You most likely can find a toothbrush designed for infants at your local drugstore.",
  },
  {
    question:
      "At what age is it appropriate to use toothpaste to clean my child's teeth?",
    answer:
      "Once your child has a few teeth, you can start using toothpaste on the brush. Use only a tiny amount of fluoridated toothpaste (the size of a grain of rice) for each cleaning. Always have your child rinse and spit out toothpaste after brushing. Children naturally want to swallow toothpaste after brushing, and swallowing too much fluoride toothpaste can cause teeth to stain. You should brush your child's teeth until they are ready to take on that responsibility, which usually happens by age six or seven.",
  },
  {
    question: "What causes cavities?",
    answer:
      "Certain types of bacteria live in our mouths. When these bacteria come into contact with sugary foods left behind on our teeth after eating, acids are produced. These acids attack the enamel on the exterior of the teeth, eventually eating through the enamel and creating holes in the teeth, which we call cavities.",
  },
  {
    question: "How can I help my child avoid cavities?",
    answer:
      "Be sure that your child brushes their teeth at least twice a day with fluoride toothpaste. Flossing daily is also important, because flossing can reach spots between the teeth that brushing can't. Check with your pediatric dentist about a fluoride supplement, which helps tooth enamel become harder and more resistant to decay. Avoid sugary foods and drinks, limit snacking, and maintain a healthy diet. And finally, make regular appointments so that we can check the health of your child's teeth and provide professional cleanings.",
  },
  {
    question: "Does my child need dental sealants?",
    answer:
      "Sealants cover the pits and fissures in teeth that are difficult to brush and therefore susceptible to decay. We recommend sealants as a safe, simple way to help your child avoid cavities, especially for molars, which are hardest to reach.",
  },
  {
    question: "My child plays sports. How can I protect their teeth?",
    answer:
      "Even children's sports involve contact, and we recommend mouthguards for children active in sports. If your little one plays baseball, soccer, or other sports, ask us about having a custom-fitted mouthguard made to protect the teeth, lips, cheeks, and gums.",
  },
  {
    question: "What should I do if my child sucks their thumb?",
    answer:
      "The large majority of children suck their thumbs or fingers as infants, and most grow out of it by the age of four, without causing any permanent damage to their teeth. If your child continues sucking after permanent teeth erupt, or if they suck aggressively, let us know and we can check to see if any problems may arise from the habit.",
  },
  {
    question: "When should my child have dental X-rays taken?",
    answer:
      "We recommend taking X-rays around the age of two or three. The first set consists of simple pictures of the front upper and lower teeth, which familiarizes your child with the process. Once the baby teeth in back are touching one another, then regular (at least yearly) X-rays are recommended. Permanent teeth start coming in around age six, and X-rays help us make sure your child's teeth and jaw are healthy and properly aligned. If your child is at a high risk of dental problems, we may suggest having X-rays taken at an earlier age.",
  },
];

const PediatricDentalFAQsBody = () => {
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
            Pediatric Dental FAQs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pediatric Dental <span className="text-sky-600">FAQs</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Below are common questions and our answers about the best way to
            care for children's teeth.
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
            <span className="text-5xl">❓</span>
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
                  {faq.answer}
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
            Still Have Questions? 🤔
          </h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto mb-6">
            We're here to help! Feel free to reach out to our friendly team with
            any questions about your child's dental health.
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

export default PediatricDentalFAQsBody;
