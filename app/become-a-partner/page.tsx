import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import PartnerInquiryForm from '@/components/PartnerInquiryForm';
import FadeIn from '@/components/animations/FadeIn';
import { getSiteSettings } from '@/lib/utils/site-settings';

export const metadata = {
  title: 'Become a Partner | MLKS Delivery Solutions',
  description:
    'Request a meeting to discuss custom delivery rates for your business. MLKS serves pharmacies, law firms, and businesses across Kitchener-Waterloo.',
};

interface PageProps {
  searchParams: Promise<{ industry?: string }>;
}

export default async function BecomeAPartnerPage({ searchParams }: PageProps) {
  const settings = await getSiteSettings();
  const { industry } = await searchParams;

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        <section className="py-16 bg-mlks-deep-indigo">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <span className="inline-block mb-4 px-4 py-2 border border-mlks-orange/30 rounded text-mlks-orange font-bold text-xs uppercase tracking-widest">
                  Partner With Us
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                  Request a Meeting for Rates
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  Every business is different. Tell us about your delivery needs and we will reach out to schedule a meeting and provide a custom quote.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <FadeIn>
                <PartnerInquiryForm defaultIndustry={industry} />
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
