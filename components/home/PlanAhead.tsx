'use client';

import Link from 'next/link';
import FadeIn from '../animations/FadeIn';
import { Calendar, CheckCircle, Package } from 'lucide-react';

export default function PlanAhead() {
  const benefits = [
    'Schedule recurring deliveries',
    'Coordinate with your business hours',
    'Build consistent delivery partnerships',
  ];

  return (
    <section className="py-20 bg-[#0a1628]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Plan Ahead. Stay Ahead.
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Schedule your deliveries in advance to ensure smooth, reliable service that aligns with your business operations.
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-mlks-orange flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-base">{benefit}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.4}>
              <Link href="/booking">
                <button className="bg-mlks-orange hover:bg-mlks-orange-dark text-white font-bold px-8 py-4 rounded uppercase tracking-wide transition-colors">
                  Schedule a Delivery
                </button>
              </Link>
            </FadeIn>
          </div>

          {/* Right: Image */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative rounded-lg overflow-hidden shadow-2xl h-[400px]">
              <img 
                src="/images/home-1.png" 
                alt="Plan Your Delivery Schedule" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
