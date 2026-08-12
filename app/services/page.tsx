import Link from 'next/link';
import connectDB from '@/lib/db/mongodb';
import Service from '@/lib/models/Service';
import SiteSettings from '@/lib/models/SiteSettings';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import { Package, ArrowRight } from 'lucide-react';

async function getServicesData() {
  try {
    await connectDB();
    
    const [settings, services] = await Promise.all([
      SiteSettings.findOne({}).lean(),
      Service.find({ published: true })
        .sort({ displayOrder: 1 })
        .lean(),
    ]);

    return {
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      services: services ? JSON.parse(JSON.stringify(services)) : [],
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return { settings: null, services: [] };
  }
}

export const metadata = {
  title: 'Our Services | MLKS Delivery Solutions',
  description: 'Comprehensive delivery services for pharmacies, healthcare providers, and businesses across Ontario.',
};

export default async function ServicesPage() {
  const { settings, services } = await getServicesData();

  // Fallback services if database is not connected
  const fallbackServices = [
    {
      _id: '1',
      title: 'Pharmacy Delivery',
      slug: 'pharmacy-delivery',
      shortDescription: 'Specialized pharmaceutical delivery services with secure handling and professional care for pharmacies and healthcare providers.',
      status: 'active',
      published: true,
    },
    {
      _id: '2',
      title: 'Business Delivery',
      slug: 'business-delivery',
      shortDescription: 'Professional business-to-business delivery services for companies requiring reliable and timely transportation.',
      status: 'active',
      published: true,
    },
    {
      _id: '3',
      title: 'Express Courier',
      slug: 'express-courier',
      shortDescription: 'Fast, time-sensitive delivery services for urgent packages requiring immediate attention and quick turnaround.',
      status: 'active',
      published: true,
    },
    {
      _id: '4',
      title: 'Scheduled Deliveries',
      slug: 'scheduled-deliveries',
      shortDescription: 'Plan ahead with scheduled delivery services that align with your business operations and regular delivery needs.',
      status: 'active',
      published: true,
    },
    {
      _id: '5',
      title: 'Healthcare Logistics',
      slug: 'healthcare-logistics',
      shortDescription: 'Specialized logistics solutions for healthcare providers, medical offices, and related businesses requiring careful coordination.',
      status: 'active',
      published: true,
    },
    {
      _id: '6',
      title: 'Temperature Controlled',
      slug: 'temperature-controlled',
      shortDescription: 'Specialized handling for temperature-sensitive items requiring controlled environment during transportation.',
      status: 'coming_soon',
      published: true,
    },
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const statusBadges: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
    coming_soon: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Coming Soon' },
    temporarily_unavailable: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Temporarily Unavailable' },
  };

  return (
    <>
      <Header settings={settings} />

      <main className="pt-20 overflow-hidden">
        {/* Hero Section - Centered */}
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
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Package className="w-5 h-5 text-mlks-orange animate-pulse" />
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">
                    Our Services
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Delivery Solutions
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    Built For You
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  From <span className="text-mlks-orange font-semibold">pharmacy deliveries</span> to business logistics, we provide professional transportation services designed around your needs.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/booking">
                    <Button variant="primary" size="lg" className="shadow-2xl">
                      Request a Delivery
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-mlks-indigo backdrop-blur-sm">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Services Grid - Creative Layout */}
        <section className="section-padding bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'radial-gradient(circle, #30359B 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} 
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-6 py-2 bg-mlks-orange/10 rounded-full">
                  <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">What We Offer</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-mlks-ink mb-6">
                  Comprehensive
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mlks-indigo to-mlks-orange">Delivery Services</span>
                </h2>
              </div>
            </FadeIn>

            {displayServices.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-mlks-slate mx-auto mb-4" />
                <p className="text-mlks-slate text-lg">No services available at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayServices.map((service: any, index: number) => {
                  const statusInfo = statusBadges[service.status] || statusBadges.active;

                  return (
                    <FadeIn key={service._id} direction="up" delay={index * 0.1}>
                      <div className="group relative bg-gradient-to-br from-white to-mlks-ice rounded-3xl border-2 border-gray-100 hover:border-mlks-orange hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col transform hover:-translate-y-2">
                        {/* Status Badge */}
                        {service.status !== 'active' && (
                          <div className={`absolute top-4 right-4 z-10 ${statusInfo.bg} ${statusInfo.text} text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse`}>
                            {statusInfo.label}
                          </div>
                        )}

                        {/* Image */}
                        {service.mainImage ? (
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={service.mainImage}
                              alt={service.mainImageAlt || service.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-mlks-ink/80 via-mlks-ink/40 to-transparent" />
                            
                            {/* Icon Overlay */}
                            <div className="absolute bottom-4 left-4 w-16 h-16 bg-mlks-orange rounded-2xl flex items-center justify-center shadow-xl">
                              <Package className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-56 bg-gradient-to-br from-mlks-orange/20 to-mlks-cyan/20 flex items-center justify-center">
                            <Package className="w-24 h-24 text-mlks-indigo/30" />
                            <div className="absolute bottom-4 left-4 w-16 h-16 bg-mlks-orange rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <Package className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold text-mlks-ink mb-4 group-hover:text-mlks-orange transition-colors">
                            {service.title}
                          </h3>

                          <p className="text-mlks-slate leading-relaxed mb-6 flex-1">
                            {service.shortDescription}
                          </p>

                          {service.status === 'coming_soon' ? (
                            <div className="flex items-center gap-2 text-mlks-cyan font-semibold">
                              <span>Available Soon</span>
                            </div>
                          ) : (
                            <Link href={`/services/${service.slug}`} className="inline-block">
                              <div className="flex items-center gap-2 text-mlks-orange font-semibold group-hover:gap-4 transition-all">
                                <span>Learn More</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                              </div>
                            </Link>
                          )}
                        </div>

                        {/* Hover Decoration */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-mlks-orange/10 to-transparent rounded-tl-[100px]" />
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section - Ultra Dynamic */}
        <section className="relative py-32 overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-mlks-orange via-mlks-orange-dark to-mlks-deep-indigo">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>

          {/* Floating Shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-white rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 border-2 border-white rotate-45" style={{ animation: 'spin 20s linear infinite' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center text-white">
                <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
                  <ArrowRight className="w-5 h-5 text-white animate-pulse" />
                  <span className="font-bold text-sm uppercase tracking-wider">Get Started Today</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                  Ready to Get
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                    Started?
                  </span>
                </h2>

                <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
                  Request a delivery today and experience reliable, professional service.
                </p>

                <Link href="/booking">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="bg-white text-mlks-orange hover:bg-mlks-ice shadow-2xl transform hover:scale-110 transition-all"
                  >
                    <span className="flex items-center gap-2 text-lg font-bold">
                      Request a Delivery
                      <ArrowRight className="w-6 h-6" />
                    </span>
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
