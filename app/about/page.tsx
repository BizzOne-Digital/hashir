import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Shield, Clock, Users, Award, Package, Heart, CheckCircle, Target, Eye } from 'lucide-react';

async function getAboutData() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({}).lean();
    return { settings: settings ? JSON.parse(JSON.stringify(settings)) : null };
  } catch (error) {
    return { settings: null };
  }
}

export const metadata = {
  title: 'About Us | MLKS Delivery Solutions',
  description: 'Learn about MLKS Delivery Solutions - your trusted partner for pharmacy, healthcare, and business delivery services across Ontario.',
};

export default async function AboutPage() {
  const { settings } = await getAboutData();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-[#0a1628] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/images/about-hero.jpg" 
              alt="MLKS Delivery Team" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]/40" />
            
            <svg className="absolute bottom-0 left-0 w-full h-full opacity-60" viewBox="0 0 1920 1080">
              <path
                d="M 200 700 Q 400 500, 600 600 T 1000 550 Q 1200 500, 1400 580"
                fill="none"
                stroke="#FF7A1A"
                strokeWidth="6"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <FadeIn>
              <div className="max-w-2xl">
                <div className="inline-block mb-6 px-4 py-2 border border-mlks-orange/30 rounded">
                  <span className="text-mlks-orange font-bold text-xs uppercase tracking-widest">
                    ABOUT MLKS
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Care in Every Package.
                  <br />
                  <span className="text-mlks-orange">Purpose in Every Delivery.</span>
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  Professional delivery solutions built for pharmacies, healthcare providers, and businesses across Ontario.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 1: Delivery Partner */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <FadeIn direction="left">
                  <div className="inline-block mb-4 px-4 py-2 bg-mlks-orange/10 rounded-full">
                    <span className="text-mlks-orange font-bold text-xs uppercase tracking-wider">
                      Our Approach
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-6 leading-tight">
                    A Delivery Partner
                    <br />
                    <span className="text-mlks-orange">Built Around Your Needs</span>
                  </h2>
                  <p className="text-mlks-slate text-lg leading-relaxed mb-6">
                    MLKS Delivery Solutions was founded with one clear goal: to provide reliable, professional delivery services for businesses that depend on secure and timely transportation.
                  </p>
                  <p className="text-mlks-slate text-lg leading-relaxed">
                    From busy delivery centers to community businesses and healthcare facilities, we understand that every delivery matters to your operations and your customers.
                  </p>
                </FadeIn>
              </div>

              <FadeIn direction="right" delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden shadow-xl h-[280px]">
                    <img 
                      src="/images/home-4.png" 
                      alt="MLKS Delivery Team" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-xl h-[280px] mt-8">
                    <img 
                      src="/images/home-5.png" 
                      alt="Professional Service" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 2: Two-Column Values */}
        <section className="py-20 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <FadeIn direction="left">
                <div className="bg-[#0a1628] rounded-xl p-10 relative overflow-hidden h-full">
                  <svg className="absolute bottom-0 right-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                    <path
                      d="M 400 300 Q 300 200, 200 250 T 50 200"
                      fill="none"
                      stroke="#FF7A1A"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                  </svg>

                  <div className="relative z-10">
                    <Target className="w-12 h-12 text-mlks-orange mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Deliver with care.
                      <br />
                      Respond with purpose.
                      <br />
                      <span className="text-mlks-orange">Move business forward.</span>
                    </h3>
                    <p className="text-white/80 text-base leading-relaxed">
                      Every package we handle represents someone's health, business, or livelihood. That responsibility drives everything we do.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div className="bg-white rounded-xl p-10 shadow-lg border-2 border-mlks-orange/10 h-full">
                  <Eye className="w-12 h-12 text-mlks-orange mb-6" />
                  <h3 className="text-3xl font-bold text-mlks-ink mb-4">
                    To be the trusted delivery
                    <br />
                    partner for care and
                    <br />
                    <span className="text-mlks-orange">commerce.</span>
                  </h3>
                  <p className="text-mlks-slate text-base leading-relaxed">
                    We envision a future where businesses have complete confidence in their delivery partner—knowing their items arrive safely, on time, and with professional care.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 3: What Guides Every Delivery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-2 bg-mlks-orange/10 rounded-full">
                  <span className="text-mlks-orange font-bold text-xs uppercase tracking-wider">
                    Our Values
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink">
                  What Guides Every Delivery
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: 'CARE AND RESPONSIBILITY',
                  description: 'Professional handling with every delivery we make.',
                },
                {
                  icon: Shield,
                  title: 'TRUST AND RELIABILITY',
                  description: 'Consistent service you can count on day after day.',
                },
                {
                  icon: Users,
                  title: 'PARTNERSHIP',
                  description: 'Building relationships through responsive communication.',
                },
                {
                  icon: Target,
                  title: 'RESULTS-DRIVEN SERVICE',
                  description: 'Focused on delivering what matters to your business.',
                },
              ].map((value, index) => (
                <FadeIn key={index} direction="up" delay={index * 0.1}>
                  <div className="text-center p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-mlks-indigo/10 rounded-lg mb-4">
                      <value.icon className="w-8 h-8 text-mlks-indigo" />
                    </div>
                    <h3 className="text-mlks-ink font-bold text-sm uppercase tracking-wide mb-3">
                      {value.title}
                    </h3>
                    <p className="text-mlks-slate text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Supporting Your Service */}
        <section className="py-20 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <FadeIn direction="left">
                <div className="rounded-lg overflow-hidden shadow-2xl h-[400px]">
                  <img 
                    src="/images/home-2.png" 
                    alt="Healthcare and Pharmacy Delivery" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>

              <div>
                <FadeIn direction="right">
                  <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-6 leading-tight">
                    Supporting Your Service,
                    <br />
                    <span className="text-mlks-orange">Care-Focused Deliveries.</span>
                  </h2>
                  <p className="text-mlks-slate text-lg leading-relaxed mb-8">
                    We specialize in pharmacy and healthcare-related deliveries, understanding the importance of careful handling, time coordination, and professional service.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-mlks-indigo rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-mlks-ink font-bold text-sm">PHARMACY</div>
                        <div className="text-mlks-slate text-xs">FOCUSED</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-12 h-12 bg-mlks-orange rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-mlks-ink font-bold text-sm">HEALTHCARE</div>
                        <div className="text-mlks-slate text-xs">READY</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Proven Track Record */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <FadeIn direction="left">
                  <div className="inline-block mb-4 px-4 py-2 bg-mlks-orange/10 rounded-full">
                    <span className="text-mlks-orange font-bold text-xs uppercase tracking-wider">
                      Track Record
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-6 leading-tight">
                    Proven Service for
                    <br />
                    <span className="text-mlks-orange">Mission-Critical Business.</span>
                  </h2>
                  <p className="text-mlks-slate text-lg leading-relaxed mb-8">
                    Our clients depend on us for deliveries that support their daily operations—from pharmacies serving their communities to businesses coordinating time-sensitive logistics.
                  </p>

                  <div className="space-y-4">
                    {[
                      'Reliable delivery coordination',
                      'Secure handling procedures',
                      'Responsive communication',
                      'Professional service standards',
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-mlks-orange flex-shrink-0" />
                        <p className="text-mlks-slate text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <FadeIn direction="right" delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { img: '/images/home-1.png', alt: 'Professional Team' },
                    { img: '/images/home-3.png', alt: 'Delivery Coordination' },
                    { img: '/images/home-4.png', alt: 'Business Service', span: true },
                  ].map((item, num) => (
                    <div
                      key={num}
                      className={`rounded-lg overflow-hidden shadow-xl h-[200px] ${
                        item.span ? 'col-span-2' : ''
                      }`}
                    >
                      <img 
                        src={item.img} 
                        alt={item.alt} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 overflow-hidden bg-[#0a1628]">
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-40" viewBox="0 0 1920 400">
            <path
              d="M 0 300 Q 400 200, 800 250 T 1600 200 Q 1800 180, 1920 200"
              fill="none"
              stroke="#FF7A1A"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <g transform="translate(200, 280)">
              <circle cx="0" cy="0" r="15" fill="#FF7A1A" className="animate-pulse" />
            </g>
          </svg>

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Let's Plan Your
                  <br />
                  <span className="text-mlks-orange">Next Delivery.</span>
                </h2>
                <p className="text-xl mb-10 text-white/90">
                  Experience professional, reliable delivery service for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/booking">
                    <button className="bg-mlks-orange hover:bg-mlks-orange-dark text-white font-bold px-8 py-4 rounded uppercase tracking-wide transition-colors">
                      REQUEST A DELIVERY
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded uppercase tracking-wide bg-transparent transition-colors">
                      CONTACT OUR TEAM
                    </button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
