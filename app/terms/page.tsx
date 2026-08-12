import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { FileText } from 'lucide-react';

async function getTermsData() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({}).lean();
    return { settings: settings ? JSON.parse(JSON.stringify(settings)) : null };
  } catch (error) {
    return { settings: null };
  }
}

export const metadata = {
  title: 'Terms of Service | MLKS Delivery Solutions',
  description: 'Terms of Service for MLKS Delivery Solutions - Review our service terms and conditions.',
};

export default async function TermsPage() {
  const { settings } = await getTermsData();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20">
        {/* Hero - Centered */}
        <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-mlks-deep-indigo via-mlks-indigo to-mlks-deep-indigo overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mlks-orange/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mlks-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${(i * 4.17) % 100}%`,
                    top: `${(i * 6.25) % 100}%`,
                    animation: `float ${5 + (i % 5) * 2}s ease-in-out infinite`,
                    animationDelay: `${(i % 5) * 1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <FileText className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Terms of Service
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Terms
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    of Service
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Review our <span className="text-mlks-orange font-semibold">service terms and conditions</span>.
                </p>
                <p className="text-white/70 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-4xl mx-auto prose prose-lg prose-indigo">
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing and using the services provided by MLKS Delivery Solutions ("Company," "we," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h2>Services Description</h2>
                <p>
                  MLKS Delivery Solutions provides delivery and transportation services for businesses, pharmacies, healthcare providers, and other organizations. Our services include but are not limited to:
                </p>
                <ul>
                  <li>Scheduled delivery services</li>
                  <li>Same-day and express delivery</li>
                  <li>Secure packaging services</li>
                  <li>Delivery management solutions</li>
                  <li>Reverse logistics</li>
                </ul>

                <h2>Service Requests and Booking</h2>
                <p>
                  When you submit a delivery request, you agree to provide accurate and complete information. Service availability, timing, and pricing are subject to confirmation by our team. We reserve the right to refuse service for any reason.
                </p>

                <h2>Pricing and Payment</h2>
                <ul>
                  <li>Delivery pricing is determined based on distance, package size, urgency, and other factors</li>
                  <li>Quotes provided are estimates and subject to final confirmation</li>
                  <li>Payment terms will be agreed upon for each delivery or service agreement</li>
                  <li>Recurring delivery services may have separate pricing structures</li>
                </ul>

                <h2>Customer Responsibilities</h2>
                <p>You agree to:</p>
                <ul>
                  <li>Provide accurate pickup and delivery information</li>
                  <li>Package items appropriately (or request our packaging service)</li>
                  <li>Declare any special handling requirements</li>
                  <li>Ensure items comply with applicable laws and regulations</li>
                  <li>Be available at scheduled pickup and delivery times</li>
                  <li>Provide accurate descriptions of items being delivered</li>
                </ul>

                <h2>Prohibited Items</h2>
                <p>We do not transport:</p>
                <ul>
                  <li>Illegal substances or contraband</li>
                  <li>Hazardous materials (unless specifically arranged and permitted)</li>
                  <li>Items that violate local, provincial, or federal regulations</li>
                  <li>Perishable items without proper arrangements</li>
                </ul>

                <h2>Liability and Insurance</h2>
                <p>
                  While we take every precaution to ensure safe delivery, MLKS Delivery Solutions' liability is limited as follows:
                </p>
                <ul>
                  <li>We are not liable for delays caused by circumstances beyond our control</li>
                  <li>Liability for lost or damaged items is subject to declared value and insurance coverage</li>
                  <li>Customers are encouraged to arrange additional insurance for high-value items</li>
                  <li>Claims must be reported within a specified time period</li>
                </ul>

                <h2>Cancellation and Rescheduling</h2>
                <p>
                  Cancellation and rescheduling policies vary by service type. Fees may apply for late cancellations or missed pickups. Please contact us as soon as possible if you need to make changes to your delivery.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  All content on our website, including text, graphics, logos, and images, is the property of MLKS Delivery Solutions and protected by copyright and trademark laws.
                </p>

                <h2>Website Use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use our website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our website</li>
                  <li>Transmit viruses or malicious code</li>
                </ul>

                <h2>Privacy</h2>
                <p>
                  Your use of our services is also governed by our Privacy Policy. Please review it to understand how we collect and use your information.
                </p>

                <h2>Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of modified terms.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These Terms of Service are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein.
                </p>

                <h2>Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms or our services shall be resolved through negotiation in good faith. If resolution cannot be reached, disputes shall be handled according to Ontario law.
                </p>

                <h2>Severability</h2>
                <p>
                  If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
                </p>

                <h2>Contact Information</h2>
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul>
                  <li>Email: {settings?.email || 'info@mlksdelivery.com'}</li>
                  <li>Phone: {settings?.primaryPhone || '+1 (519) 778-3390'}</li>
                  <li>Address: {settings?.address || 'Suite 817, 470 Sentinel Road, Toronto, Ontario, M3J 1V6, Canada'}</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
