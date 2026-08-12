'use client';

import FadeIn from '../animations/FadeIn';
import { Monitor, CheckCircle } from 'lucide-react';

export default function TechnologySection() {
  const features = [
    'Real-time coordination with your business',
    'Secure handling procedures and protocols',
    'Professional tracking and updates',
    'Responsive communication throughout delivery',
  ];

  return (
    <section className="py-20 bg-[#0a1628]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Technology That Keeps
                <br />
                <span className="text-mlks-orange">Your Delivery On Track.</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Professional coordination systems designed to support your business operations and keep you informed.
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-mlks-orange flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-base">{feature}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Dashboard Preview */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="/images/home-3.png" 
                alt="Delivery Tracking Dashboard" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
