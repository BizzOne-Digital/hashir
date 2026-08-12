import connectDB from '@/lib/db/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import FAQ from '@/lib/models/FAQ';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { HelpCircle, MessageCircle } from 'lucide-react';

async function getFAQsData() {
  try {
    await connectDB();
    
    const [settings, faqs] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      FAQ.find({ published: true }).sort({ category: 1, displayOrder: 1 }).lean(),
    ]);

    const categories = [...new Set(faqs.map((faq: any) => faq.category))];

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      faqs: faqs ? JSON.parse(JSON.stringify(faqs)) : [],
      categories,
    };
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return { settings: null, faqs: [], categories: [] };
  }
}

export const metadata = {
  title: 'Frequently Asked Questions | MLKS Delivery Solutions',
  description: 'Find answers to common questions about our delivery services, pricing, coverage areas, and more.',
};

export default async function FAQsPage() {
  const { settings, faqs, categories } = await getFAQsData();

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
                  <HelpCircle className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    FAQs
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Questions?
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    We've Got Answers
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                  Find answers to <span className="text-mlks-orange font-semibold">common questions</span> about our delivery services.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Image Banner */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[21/9] bg-gradient-to-r from-mlks-indigo via-mlks-orange to-mlks-cyan flex items-center justify-center">
                  <div className="text-center text-white px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Got Questions? We've Got Answers</h2>
                    <p className="text-xl text-white/90">Browse our FAQs or contact us directly</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FAQs by Category */}
        <section className="section-padding bg-mlks-ice">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {categories.length === 0 ? (
                <FadeIn>
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-mlks-slate mx-auto mb-4" />
                    <p className="text-mlks-slate text-lg">No FAQs available at this time.</p>
                  </div>
                </FadeIn>
              ) : (
                categories.map((category: string, catIndex: number) => {
                  const categoryFaqs = faqs.filter((faq: any) => faq.category === category);
                  
                  return (
                    <FadeIn key={category} delay={catIndex * 0.1}>
                      <div className="mb-12 last:mb-0">
                        <h2 className="text-3xl font-bold text-mlks-ink mb-6 flex items-center gap-3">
                          <span className="w-2 h-8 bg-mlks-orange rounded-full"></span>
                          {category}
                        </h2>
                        <FAQAccordion faqs={categoryFaqs} />
                      </div>
                    </FadeIn>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Help Images */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FadeIn direction="up" delay={0}>
                <div className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo flex items-center justify-center">
                      <MessageCircle className="w-20 h-20 text-mlks-orange" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-mlks-ink mb-2">Contact Support</h3>
                  <p className="text-mlks-slate text-sm">We're here to help with any questions</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <div className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-mlks-orange to-mlks-orange-dark flex items-center justify-center">
                      <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-mlks-ink mb-2">Request Quote</h3>
                  <p className="text-mlks-slate text-sm">Get pricing for your delivery needs</p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <div className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-mlks-cyan to-mlks-indigo flex items-center justify-center">
                      <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-mlks-ink mb-2">Schedule Delivery</h3>
                  <p className="text-mlks-slate text-sm">Book your delivery online</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-mlks-orange to-mlks-orange-dark">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Still Have Questions?
                </h2>
                <p className="text-xl mb-10 text-white/90">
                  Our team is ready to help. Contact us today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg" className="bg-white text-mlks-orange hover:bg-mlks-ice">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/booking">
                    <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-mlks-orange">
                      Request a Delivery
                    </Button>
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
