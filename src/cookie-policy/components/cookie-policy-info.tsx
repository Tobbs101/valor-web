import React from "react";
import Container from "@/components/layout/container";

const CookiePolicyInfo = () => {
  return (
    <Container className="py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* What Are Cookies? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Are Cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small files that are websites store on your device
              when you visit them. They are widely used to make websites work,
              or work more efficiently, as well as provide information to the
              owners of the site.
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Types of Cookies We Use
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Strictly Necessary Cookies
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Enable you to use the site effectively, such as logging
                      in, session security, and ensuring the site functions
                      properly. These cannot be disabled.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Performance & Analytics Cookies
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Help us understand how users interact with our site by
                      collecting anonymous information about how you use the
                      site, including frequency.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Functionality Cookies
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Allow us to remember your preferences and settings to
                      provide a more personalised experience.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Targeting & Marketing Cookies
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Used for advertising purposes, e.g., if we cite "This site
                      Partnership Platform supports students with the 11+
                      exams." These help ensure targeted content.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cookies in Use */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cookies in Use
            </h2>
            <p className="text-gray-700 mb-4">
              Here are examples of cookies we exercise on our site:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Source
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Firebase
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Platform functionality and user authentication
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Google
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Analytics (anonymised and user analytics)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Survey Platform
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Survey platform and data processing
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      Educational Games
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Learning and educational features
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How We Obtain Your Consent */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Obtain Your Consent
            </h2>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="list-disc">
                When you first visit our website, a cookie consent banner asking
                you to consent to cookies
              </li>
              <li className="list-disc">Consent of some cookies</li>
              <li className="list-disc">Customise your preferences</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We may also use a preference centre for functional or analytical
              sites and also browser cookies for relevant advertising.
            </p>
          </section>

          {/* Managing Your Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Managing Your Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              You can manage or opt-out of cookies at any time through browser
              settings. This following information found in your browser cookies
              for various browsers:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="list-disc">
                Chrome: Settings {">"} Privacy and Security {">"} Site Settings{" "}
                {">"} Cookies
              </li>
              <li className="list-disc">
                Firefox: Preferences {">"} Privacy &amp; Security
              </li>
              <li className="list-disc">Safari: Preferences {">"} Privacy</li>
              <li className="list-disc">
                Edge: Settings {">"} Cookies and site permissions
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              Note that disabling certain cookies may affect your website
              functionality.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that place cookies on your device.
              These include analytics tools, advertising platforms. We only
              include such services from well-known service providers for
              measuring site performance.
            </p>

            <div className="space-y-2">
              <p className="text-gray-700 font-medium">Google Privacy Policy</p>
              <p className="text-gray-700 font-medium">
                Firebase Privacy Policy
              </p>
              <p className="text-gray-700 font-medium">Third Party Policy</p>
            </div>
          </section>

          {/* Changes to This Cookie Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Cookie Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy from time to time to reflect changes in
              our use of cookies or legal requirements. When we make significant
              changes, we will post an updated version here.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700">
              If you have questions about our use of cookies, contact us at{" "}
              <a
                href="mailto:partnerships@limitbreakers.co.uk"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                partnerships@limitbreakers.co.uk
              </a>
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default CookiePolicyInfo;
