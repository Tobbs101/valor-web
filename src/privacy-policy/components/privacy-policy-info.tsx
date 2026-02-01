"use client";

import Container from "@/components/layout/container";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PrivacyPolicyInfo = () => {
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
            Privacy <span className="text-sky-600">Policy</span>
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
                Welcome to Windcrest Pediatric Dentistry ("Windcrest," "we,"
                "our," or "us"). We respect your privacy and are committed to
                protecting the personal information you share with us.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit{" "}
                <a
                  href="https://www.windcrestpediatricdentistry.com"
                  className="text-sky-600 hover:text-sky-700 underline"
                >
                  www.windcrestpediatricdentistry.com
                </a>{" "}
                (the "Website") or otherwise interact with us, including when
                you contact our office, request an appointment, or become a
                patient.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using the Website, you agree to the terms of this Privacy
                Policy. If you do not agree, please do not use the Website.
              </p>
            </section>

            {/* 1. Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We may collect the following types of information:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1.1 Information You Provide to Us
              </h3>

              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Contact & Inquiry Information
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Message or inquiry details</li>
                <li>Preferred appointment date/time</li>
              </ul>

              <h4 className="text-lg font-medium text-gray-800 mb-2">
                Patient & Parent/Guardian Information (when submitted via forms
                or in-office)
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>
                  Patient name, date of birth, and basic demographic information
                </li>
                <li>Parent/guardian name and contact details</li>
                <li>Insurance information</li>
                <li>
                  Limited medical/dental history you choose to provide via
                  online forms or messages (for example, concerns or conditions
                  relevant to appointment scheduling)
                </li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                <p className="text-amber-800">
                  <strong>Note:</strong> Medical and dental information we
                  collect and maintain in connection with providing care may be
                  treated as Protected Health Information (PHI) under the Health
                  Insurance Portability and Accountability Act ("HIPAA"). Our
                  use and disclosure of PHI is also governed by our HIPAA Notice
                  of Privacy Practices, which is available in our office and may
                  be provided separately from this Website Privacy Policy.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1.2 Information Collected Automatically
              </h3>
              <p className="text-gray-700 mb-2">
                When you visit the Website, certain information is collected
                automatically, which may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Referring website or page</li>
                <li>Pages you visit and how long you stay</li>
                <li>The date and time of your visit</li>
              </ul>
              <p className="text-gray-700 mb-4">
                This information is used mainly for Website operation, security,
                and analytics.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1.3 Cookies and Similar Technologies
              </h3>
              <p className="text-gray-700 mb-2">
                We may use cookies, web beacons, and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Remember your preferences</li>
                <li>Enhance user experience</li>
                <li>Measure Website traffic and usage patterns</li>
              </ul>
              <p className="text-gray-700">
                You can usually control cookies through your browser settings.
                If you disable cookies, some features of the Website may not
                function properly.
              </p>
            </section>

            {/* 2. How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-2">
                We may use your information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  To provide dental services and manage patient care (including
                  scheduling appointments and communicating with you about
                  treatment).
                </li>
                <li>To respond to inquiries and customer service requests.</li>
                <li>
                  To communicate with you about appointments, reminders,
                  follow-ups, and important notices related to your or your
                  child's dental care.
                </li>
                <li>To process insurance and billing (where applicable).</li>
                <li>
                  To maintain and improve the Website, including monitoring
                  performance, fixing issues, and analyzing usage trends.
                </li>
                <li>
                  To comply with legal and regulatory obligations, including
                  health, safety, and record-keeping requirements.
                </li>
                <li>
                  For security and fraud prevention, including protecting the
                  Website and our systems.
                </li>
              </ul>
              <p className="text-gray-700 font-semibold">
                We will not sell your personal information.
              </p>
            </section>

            {/* 3. How We Share Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. How We Share Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We may share your information in the following situations:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.1 Service Providers
              </h3>
              <p className="text-gray-700 mb-2">
                We may share information with trusted third-party service
                providers who perform services on our behalf, such as:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Website hosting and maintenance</li>
                <li>Appointment scheduling platforms</li>
                <li>Email and messaging services</li>
                <li>Practice management and billing/insurance processing systems</li>
                <li>Analytics providers</li>
              </ul>
              <p className="text-gray-700 mb-6">
                These third parties are expected to use your information only to
                provide services to us and not for their own purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.2 Healthcare-Related Disclosures
              </h3>
              <p className="text-gray-700 mb-2">
                For patients, we may use and disclose PHI as permitted or
                required by law and as described in our HIPAA Notice of Privacy
                Practices, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-6">
                <li>For treatment, payment, and healthcare operations</li>
                <li>
                  To other healthcare providers involved in your or your child's
                  care
                </li>
                <li>To insurance companies for coverage and payment</li>
                <li>
                  As required by law (for example, to report certain diseases or
                  conditions)
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.3 Legal Requirements and Protection
              </h3>
              <p className="text-gray-700 mb-2">
                We may disclose information if we believe in good faith that
                such disclosure is:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-6">
                <li>
                  Required by law, regulation, court order, or legal process
                </li>
                <li>
                  Necessary to protect the rights, property, or safety of
                  Windcrest Pediatric Dentistry, our patients, our staff, or
                  others
                </li>
                <li>
                  Necessary to detect, prevent, or address fraud or security
                  issues
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.4 Business Transfers
              </h3>
              <p className="text-gray-700">
                In the event of a merger, acquisition, or sale of all or a
                portion of the practice or its assets, your information may be
                transferred as part of that transaction, subject to applicable
                laws.
              </p>
            </section>

            {/* 4. Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Children's Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                Our practice and Website are focused on pediatric patients, but
                the Website is intended to be used by parents or legal
                guardians, not children.
              </p>
              <p className="text-gray-700 mb-4">
                We do not knowingly collect personal information online directly
                from children under 13 without verifiable parental consent. If
                we learn that we have collected personal information from a
                child under 13 through the Website without proper consent, we
                will take reasonable steps to delete that information.
              </p>
              <p className="text-gray-700">
                If you believe your child has provided personal information to
                us through the Website without your consent, please contact us
                using the details in the Contact Us section below.
              </p>
            </section>

            {/* 5. Security of Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Security of Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We use reasonable physical, technical, and administrative
                safeguards designed to protect the information we collect and
                maintain. These measures are intended to prevent unauthorized
                access, use, or disclosure of your information.
              </p>
              <p className="text-gray-700 mb-4">
                However, no system or transmission of data over the internet can
                be guaranteed to be 100% secure. You use the Website and share
                information with us at your own risk.
              </p>
              <p className="text-gray-700 mb-2">
                To help protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  Avoid sending highly sensitive medical or financial
                  information via unencrypted email or contact forms.
                </li>
                <li>
                  Notify us immediately if you believe there has been
                  unauthorized access to your information.
                </li>
              </ul>
            </section>

            {/* 6. Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-700 mb-2">
                We retain information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Provide services and manage our relationship with you</li>
                <li>
                  Comply with legal and regulatory requirements (including
                  medical record retention laws)
                </li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="text-gray-700">
                When information is no longer needed, we will dispose of it in
                accordance with our record retention and destruction policies
                and applicable law.
              </p>
            </section>

            {/* 7. Your Choices and Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Your Choices and Rights
              </h2>
              <p className="text-gray-700 mb-2">
                Depending on your location and applicable law, you may have some
                or all of the following rights regarding your personal
                information (separate from your rights under HIPAA for medical
                records):
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Access and update:</strong> You may request to review
                  and update certain contact information you have provided.
                </li>
                <li>
                  <strong>Opt-out of marketing communications:</strong> If we
                  send non-essential or promotional communications (such as
                  newsletters), you may opt out by following the unsubscribe
                  instructions in the message or by contacting us.
                </li>
                <li>
                  <strong>Cookie controls:</strong> You can adjust your browser
                  settings to refuse cookies or alert you when cookies are being
                  sent.
                </li>
              </ul>
              <p className="text-gray-700">
                For rights related specifically to medical and dental records
                (such as accessing or amending PHI), please refer to our HIPAA
                Notice of Privacy Practices or contact our office directly.
              </p>
            </section>

            {/* 8. Third-Party Websites and Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Third-Party Websites and Links
              </h2>
              <p className="text-gray-700 mb-4">
                The Website may contain links to third-party websites or
                services (for example, mapping services, social media pages, or
                external patient education resources). We are not responsible
                for the privacy practices or content of these third-party sites.
              </p>
              <p className="text-gray-700">
                If you visit those sites, their own privacy policies will apply.
                We encourage you to review the privacy policy of any site you
                visit.
              </p>
            </section>

            {/* 9. Do Not Track Signals */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Do Not Track Signals
              </h2>
              <p className="text-gray-700">
                Some web browsers offer a "Do Not Track" (DNT) feature. There is
                no uniform standard for how websites should respond to DNT
                signals, and our Website does not currently change its practices
                in response to such signals. We may revisit this as standards
                evolve.
              </p>
            </section>

            {/* 10. HIPAA and Medical Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. HIPAA and Medical Information
              </h2>
              <p className="text-gray-700 mb-4">
                Certain information we collect and maintain about our patients
                is Protected Health Information (PHI) and is subject to HIPAA
                and applicable state privacy laws.
              </p>
              <p className="text-gray-700 mb-2">
                Our use and disclosure of PHI is described in our HIPAA Notice
                of Privacy Practices, which:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                <li>Is available at our office</li>
                <li>May be provided to you at your first visit</li>
                <li>Can be requested at any time by contacting us</li>
              </ul>
              <p className="text-gray-700">
                This Website Privacy Policy is intended to supplement, not
                replace, that Notice. If there is a conflict between this Policy
                and our HIPAA Notice of Privacy Practices with respect to PHI,
                the HIPAA Notice of Privacy Practices will control.
              </p>
            </section>

            {/* 11. Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. When we do,
                we will revise the "Last updated" date at the top of this page.
                Changes will be effective when posted to the Website, unless
                otherwise stated.
              </p>
              <p className="text-gray-700">
                Your continued use of the Website after changes are posted means
                you accept those changes.
              </p>
            </section>

            {/* 12. Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy
                or our privacy practices, or if you would like to exercise
                applicable rights, please contact us at:
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

export default PrivacyPolicyInfo;
