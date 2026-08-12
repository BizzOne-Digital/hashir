import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import { Shield } from 'lucide-react';

async function getPrivacyData() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({}).lean();
    return { settings: settings ? JSON.parse(JSON.stringify(settings)) : null };
  } catch (error) {
    return { settings: null };
  }
}

export const metadata = {
  title: 'Privacy Policy | MLKS Delivery Solutions',
  description: 'Privacy Policy for MLKS Delivery Solutions - Learn how we protect and handle your information.',
};

export default async function PrivacyPage() {
  const { settings } = await getPrivacyData();

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
                  <Shield className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Privacy Policy
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Your Privacy
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    Matters
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Learn how we <span className="text-mlks-orange font-semibold">protect and handle</span> your information.
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
                <h2>Introduction</h2>
                <p>
                  MLKS Delivery Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our delivery services and website.
                </p>

                <h2>Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>We may collect personal information that you provide to us, including:</p>
                <ul>
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Business name and details</li>
                  <li>Delivery pickup and drop-off information</li>
                  <li>Package descriptions</li>
                  <li>Payment information</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you access our website, we may automatically collect:</p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and fulfill delivery requests</li>
                  <li>Communicate with you about your deliveries</li>
                  <li>Improve our services and website</li>
                  <li>Send you updates and promotional materials (with your consent)</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and maintain security</li>
                </ul>

                <h2>Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                  <li>Service providers who assist in our operations</li>
                  <li>Business partners involved in your delivery</li>
                  <li>Legal authorities when required by law</li>
                  <li>Third parties with your consent</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2>Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain data processing</li>
                </ul>

                <h2>Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
                </p>

                <h2>Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
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
