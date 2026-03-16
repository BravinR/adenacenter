import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing use of Adena OSH Center services and this website.",
};

const LAST_UPDATED = "1 October 2025";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Terms of Service</h1>
            <p className="text-slate-500 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12 prose prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-li:text-slate-700 prose-li:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">

            <p>
              Please read these Terms of Service carefully before using the Adena OSH Center website or booking any of our services. By accessing our website or making an appointment, you agree to be bound by these terms.
            </p>

            <h2>1. About Adena OSH Center</h2>
            <p>
              Adena OSH Center is a DOSHS-recognised occupational health and safety medical center located at Acacia Centre, Nyerere Avenue, Mombasa, Kenya. We provide occupational health assessments, fitness certificates, wellness programs, and related clinical services to individuals and corporate clients.
            </p>

            <h2>2. Use of This Website</h2>
            <p>You may use this website for lawful purposes only. You agree not to:</p>
            <ul>
              <li>Use the site in any way that violates applicable Kenyan laws or regulations</li>
              <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
              <li>Attempt to gain unauthorised access to any part of the site or its underlying systems</li>
              <li>Introduce malicious code, viruses, or other harmful material</li>
              <li>Scrape, copy, or republish content from this site without our written permission</li>
            </ul>

            <h2>3. Appointment Bookings</h2>
            <p>When you submit an appointment request through our website:</p>
            <ul>
              <li>Your request is treated as a <strong>request</strong>, not a confirmed booking, until you receive a written confirmation from us</li>
              <li>We will contact you to confirm the appointment date, time, and any preparation required</li>
              <li>We reserve the right to decline or reschedule appointments where necessary</li>
              <li>If you need to cancel or reschedule, please notify us at least 24 hours in advance</li>
            </ul>

            <h2>4. Clinical Services</h2>
            <p>Our clinical services are provided by qualified health professionals. Please note:</p>
            <ul>
              <li>Occupational health assessments are conducted for occupational fitness purposes and do not replace your primary care physician for the management of personal health conditions</li>
              <li>We provide reports to employers only on fitness for duty, not on your full medical history, unless you have given explicit written consent</li>
              <li>Clinical decisions are made by our health professionals in accordance with applicable medical standards and DOSHS guidelines</li>
              <li>Results and recommendations are based on the information and test data available at the time of assessment</li>
            </ul>

            <h2>5. Fees and Payments</h2>
            <p>
              Fees for services are as communicated at the time of booking or as set out in any service agreement between us and your employer. Payment is due at the time of service unless a corporate credit arrangement is in place. All fees are in Kenyan Shillings (KES) unless otherwise agreed.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, and design — is the property of Adena OSH Center and is protected by Kenyan copyright law. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by Kenyan law, Adena OSH Center shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services. Our total liability in respect of any claim shall not exceed the amount you paid for the specific service giving rise to the claim.
            </p>
            <p>
              Nothing in these terms limits our liability for death or personal injury caused by our negligence, fraud, or any liability that cannot be excluded by law.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites for your convenience. We do not endorse or take responsibility for the content or privacy practices of any linked sites.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of Kenya. Any disputes arising from or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service at any time. The date of the most recent revision appears at the top of this page. Continued use of our website or services after any changes constitutes your acceptance of the updated terms.
            </p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
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
