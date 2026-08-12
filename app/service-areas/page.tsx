import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import { serviceAreas } from '@/lib/data/industries';
import { getSiteSettings } from '@/lib/utils/site-settings';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Service Areas | MLKS Delivery Solutions',
  description:
    'MLKS Delivery Solutions serves Kitchener, Waterloo, Cambridge, and surrounding areas in Ontario.',
};

export default async function ServiceAreasPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        <section className="py-20 bg-mlks-deep-indigo">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                <MapPin className="w-12 h-12 text-mlks-orange mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                  Service Areas
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  We proudly serve businesses across the Kitchener-Waterloo region and surrounding communities with reliable delivery coverage.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-mlks-ink text-center mb-10">
                  Cities We Cover
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {serviceAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center gap-3 p-4 bg-mlks-ice rounded-lg"
                    >
                      <MapPin className="w-5 h-5 text-mlks-orange flex-shrink-0" />
                      <span className="text-mlks-ink font-medium text-sm">{area}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-mlks-ice rounded-2xl text-center">
                  <h3 className="text-xl font-bold text-mlks-ink mb-3">
                    Need delivery outside these areas?
                  </h3>
                  <p className="text-mlks-slate mb-6">
                    Contact us to discuss extended coverage options for your business.
                  </p>
                  <Link href="/become-a-partner">
                    <Button variant="primary" size="lg">
                      Request a Meeting
                      <ArrowRight className="w-5 h-5 ml-2" />
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
