import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import { getSiteSettings } from '@/lib/utils/site-settings';
import { Construction, ShoppingBag, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Shop | MLKS Delivery Solutions',
  description: 'MLKS Delivery shop — coming soon.',
};

export default async function ShopPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        <section className="min-h-[70vh] flex items-center bg-mlks-ice">
          <div className="container mx-auto px-4 py-20">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 bg-mlks-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Construction className="w-12 h-12 text-mlks-orange" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                  <ShoppingBag className="w-5 h-5 text-mlks-indigo" />
                  <span className="text-sm font-bold text-mlks-indigo uppercase tracking-wider">
                    Shop
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-mlks-ink mb-6">
                  On the Way
                </h1>
                <p className="text-lg text-mlks-slate leading-relaxed mb-8">
                  Our online shop is under construction. Products will be available here soon. Check back for updates, or contact us in the meantime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" size="lg">
                      Back to Home
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
