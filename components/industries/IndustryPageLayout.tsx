import Link from 'next/link';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import { IndustryConfig } from '@/lib/data/industries';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface IndustryPageLayoutProps {
  industry: IndustryConfig;
  settings: any;
}

export default function IndustryPageLayout({ industry, settings }: IndustryPageLayoutProps) {
  const Icon = industry.icon;
  const isComingSoon = industry.status === 'coming_soon';

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center bg-mlks-deep-indigo overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-mlks-orange rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-mlks-cyan rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <FadeIn>
              <div className="max-w-3xl">
                {isComingSoon && (
                  <span className="inline-block mb-4 px-4 py-2 bg-mlks-orange/20 border border-mlks-orange/40 rounded-full text-mlks-orange font-bold text-xs uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-mlks-orange rounded-xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-mlks-cyan font-bold text-sm uppercase tracking-wider">
                    {industry.name}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                  {industry.tagline}
                </h1>
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  {industry.description}
                </p>
                <Link href={industry.ctaHref}>
                  <Button variant="primary" size="lg">
                    {industry.ctaLabel}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* How It Works */}
        {industry.howItWorks && industry.howItWorks.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-4">
                    How It Works
                  </h2>
                  <p className="text-mlks-slate text-lg max-w-2xl mx-auto">
                    A simple process from pickup to confirmed delivery
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {industry.howItWorks.map((step, index) => (
                  <FadeIn key={step.step} direction="up" delay={index * 0.1}>
                    <div className="relative">
                      <div className="w-12 h-12 bg-mlks-orange text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-mlks-ink mb-2">{step.title}</h3>
                      <p className="text-mlks-slate text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Patient Features (Pharmacy) */}
        {industry.patientFeatures && industry.patientFeatures.length > 0 && (
          <section className="py-20 bg-mlks-ice">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-4">
                    For Patients
                  </h2>
                  <p className="text-mlks-slate text-lg">
                    Convenient, secure delivery options for your prescriptions
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {industry.patientFeatures.map((feature, index) => (
                  <FadeIn key={feature.title} direction="up" delay={index * 0.05}>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                      <CheckCircle className="w-5 h-5 text-mlks-orange flex-shrink-0 mt-0.5" />
                      <span className="text-mlks-ink text-sm font-medium">{feature.title}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Business Features */}
        {industry.businessFeatures && industry.businessFeatures.length > 0 && (
          <section className={`py-20 ${industry.patientFeatures ? 'bg-white' : 'bg-mlks-ice'}`}>
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-4">
                    {industry.slug === 'pharmacy' ? 'For Pharmacies' : `For ${industry.name}`}
                  </h2>
                  <p className="text-mlks-slate text-lg">
                    {industry.slug === 'pharmacy'
                      ? 'Our service saves your pharmacy staff time and gives them reliable delivery coverage.'
                      : 'Professional delivery solutions built for your business needs.'}
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {industry.businessFeatures.map((feature, index) => (
                  <FadeIn key={feature.title} direction="up" delay={index * 0.05}>
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                      <CheckCircle className="w-5 h-5 text-mlks-indigo flex-shrink-0 mt-0.5" />
                      <span className="text-mlks-ink text-sm font-medium">{feature.title}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services */}
        {industry.services && industry.services.length > 0 && (
          <section className="py-20 bg-mlks-deep-indigo">
            <div className="container mx-auto px-4 text-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Services</h2>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-10">
                  {industry.services.map((service) => (
                    <span
                      key={service}
                      className="px-5 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <Link href={industry.ctaHref}>
                  <Button variant="primary" size="lg">
                    {industry.ctaLabel}
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </section>
        )}

        {/* CTA for coming soon industries without services section */}
        {isComingSoon && (
          <section className="py-20 bg-mlks-deep-indigo">
            <div className="container mx-auto px-4 text-center">
              <FadeIn>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Be the first to know when we launch
                </h2>
                <p className="text-white/70 mb-8 max-w-xl mx-auto">
                  Join our waitlist and we will reach out when {industry.name.toLowerCase()} delivery services become available.
                </p>
                <Link href={industry.ctaHref}>
                  <Button variant="primary" size="lg">
                    {industry.ctaLabel}
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </section>
        )}
      </main>

      <Footer settings={settings} />
    </>
  );
}
