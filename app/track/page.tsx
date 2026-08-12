import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import TrackDeliveryForm from '@/components/TrackDeliveryForm';
import FadeIn from '@/components/animations/FadeIn';
import { getSiteSettings } from '@/lib/utils/site-settings';
import { Package, Phone, Mail } from 'lucide-react';

export const metadata = {
  title: 'Track My Delivery | MLKS Delivery Solutions',
  description: 'Track your MLKS delivery in real time using your delivery number.',
};

export default async function TrackPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        <section className="py-20 bg-mlks-deep-indigo">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-20 h-20 bg-mlks-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-mlks-orange" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                  Track My Delivery
                </h1>
                <p className="text-lg text-white/80">
                  Enter your delivery number below to check the status of your delivery.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <TrackDeliveryForm />
            </FadeIn>
          </div>
        </section>

        <section className="py-12 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-xl font-bold text-mlks-ink mb-4">Need help with your delivery?</h2>
                <p className="text-mlks-slate text-sm mb-6">
                  Our team is here to assist you with any delivery questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {settings?.primaryPhone && (
                    <a
                      href={`tel:${settings.primaryPhone.replace(/\D/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-lg border-2 border-gray-200 text-mlks-ink hover:border-mlks-orange transition-colors"
                    >
                      <Phone className="w-5 h-5 text-mlks-orange" />
                      {settings.primaryPhone}
                    </a>
                  )}
                  <a
                    href="mailto:info@mlksdelivery.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-lg border-2 border-gray-200 text-mlks-ink hover:border-mlks-orange transition-colors"
                  >
                    <Mail className="w-5 h-5 text-mlks-orange" />
                    info@mlksdelivery.com
                  </a>
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
