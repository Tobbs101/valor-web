import React from "react";

const CancellationPolicyPageBody = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#023047] py-20 md:py-32">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <h1 className="text-[32px] md:text-[42px] font-[700] text-white mb-4">
            Cancellation Policy
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
        {/* Intro */}
        <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-10">
          At Valorhire Technologies Limited, we understand that plans can
          change. This Cancellation and Refund Policy (&quot;Policy&quot;)
          outlines the terms under which cancellations and refunds may be
          processed on our platform. By booking a car or listing a car on our
          platform, you agree to the following terms:
        </p>

        {/* 1. General Terms */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            1. General Terms
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">
                  Non-Refundable Service Fees:
                </strong>{" "}
                Valorhire may charge a service fee for each booking made on the
                platform. This service fee is non-refundable, even if a booking
                is canceled.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Third-Party Fees:</strong> Any
                fees processed by third-party payment providers may be subject
                to additional cancellation policies, for which Valorhire is not
                responsible.
              </span>
            </li>
          </ul>
        </section>

        {/* 2. Cancellations by Customers */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            2. Cancellations by Customers
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            Customers may cancel a booking via their account on the platform.
            Refund eligibility is determined based on the time of cancellation
            relative to the scheduled booking start date, as outlined below.
          </p>

          <h3 className="text-[16px] md:text-[18px] font-[600] text-primary mb-2">
            Free Cancellation Window
          </h3>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            A customer is entitled to a full (100%) refund if the cancellation
            is made within 24 hours of booking, provided the scheduled start
            date is more than 48 hours away.
          </p>

          <h3 className="text-[16px] md:text-[18px] font-[600] text-primary mb-2">
            Refund Tiers Based on Notice Period
          </h3>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-3">
            Where the Free Cancellation Window does not apply, refunds for
            cancellations shall be processed as follows:
          </p>
          <ul className="space-y-2 text-[15px] md:text-[16px] text-[#646464] leading-relaxed ml-4">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                72 hours or more before start date – Eligible for a 100% refund
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                48 to 72 hours before start date – Eligible for an 80% refund
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                24 to 48 hours before start date – Eligible for a 50% refund
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Less than 24 hours before start date – Non-refundable, except as
                provided under Clause 5 (Extenuating Circumstances)
              </span>
            </li>
          </ul>
          <p className="text-[13px] text-[#9CA3AF] mt-4 italic">
            We do not sell your data, use it for advertising, or share it with
            third parties for commercial gain.
          </p>
        </section>

        {/* 3. Cancellations by Vendors */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            3. Cancellations by Vendors
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            Vendors may cancel a booking only in exceptional cases, including
            unexpected vehicle issues or unavailability. Vendor-initiated
            cancellations will be managed as follows:
          </p>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Customer Notification:</strong>{" "}
                If a Vendor cancels a booking, the Customer will be notified
                immediately and offered a full refund or an option to book an
                alternative vehicle.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vendor Penalties:</strong>{" "}
                Vendors may be subject to penalties or suspension from the
                platform if they frequently cancel bookings without valid
                reasons.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">
                  Refund Processing for Customer:
                </strong>{" "}
                If the Customer opts for a refund due to Vendor cancellation,
                the full booking amount (including service fees) will be
                refunded.
              </span>
            </li>
          </ul>
        </section>

        {/* 4. Refund Processing */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            4. Refund Processing
          </h2>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Refund Timeline:</strong>{" "}
                Refunds are generally processed within [X] business days from
                the date of cancellation approval. However, actual processing
                times may vary depending on the Customer&apos;s bank or payment
                provider.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Payment Method:</strong>{" "}
                Refunds will be issued to the original payment method used at
                the time of booking. Valorhire is not responsible for any fees
                or delays imposed by the payment provider.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Partial Refunds:</strong> In
                cases of partial refunds, only the eligible portion of the
                booking amount will be refunded. Service fees and any applicable
                cancellation fees will be deducted from the refund amount.
              </span>
            </li>
          </ul>
        </section>

        {/* 5. Extenuating Circumstances */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            5. Extenuating Circumstances
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            Valorhire may offer refunds or special accommodations for certain
            extenuating circumstances, which may include, but are not limited
            to:
          </p>
          <ul className="space-y-2 text-[15px] md:text-[16px] text-[#646464] leading-relaxed ml-4 mb-4">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Serious illness, injury, or death of the Customer or an
                immediate family member.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Severe weather events, natural disasters, or government-imposed
                travel restrictions.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>
                Other emergencies beyond the control of the Customer or Vendor.
              </span>
            </li>
          </ul>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <strong className="text-primary">Supporting Documentation:</strong>{" "}
            Customers may be required to provide documentation for verification
            of extenuating circumstances. Refunds or accommodations in these
            cases are provided at Valorhire&apos;s sole discretion.
          </p>
        </section>

        {/* 6. No-Show Policy */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            6. No-Show Policy
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            If a Customer fails to pick up the vehicle at the designated time
            and location without prior notice or cancellation, the booking will
            be considered a &quot;no-show.&quot; In the case of a no-show:
          </p>
          <ul className="space-y-3 text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Non-Refundable:</strong> The
                Customer will not be eligible for a refund.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>
                <strong className="text-primary">Vendor Compensation:</strong>{" "}
                The Vendor may be compensated as per the terms agreed upon at
                the time of booking.
              </span>
            </li>
          </ul>
        </section>

        {/* 7. Disputes and Refund Appeals */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            7. Disputes and Refund Appeals
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            If a Customer or Vendor disagrees with a refund or cancellation
            decision, they may submit an appeal within [X] days of the decision.
            Appeals will be reviewed in good faith, and Valorhire&apos;s final
            decision on the matter will be binding.
          </p>
        </section>

        {/* 8. Changes to This Policy */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            We may update this Cancellation and Refund Policy from time to time.
            Any changes will take effect upon posting to our Platform. Continued
            use of the Platform following any changes constitutes acceptance of
            the revised Policy.
          </p>
        </section>

        {/* 9. Contact Us */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[24px] font-[700] text-primary mb-4">
            9. Contact Us
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed mb-4">
            For questions or concerns about this Cancellation and Refund Policy,
            please contact us at:
          </p>
          <div className="text-[15px] md:text-[16px] text-[#646464] leading-relaxed">
            <p className="font-[600] text-primary">
              Valorhire Technologies Limited
            </p>
            <p>14c Esther Adeleke Street, Lekki Phase 1, Lagos, Nigeria</p>
            <p>[Contact Email]</p>
            <p>[Contact Phone Number]</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CancellationPolicyPageBody;
