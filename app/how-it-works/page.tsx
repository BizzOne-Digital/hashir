import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import TrackDeliveryForm from '@/components/TrackDeliveryForm';
import { getSiteSettings } from '@/lib/utils/site-settings';
import {
  ClipboardList,
  Truck,
  ShieldCheck,
  Bell,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'How It Works | MLKS Delivery Solutions',
  description:
    'Learn how MLKS Delivery Solutions works — from order placement to secure delivery and confirmation.',
};

const generalSteps = [
  {
    icon: ClipboardList,
    title: 'Submit Your Request',
    description:
      'Contact us or fill out our partner inquiry form with your delivery needs, locations, and schedule preferences.',
  },
  {
    icon: Truck,
    title: 'We Pick Up',
    description:
      'Our professional drivers collect your packages during your scheduled pickup window with verified handoff.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Delivery',
    description:
      'Items are transported with care — including temperature-controlled and time-sensitive handling when required.',
  },
  {
    icon: Bell,
    title: 'Confirmation',
    description:
      'You and your recipient receive delivery confirmation with digital proof of delivery.',
  },
];

const pharmacySteps = [
  {
    step: 1,
    title: 'Pharmacy prepares the order',
    description:
      'Your pharmacy prepares the patient\'s prescription and enters order details in our system.',
  },
  {
    step: 2,
    title: 'We pick it up',
    description: 'Our driver arrives during your scheduled pickup window.',
  },
  {
    step: 3,
    title: 'Secure delivery',
    description: 'We deliver to the patient with discreet, professional handling.',
  },
  {
    step: 4,
    title: 'Patient receives confirmation',
    description: 'Both pharmacy and patient receive confirmation with proof of delivery.',
  },
];

export default async function HowItWorksPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        <section className="py-20 bg-mlks-deep-indigo">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                  How It Works
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  A straightforward process designed to save your team time and give your customers reliable delivery coverage.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-3xl font-bold text-mlks-ink text-center mb-12">
                The MLKS Delivery Process
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {generalSteps.map((step, index) => (
                <FadeIn key={step.title} direction="up" delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-mlks-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-mlks-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-mlks-ink mb-2">{step.title}</h3>
                    <p className="text-mlks-slate text-sm leading-relaxed">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-mlks-ice">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="inline-block mb-4 px-4 py-2 bg-mlks-indigo/10 rounded-full text-mlks-indigo font-bold text-xs uppercase tracking-wider">
                  For Pharmacies
                </span>
                <h2 className="text-3xl font-bold text-mlks-ink mb-4">
                  Prescription Delivery Flow
                </h2>
                <p className="text-mlks-slate max-w-2xl mx-auto">
                  See how prescription deliveries work from your pharmacy counter to your patient&apos;s door.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {pharmacySteps.map((step, index) => (
                <FadeIn key={step.step} direction="up" delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-10 h-10 bg-mlks-indigo text-white rounded-full flex items-center justify-center font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-mlks-ink mb-2">{step.title}</h3>
                    <p className="text-mlks-slate text-sm">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/industries/pharmacy">
                <Button variant="secondary" size="lg">
                  Learn More About Pharmacy Delivery
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-mlks-ink mb-4">Track Your Delivery</h2>
                <p className="text-mlks-slate">
                  Enter your delivery number below to check the status of your delivery.
                </p>
              </div>
              <TrackDeliveryForm />
              <div className="text-center mt-8">
                <Link
                  href="/track"
                  className="text-mlks-orange font-bold hover:underline inline-flex items-center gap-2"
                >
                  Go to full tracking page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-mlks-deep-indigo">
          <div className="container mx-auto px-4 text-center">
            <FadeIn>
              <MapPin className="w-10 h-10 text-mlks-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-white/70 mb-6">
                Request a meeting to discuss rates tailored to your business.
              </p>
              <Link href="/become-a-partner">
                <Button variant="primary" size="lg">
                  Become a Partner
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
