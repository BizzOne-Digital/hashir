'use client';

import FadeIn from '../animations/FadeIn';
import { CheckCircle, Package } from 'lucide-react';

export default function DeliveryValues() {
  const values = [
    'Secure handling procedures and protocols',
    'Timely coordination with your schedule',
    'Professional, responsive communication',
    'Business-focused delivery solutions',
  ];

  return (
    <section className="py-20 bg-[#0a1628] relative overflow-hidden">
      {/* Animated orange path in background */}
      <svg className="absolute bottom-0 right-0 w-full h-full opacity-20" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <path
          d="M 1920 800 Q 1600 600, 1400 700 T 1000 650 Q 800 600, 600 680"
          fill="none"
          stroke="#FF7A1A"
          strokeWidth="6"
          strokeLinecap="round"
          className="animate-pulse"
        />
        <g transform="translate(550, 630)">
          <circle cx="0" cy="0" r="20" fill="#FF7A1A" className="animate-pulse" />
        </g>
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <FadeIn direction="left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Because Every Delivery
                <br />
                <span className="text-mlks-orange">Carries More Than a Package.</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="space-y-4 mb-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-mlks-orange flex-shrink-0 mt-1" />
                    <p className="text-white/90 text-lg">{value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: Image */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative rounded-lg overflow-hidden shadow-2xl h-[400px]">
              <img 
                src="/images/home-2.png" 
                alt="Professional Delivery Service" 
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
