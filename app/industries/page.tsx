import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import { industries } from '@/lib/data/industries';
import { getSiteSettings } from '@/lib/utils/site-settings';
import { ArrowRight, Construction } from 'lucide-react';

export const metadata = {
  title: 'Industries We Serve | MLKS Delivery Solutions',
  description:
    'Delivery solutions for pharmacies, law firms, food businesses, and more across Kitchener-Waterloo and surrounding areas.',
};

export default async function IndustriesPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        <section className="py-20 bg-mlks-deep-indigo">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block mb-4 px-4 py-2 border border-mlks-orange/30 rounded text-mlks-orange font-bold text-xs uppercase tracking-widest">
                  Industries
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                  Built for Your Business
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  MLKS provides delivery services for businesses that need reliable, professional transportation — from pharmacies and law firms to food and parcel delivery.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <FadeIn key={industry.slug} direction="up" delay={index * 0.1}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group block p-8 bg-mlks-ice rounded-2xl border-2 border-transparent hover:border-mlks-orange/30 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-mlks-indigo rounded-xl flex items-center justify-center group-hover:bg-mlks-orange transition-colors">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        {industry.status === 'coming_soon' && (
                          <span className="px-3 py-1 bg-mlks-orange/10 text-mlks-orange text-xs font-bold rounded-full uppercase">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-mlks-ink mb-2 group-hover:text-mlks-orange transition-colors">
                        {industry.name}
                      </h2>
                      <p className="text-mlks-slate text-sm leading-relaxed mb-4">
                        {industry.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-mlks-orange font-bold text-sm group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-mlks-ice">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <Construction className="w-12 h-12 text-mlks-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mlks-ink mb-4">
                Don&apos;t see your industry?
              </h2>
              <p className="text-mlks-slate mb-6 max-w-xl mx-auto">
                We work with all types of businesses that need deliveries. Request a meeting and we will create a custom rate plan for you.
              </p>
              <Link href="/become-a-partner">
                <Button variant="primary" size="lg">
                  Request a Meeting for Rates
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
