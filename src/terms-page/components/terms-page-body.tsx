import React from "react";

const TermsPageBody = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#023047] py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <h1 className="text-[32px] md:text-[42px] font-[700] text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-[14px] md:text-[16px] text-white/80">
            Valorhire Technologies Limited
          </p>
          <p className="text-[14px] md:text-[16px] text-white/80">
            Last Updated: February 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-5 py-12 md:py-16">
        {/* 1. Introduction */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            1. Introduction
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            Welcome to Valorhire Technologies Limited! (hereinafter referred to
            as &quot;Valorhire&quot;) By using our website, mobile application,
            and related services (collectively, the &quot;Platform&quot;), you
            agree to comply with and be bound by these Terms and Conditions
            (&quot;Terms&quot;). If you do not agree to these Terms, please do
            not use our Platform.
          </p>
        </section>

        {/* 2. Definitions */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            2. Definitions
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Platform:</strong> The website,
                mobile application, and all services provided by Valorhire
                Technologies Limited.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Customer:</strong> Any person
                or entity registered on the Platform to book a car.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vendor:</strong> Any person or
                entity registered on the Platform to list a car for rental
                purposes.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Rental Agreement:</strong> The
                individual agreement between a Customer and a Vendor for the car
                rental.
              </span>
            </li>
          </ul>
        </section>

        {/* 3. Eligibility */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            3. Eligibility
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            You must be at least 18 years old and possess a valid driver&apos;s
            license to use the Platform as a Customer. Vendors must be at least
            21 years old and provide accurate, legal documentation for vehicles
            listed on the Platform.
          </p>
        </section>

        {/* 4. Account Registration */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            4. Account Registration
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Customer Account:</strong> To
                book a car, Customers must create an account and provide
                accurate and complete information.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vendor Account:</strong>{" "}
                Vendors must create an account, provide identification, and
                submit necessary documentation for each listed vehicle,
                including insurance and vehicle registration details.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">
                  Account Responsibility:
                </strong>{" "}
                You are solely responsible for maintaining the confidentiality
                of your account credentials and for all activities that occur
                under your account.
              </span>
            </li>
          </ul>
        </section>

        {/* 5. Use of the Platform */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            5. Use of the Platform
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            You agree to use the Platform solely for lawful purposes and in
            accordance with these Terms. Unauthorized use, including misuse of
            customer or vendor data, is prohibited and may lead to termination
            of your account.
          </p>
        </section>

        {/* 6. Car Booking and Rental Process */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            6. Car Booking and Rental Process
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Booking:</strong> Customers can
                book cars listed by Vendors on the Platform. All bookings are
                subject to the Vendor&apos;s availability and acceptance.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Rental Agreement:</strong> Each
                rental is governed by a separate Rental Agreement between the
                Customer and the Vendor, outlining the specific rental terms,
                including but not limited to the rental duration, fees, mileage
                limits, fuel requirements, and insurance.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Payments:</strong> All payments
                are processed through the Platform. Customers authorize
                Valorhire to charge the total booking fee as specified at the
                time of booking. Vendors authorize Valorhire to collect payments
                on their behalf.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Cancellation Policy:</strong>{" "}
                Cancellations are subject to Valorhire&apos;s cancellation
                policy, which is outlined in our Cancellation and Refund Policy.
                Refunds may be issued depending on the timing of the
                cancellation.
              </span>
            </li>
          </ul>
        </section>

        {/* 7. Vendor Responsibilities and Obligations */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            7. Vendor Responsibilities and Obligations
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vehicle Condition:</strong>{" "}
                Vendors must ensure that vehicles are in good working condition,
                properly insured, and meet all legal safety standards.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Documentation:</strong> Vendors
                must provide accurate documentation, including registration,
                insurance, and any applicable permits.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Indemnification:</strong>{" "}
                Vendors agree to indemnify Valorhire against any claims,
                damages, or expenses arising from a breach of these Terms or a
                Vendor&apos;s negligence.
              </span>
            </li>
          </ul>
        </section>

        {/* 8. Customer Responsibilities and Obligations */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            8. Customer Responsibilities and Obligations
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Driver&apos;s License:</strong>{" "}
                Customers must possess a valid driver&apos;s license that meets
                the requirements of the jurisdiction where the car will be
                driven.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vehicle Usage:</strong>{" "}
                Customers agree to use the vehicle responsibly and in accordance
                with the rental agreement terms, including limitations on
                mileage and fuel usage.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Damage and Loss:</strong>{" "}
                Customers are responsible for any damage or loss to the vehicle
                during the rental period, excluding normal wear and tear.
              </span>
            </li>
          </ul>
        </section>

        {/* 9. Fees and Charges */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            9. Fees and Charges
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Service Fees:</strong>{" "}
                Valorhire may charge service fees for each booking. Service fees
                are non-refundable and will be displayed before completing a
                booking.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Additional Fees:</strong>{" "}
                Customers may incur additional charges, including but not
                limited to late return fees, mileage overage fees, and refueling
                charges as outlined in the rental agreement.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Payment Processing:</strong>{" "}
                Payments on the Platform are securely processed by an
                independent third-party payment processor. By providing their
                payment information, Customers and Vendors expressly consent to
                the processing of their transactions by this third-party
                provider in accordance with these Terms and any additional terms
                set forth by the payment processor. Valorhire does not directly
                handle payment processing and is not responsible for any issues
                arising from the payment processor&apos;s services.
              </span>
            </li>
          </ul>
        </section>

        {/* 10. Insurance and Liability */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            10. Insurance and Liability
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Insurance:</strong> Vendors
                must provide adequate insurance coverage for their vehicles.
                Valorhire does not offer insurance coverage to Customers or
                Vendors.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Customer Liability:</strong>{" "}
                Customers are responsible for any damages or losses incurred
                during the rental period. Customers are encouraged to obtain
                additional insurance coverage.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vendor Liability:</strong>{" "}
                Vendors assume all liability associated with the condition,
                safety, and legal compliance of their vehicles.
              </span>
            </li>
          </ul>
        </section>

        {/* 11. Limited Liability */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            11. Limited Liability
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Platform Limitations:</strong>{" "}
                Valorhire serves as a marketplace platform connecting Customers
                with Vendors and is not liable for the vehicles, driving
                experience, or any incidents occurring during the rental period.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">No Warranty:</strong> Valorhire
                provides the Platform &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, express or
                implied.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Indemnification:</strong> Users
                agree to indemnify and hold harmless Valorhire from any claims,
                damages, or losses arising from their use of the Platform or
                breach of these Terms.
              </span>
            </li>
          </ul>
        </section>

        {/* 12. Prohibited Activities */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            12. Prohibited Activities
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Misrepresentation:</strong>{" "}
                Providing false information, listing unauthorized vehicles, or
                creating fake accounts is strictly prohibited.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vehicle Misuse:</strong>{" "}
                Customers agree not to use rental vehicles for illegal purposes,
                including but not limited to illegal transportation, racing, or
                hazardous driving.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Data Misuse:</strong> Users
                shall not harvest, scrape, or misuse data from the Platform.
              </span>
            </li>
          </ul>
        </section>

        {/* 13. Dispute Resolution */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            13. Dispute Resolution
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">
                  Dispute with Valorhire:
                </strong>{" "}
                Any disputes arising from these Terms between Users and
                Valorhire shall first be attempted to be resolved through
                good-faith negotiations. If unresolved, disputes may be referred
                to a court of competent jurisdiction in the Federal Republic of
                Nigeria.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">
                  Dispute Between Customers and Vendors:
                </strong>{" "}
                In the event of any dispute arising between a Customer and a
                Vendor, Valorhire may, at its sole discretion, review the issue
                to facilitate an amicable resolution. Valorhire will consider
                all information provided by both parties and make a decision in
                good faith. Any decision made by Valorhire regarding the dispute
                will be final and binding on both the Customer and Vendor.
              </span>
            </li>
          </ul>
        </section>

        {/* 14. Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            14. Intellectual Property
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Ownership:</strong> All content
                on the Platform, including trademarks, logos, text, and images,
                is the intellectual property of Valorhire and shall not be used
                without permission.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">User Content:</strong> By
                submitting content to the Platform (e.g., reviews), you grant
                Valorhire a non-exclusive, royalty-free license to use, display,
                and distribute the content as part of our services.
              </span>
            </li>
          </ul>
        </section>

        {/* 15. Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            15. Privacy Policy
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            Our Privacy Policy outlines how we collect, use, and protect your
            information. By using the Platform, you agree to our Privacy Policy.
          </p>
        </section>

        {/* 16. Changes to Terms and Conditions */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            16. Changes to Terms and Conditions
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            We may update these Terms periodically. Changes will take effect
            upon posting to the Platform, and continued use of the Platform
            constitutes acceptance of the revised Terms.
          </p>
        </section>

        {/* 17. Governing Law */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            17. Governing Law
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            These Terms are governed by and construed in accordance with the
            laws of the Federal Republic of Nigeria without regard to its
            conflict of law provisions.
          </p>
        </section>

        {/* 18. Contact Us */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            18. Contact Us
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <p className="font-[600] text-primary">
              Valorhire Technologies Limited
            </p>
            <p>14c Esther Adeleke Street, Lekki Phase 1, Lagos, Nigeria</p>
            <p>[Email Address]</p>
            <p>[Phone Number]</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsPageBody;
