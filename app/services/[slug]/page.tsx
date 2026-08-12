import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/db/mongodb';
import Service from '@/lib/models/Service';
import SiteSettings from '@/lib/models/SiteSettings';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import { CheckCircle, ArrowRight } from 'lucide-react';

async function getServiceData(slug: string) {
  try {
    await connectDB();
    
    const [settings, service] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      Service.findOne({ slug, published: true }).lean(),
    ]);

    if (!service) {
      return null;
    }

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      service: JSON.parse(JSON.stringify(service)),
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getServiceData(slug);
  
  if (!data) {
    return {
      title: 'Service Not Found',
    };
  }

  const { service } = data;

  return {
    title: service.metaTitle || `${service.title} | MLKS Delivery Solutions`,
    description: service.metaDescription || service.shortDescription,
    openGraph: {
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.shortDescription,
      images: service.ogImage ? [service.ogImage] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getServiceData(slug);

  if (!data) {
    notFound();
  }

  const { settings, service } = data;

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-mlks-indigo to-mlks-deep-indigo overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-mlks-orange rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                {service.heroEyebrow && (
                  <span className="text-mlks-orange font-semibold text-sm uppercase tracking-wider">
                    {service.heroEyebrow}
                  </span>
                )}
                <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                  {service.heroTitle || service.title}
                </h1>
                {service.heroDescription && (
                  <p className="text-xl text-white/90 leading-relaxed">
                    {service.heroDescription}
                  </p>
                )}
                {service.status === 'coming_soon' && (
                  <div className="inline-block mt-6 bg-mlks-cyan text-white text-sm font-bold px-6 py-3 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Overview */}
        {service.overview && (
          <section className="section-padding bg-white">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-6">Overview</h2>
                  <p className="text-lg text-mlks-slate leading-relaxed whitespace-pre-line">
                    {service.overview}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Suitable Customers */}
        {service.suitableCustomers && (
          <section className="py-16 bg-mlks-ice">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-6">Who This Service Is For</h2>
                  <p className="text-lg text-mlks-slate leading-relaxed">
                    {service.suitableCustomers}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Benefits */}
        {service.benefits && (
          <section className="section-padding bg-white">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-8">Key Benefits</h2>
                  <div className="grid gap-4">
                    {service.benefits.split(',').map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-mlks-ice rounded-xl">
                        <CheckCircle className="w-6 h-6 text-mlks-success flex-shrink-0 mt-1" />
                        <span className="text-lg text-mlks-ink">{benefit.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Process */}
        {service.process && (
          <section className="section-padding bg-mlks-ice">
            <div className="container mx-auto px-4">
              <FadeIn>
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-mlks-ink mb-8">How It Works</h2>
                  <div className="space-y-6">
                    {service.process.split('\n').map((step: string, index: number) => {
                      if (!step.trim()) return null;
                      return (
                        <div key={index} className="flex gap-6 items-start">
                          <div className="flex-shrink-0 w-12 h-12 bg-mlks-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-2">
                            <p className="text-lg text-mlks-ink">{step.replace(/^\d+\.\s*/, '')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-mlks-orange to-mlks-orange-dark">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {service.status === 'coming_soon' 
                    ? 'Interested in This Service?'
                    : 'Ready to Get Started?'}
                </h2>
                <p className="text-xl mb-10 text-white/90">
                  {service.status === 'coming_soon'
                    ? 'Contact us to learn more or express your interest in this upcoming service.'
                    : 'Request a delivery and experience our professional service.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={service.status === 'coming_soon' ? '/contact' : '/booking'}>
                    <Button variant="secondary" size="lg" className="bg-white text-mlks-orange hover:bg-mlks-ice">
                      {service.status === 'coming_soon' ? 'Contact Us' : 'Request This Service'}
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-mlks-orange">
                      View All Services
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
