import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Adena OSH Center collects, uses, and protects your personal and health information.",
};

const LAST_UPDATED = "1 October 2025";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
            <p className="text-slate-500 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12 prose prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-li:text-slate-700 prose-li:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">

            <p>
              Adena OSH Center (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy and confidentiality of your personal and health information. This Privacy Policy explains what data we collect, how we use it, and your rights under the Kenya Data Protection Act 2019 and applicable occupational health legislation.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following categories of information:</p>
            <ul>
              <li><strong>Identity data:</strong> full name, date of birth, national ID or passport number</li>
              <li><strong>Contact data:</strong> phone number, email address, employer/company name</li>
              <li><strong>Health data:</strong> medical history, examination findings, test results, fitness assessments, and any other clinical information disclosed during your consultation</li>
              <li><strong>Appointment data:</strong> preferred dates, services requested, notes</li>
              <li><strong>Technical data:</strong> anonymised analytics about how visitors use this website (page views, session duration) via privacy-respecting tools</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide occupational health assessments and produce clinical reports</li>
              <li>Issue DOSHS fitness certificates and official documentation</li>
              <li>Schedule and confirm appointments</li>
              <li>Communicate with you about your health care</li>
              <li>Comply with legal and regulatory obligations (including DOSHS reporting requirements)</li>
              <li>Improve our services through anonymised trend analysis</li>
            </ul>
            <p>We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>

            <h2>3. Legal Basis for Processing</h2>
            <p>We process your data on the following legal bases:</p>
            <ul>
              <li><strong>Consent:</strong> where you have given explicit consent for us to process your health data</li>
              <li><strong>Contractual necessity:</strong> to fulfil our obligations under any service agreement with you or your employer</li>
              <li><strong>Legal obligation:</strong> to comply with DOSHS regulations and other applicable Kenyan law</li>
              <li><strong>Legitimate interests:</strong> for operational purposes that do not override your fundamental rights</li>
            </ul>

            <h2>4. Health Data (Special Category Data)</h2>
            <p>
              Health data receives the highest level of protection under the Kenya Data Protection Act. We treat all clinical information as strictly confidential. Access is limited to the health professionals directly involved in your care and administrative staff on a need-to-know basis. We will only disclose health data to your employer where:
            </p>
            <ul>
              <li>You have given explicit written consent; or</li>
              <li>We are required to do so by law (e.g. notifiable disease reporting)</li>
            </ul>
            <p>
              Importantly, the reports we provide to employers describe <em>fitness for duty</em> — they do not disclose your diagnosis or full medical history without your consent.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain clinical records for a minimum of seven (7) years from the date of the last consultation, in line with Kenyan medical records legislation. Appointment and contact data is retained for three (3) years from last interaction. You may request deletion of non-clinical data at any time, subject to our legal retention obligations.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your information against unauthorised access, accidental loss, destruction, or disclosure. Our digital systems use encryption, access controls, and regular security reviews.
            </p>

            <h2>7. Your Rights</h2>
            <p>Under the Kenya Data Protection Act 2019, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> request a copy of the personal data we hold about you</li>
              <li><strong>Rectification:</strong> request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> request deletion of your data, subject to legal retention requirements</li>
              <li><strong>Portability:</strong> receive your data in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> object to processing based on legitimate interests</li>
              <li><strong>Withdraw consent:</strong> at any time where processing is based on consent</li>
            </ul>
            <p>
              To exercise any of these rights, contact our Data Protection Officer at{" "}
              <a href="mailto:info@adenaoshcentre.com">info@adenaoshcentre.com</a>.
            </p>

            <h2>8. Cookies and Website Analytics</h2>
            <p>
              Our website uses only strictly necessary technical cookies. We do not use advertising cookies or cross-site tracking. Any analytics we collect are anonymised and aggregated — they cannot be used to identify you personally.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date of the most recent revision appears at the top of this page. Continued use of our services after an update constitutes acceptance of the revised policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@adenaoshcentre.com">info@adenaoshcentre.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+254708775657">+254 708 775 657</a></li>
              <li><strong>Address:</strong> Acacia Centre, Nyerere Avenue, Mombasa, Kenya</li>
            </ul>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
