'use client';

import Link from 'next/link';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';
import { Package, TrendingUp } from 'lucide-react';

export default function ServicesShowcase({ services }: { services: any[] }) {
  return (
    <section className="section-padding bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, #30359B 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-mlks-orange/10 rounded-full">
              <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-mlks-ink mb-6">
              Delivery Solutions That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mlks-indigo to-mlks-orange">Work For You</span>
            </h2>
            <p className="text-xl text-mlks-slate max-w-3xl mx-auto">
              From pharmacy deliveries to business logistics, we provide professional transportation services.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <FadeIn key={service._id} direction="up" delay={index * 0.1}>
              <Link href={`/services/${service.slug}`}>
                <div className="group relative bg-gradient-to-br from-white to-mlks-ice rounded-3xl border-2 border-gray-100 hover:border-mlks-orange p-8 hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2">
                  {service.status === 'coming_soon' && (
                    <div className="absolute top-4 right-4 bg-mlks-cyan text-white text-xs font-bold px-4 py-2 rounded-full animate-pulse">
                      Coming Soon
                    </div>
                  )}

                  <div className="mb-6 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-mlks-orange to-mlks-orange-dark rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Package className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-mlks-cyan rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-mlks-ink mb-4 group-hover:text-mlks-orange transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-mlks-slate leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="flex items-center gap-2 text-mlks-orange font-semibold group-hover:gap-4 transition-all">
                    <span>Learn More</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>

                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-mlks-orange/10 to-transparent rounded-tl-[100px]" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <div className="text-center mt-16">
            <Link href="/services">
              <Button variant="secondary" size="lg" className="shadow-xl">
                View All Services
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
