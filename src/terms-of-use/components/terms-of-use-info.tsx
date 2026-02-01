"use client";

import Container from "@/components/layout/container";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsOfUseInfo = () => {
  return (
    <Container className="py-16 px-5 bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-sky-600">Conditions</span>
          </h1>
          <p className="text-gray-600">Last updated: 10/January/2025</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-sky-100 p-8 md:p-12"
        >
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to{" "}
                <a
                  href="https://www.windcrestpediatricdentistry.com"
                  className="text-sky-600 hover:text-sky-700 underline"
                >
                  www.windcrestpediatricdentistry.com
                </a>{" "}
                (the "Website"), operated by Windcrest Pediatric Dentistry
                ("Windcrest," "we," "us," or "our").
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms & Conditions ("Terms") govern your access to and use
                of the Website. By accessing or using the Website, you agree to
                be bound by these Terms and our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-sky-600 hover:text-sky-700 underline"
                >
                  Privacy Policy
                </Link>
                . If you do not agree, please do not use the Website.
              </p>
            </section>

            {/* 1. Website for Informational Purposes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Website for Informational and Educational Purposes Only
              </h2>
              <p className="text-gray-700 mb-4">
                The content on this Website, including text, images, videos, and
                other materials, is provided for general informational and
                educational purposes only.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  It is not a substitute for professional dental, medical, or
                  other health advice, diagnosis, or treatment.
                </li>
                <li>
                  Nothing on the Website is intended to create a doctor–patient
                  relationship.
                </li>
                <li>
                  You should always seek the advice of a dentist, physician, or
                  other qualified healthcare provider with any questions you may
                  have regarding your or your child's oral health or general
                  health.
                </li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <p className="text-red-800">
                  <strong>Emergency:</strong> In case of a dental or medical
                  emergency, call 911 or go to the nearest emergency room
                  immediately. Do not rely on the Website or electronic
                  communication for emergency situations.
                </p>
              </div>
            </section>

            {/* 2. Eligibility */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Eligibility and Use of the Website
              </h2>
              <p className="text-gray-700 mb-2">
                By using this Website, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  You are at least the age of majority in your jurisdiction, or
                  you are using the Website under the supervision of a parent or
                  legal guardian.
                </li>
                <li>
                  You will use the Website only for lawful purposes and in
                  accordance with these Terms.
                </li>
                <li>
                  Parents or legal guardians are responsible for supervising the
                  use of this Website by minors.
                </li>
              </ul>
            </section>

            {/* 3. Appointments */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Appointments, Online Forms, and Communications
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.1 Appointments and Requests
              </h3>
              <p className="text-gray-700 mb-2">
                The Website may allow you to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Request an appointment</li>
                <li>Submit contact or request forms</li>
                <li>
                  Provide limited information to help us schedule or respond to
                  you
                </li>
              </ul>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                <p className="text-amber-800">
                  Submitting a form or request through the Website does not
                  guarantee an appointment or create a patient relationship. An
                  appointment is only confirmed when we contact you and
                  explicitly confirm the date and time.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.2 Electronic Communications
              </h3>
              <p className="text-gray-700 mb-4">
                When you contact us through the Website, email, or other
                electronic means, you consent to receive communications from us
                electronically (unless and until you opt out where permissible).
              </p>
              <p className="text-gray-700">
                Please do not include highly sensitive medical or financial
                information in unencrypted forms or emails.
              </p>
            </section>

            {/* 4. No Medical Advice */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. No Dental or Medical Advice
              </h2>
              <p className="text-gray-700 mb-2">
                All information on the Website is general in nature and:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Is not tailored to any specific individual</li>
                <li>
                  May not reflect the most current dental or medical standards
                </li>
                <li>
                  Should not be relied upon to make decisions about diagnosis or
                  treatment
                </li>
              </ul>
              <p className="text-gray-700 font-semibold">
                Always consult a qualified healthcare provider for personal
                medical or dental decisions.
              </p>
            </section>

            {/* 5. Insurance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Insurance, Billing, and Financial Information
              </h2>
              <p className="text-gray-700 mb-4">
                Any information on the Website about insurance, accepted plans,
                billing, or fees is general and may change over time.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  It does not create a binding promise that a particular service
                  will be covered by your insurance.
                </li>
                <li>
                  Actual coverage, co-pays, and out-of-pocket costs are
                  determined by your insurance plan and your individual
                  benefits.
                </li>
                <li>
                  You are responsible for confirming coverage with your insurer
                  and for any fees or balances that are not covered.
                </li>
              </ul>
              <p className="text-gray-700">
                For specific questions about costs or coverage, please contact
                our office directly.
              </p>
            </section>

            {/* 6. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-700 mb-4">
                All content on the Website, including but not limited to text,
                graphics, logos, photos, icons, images, audio, video, and
                software (collectively, the "Content"), is owned by or licensed
                to Windcrest Pediatric Dentistry and is protected by copyright,
                trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>You may:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>
                  View the Website and print limited copies of pages for your
                  personal, non-commercial use related to obtaining our dental
                  services.
                </li>
              </ul>
              <p className="text-gray-700 mb-2">
                <strong>You may not, without our prior written permission:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>
                  Copy, reproduce, distribute, modify, create derivative works
                  from, publicly display, or publicly perform any Content.
                </li>
                <li>
                  Use any trademarks, logos, or branding from the Website.
                </li>
              </ul>
              <p className="text-gray-700">
                All rights not expressly granted in these Terms are reserved by
                us.
              </p>
            </section>

            {/* 7. User Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. User Conduct and Prohibited Uses
              </h2>
              <p className="text-gray-700 mb-2">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  Use the Website for any illegal purpose or in violation of any
                  applicable law or regulation.
                </li>
                <li>
                  Transmit any content that is unlawful, defamatory, harassing,
                  threatening, hateful, obscene, or otherwise objectionable.
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Website, our servers, or any other systems or networks.
                </li>
                <li>Introduce viruses, malware, or other harmful code.</li>
                <li>
                  Use any automated means (such as robots or scrapers) to access
                  the Website without our prior written permission.
                </li>
                <li>Interfere with the security or operation of the Website.</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your access to the
                Website if we believe you have violated these Terms.
              </p>
            </section>

            {/* 8. Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Third-Party Links and Services
              </h2>
              <p className="text-gray-700 mb-4">
                The Website may contain links to third-party websites, services,
                or resources (such as maps, payment portals, social media pages,
                or educational materials).
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>These links are provided for your convenience only.</li>
                <li>
                  We do not control and are not responsible for the content,
                  policies, or practices of any third-party sites.
                </li>
                <li>
                  Your use of third-party sites is at your own risk and subject
                  to their terms and privacy policies.
                </li>
              </ul>
            </section>

            {/* 9. Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Your use of the Website is also governed by our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-sky-600 hover:text-sky-700 underline"
                >
                  Privacy Policy
                </Link>
                , which describes how we collect, use, and protect your personal
                information.
              </p>
              <p className="text-gray-700">
                In addition, certain information about our patients may be
                considered Protected Health Information (PHI) and is governed by
                our HIPAA Notice of Privacy Practices, which is separate from
                these Terms and the Website Privacy Policy.
              </p>
            </section>

            {/* 10. Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Children's Privacy and Use
              </h2>
              <p className="text-gray-700 mb-4">
                While our practice focuses on pediatric patients, the Website is
                intended to be used and managed by adults, such as parents or
                legal guardians.
              </p>
              <p className="text-gray-700">
                We do not knowingly permit children under 13 to submit personal
                information through the Website without appropriate parental or
                guardian consent. Parents or guardians who believe their child
                has submitted information should contact us so we can address
                the issue.
              </p>
            </section>

            {/* 11. Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Disclaimers
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Use at Your Own Risk.</strong> The Website and its
                Content are provided on an "as is" and "as available" basis,
                without any warranties of any kind, either express or implied.
              </p>
              <p className="text-gray-700 mb-2">
                To the fullest extent permitted by law, we disclaim all
                warranties, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>
                  Warranties of accuracy, completeness, reliability, or
                  timeliness of the Content.
                </li>
                <li>
                  Warranties of merchantability, fitness for a particular
                  purpose, and non-infringement.
                </li>
                <li>
                  Warranties that the Website will be uninterrupted, error-free,
                  or free of viruses or other harmful components.
                </li>
              </ul>
              <p className="text-gray-700">
                We do not warrant or guarantee any specific results from using
                the Website or acting on its Content.
              </p>
            </section>

            {/* 12. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-2">
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  Windcrest Pediatric Dentistry, its owners, dentists, employees,
                  contractors, and agents will not be liable for any indirect,
                  incidental, consequential, special, or punitive damages arising
                  out of or related to your use of or inability to use the
                  Website or its Content.
                </li>
                <li>
                  Our total liability for any claims arising out of or related to
                  your use of the Website shall not exceed the amount you paid
                  (if any) to use the Website, or, if no such amount was paid, a
                  nominal amount such as $100.
                </li>
              </ul>
              <p className="text-gray-700">
                Some jurisdictions do not allow exclusion or limitation of
                certain damages, so some of the above limitations may not apply
                to you.
              </p>
            </section>

            {/* 13. Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Indemnification
              </h2>
              <p className="text-gray-700 mb-2">
                You agree to indemnify, defend, and hold harmless Windcrest
                Pediatric Dentistry and its owners, dentists, employees,
                contractors, and agents from and against any and all claims,
                liabilities, damages, losses, costs, and expenses (including
                reasonable attorneys' fees) arising out of or relating to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Your use of the Website</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another person or entity</li>
              </ul>
            </section>

            {/* 14. Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. Changes to the Website and Terms
              </h2>
              <p className="text-gray-700 mb-2">
                We may, at any time and without notice:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>
                  Modify, update, suspend, or discontinue all or part of the
                  Website.
                </li>
                <li>Modify these Terms.</li>
              </ul>
              <p className="text-gray-700">
                When we update the Terms, we will revise the "Last updated" date
                at the top of this page. Your continued use of the Website after
                changes are posted signifies your acceptance of the revised
                Terms.
              </p>
            </section>

            {/* 15. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                15. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms and your use of the Website are governed by the laws
                of the State of Texas, without regard to its conflict of law
                principles.
              </p>
              <p className="text-gray-700">
                You agree that any dispute arising out of or relating to these
                Terms or the Website shall be brought exclusively in the state
                or federal courts located in Bexar County, Texas, and you
                consent to the personal jurisdiction and venue of such courts.
              </p>
            </section>

            {/* 16. Severability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                16. Severability
              </h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be invalid, illegal,
                or unenforceable, that provision will be enforced to the fullest
                extent permitted by law, and the remaining provisions will
                remain in full force and effect.
              </p>
            </section>

            {/* 17. No Waiver */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                17. No Waiver
              </h2>
              <p className="text-gray-700">
                Our failure to enforce any right or provision of these Terms
                shall not be deemed a waiver of such right or provision.
              </p>
            </section>

            {/* 18. Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                18. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, the Website, or our
                practice, please contact us:
              </p>
              <div className="bg-sky-50 rounded-xl p-6 border border-sky-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Windcrest Pediatric Dentistry
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href="https://www.windcrestpediatricdentistry.com"
                      className="text-sky-600 hover:text-sky-700"
                    >
                      www.windcrestpediatricdentistry.com
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@windcrestpediatricdentistry.com"
                      className="text-sky-600 hover:text-sky-700"
                    >
                      info@windcrestpediatricdentistry.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a
                      href="tel:2106574641"
                      className="text-sky-600 hover:text-sky-700"
                    >
                      (210) 657-4641
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> 5500 Walzem Rd. San Antonio, TX
                    78218
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-full hover:bg-sky-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </Container>
  );
};

export default TermsOfUseInfo;
