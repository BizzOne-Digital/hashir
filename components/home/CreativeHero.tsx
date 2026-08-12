'use client';

import Link from 'next/link';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';
import { Calendar, MessageCircle, Package } from 'lucide-react';

export default function CreativeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a1628]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-bg.png" 
          alt="MLKS Delivery Service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]/40" />
        
        {/* Animated Path/Route Line */}
        <svg className="absolute bottom-0 left-0 w-full h-full opacity-80" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A1A" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF7A1A" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path
            d="M 200 800 Q 400 600, 600 700 T 1000 650 Q 1200 600, 1400 680"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#glow)"
            className="animate-pulse"
          />
          
          <g transform="translate(1350, 630)">
            <circle cx="0" cy="0" r="25" fill="#FF7A1A" className="animate-pulse" />
            <path d="M 0 -15 L -8 0 L 0 15 L 8 0 Z" fill="white" />
          </g>
        </svg>

        {/* Floating particles - Fixed positions */}
        <div className="absolute inset-0 opacity-20">
          {[
            { left: 10, top: 20, duration: 8, delay: 1 },
            { left: 25, top: 50, duration: 12, delay: 2 },
            { left: 40, top: 15, duration: 10, delay: 0.5 },
            { left: 55, top: 70, duration: 9, delay: 3 },
            { left: 70, top: 35, duration: 11, delay: 1.5 },
            { left: 85, top: 60, duration: 7, delay: 2.5 },
            { left: 15, top: 80, duration: 13, delay: 0 },
            { left: 30, top: 25, duration: 8, delay: 4 },
            { left: 60, top: 90, duration: 10, delay: 1 },
            { left: 75, top: 45, duration: 12, delay: 3.5 },
            { left: 90, top: 10, duration: 9, delay: 2 },
            { left: 5, top: 55, duration: 11, delay: 1.5 },
            { left: 35, top: 65, duration: 8, delay: 3 },
            { left: 50, top: 30, duration: 10, delay: 0.5 },
            { left: 65, top: 85, duration: 13, delay: 4 },
            { left: 80, top: 20, duration: 9, delay: 2.5 },
            { left: 20, top: 40, duration: 12, delay: 1 },
            { left: 45, top: 75, duration: 11, delay: 3.5 },
            { left: 95, top: 50, duration: 8, delay: 0 },
            { left: 12, top: 95, duration: 10, delay: 2 },
          ].map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-mlks-cyan rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-32 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn direction="up">
                <div className="inline-block mb-6 px-4 py-2 border border-mlks-cyan/30 rounded">
                  <span className="text-mlks-cyan font-bold text-xs uppercase tracking-widest">
                    PHARMACY • BUSINESS • EXPRESS DELIVERY
                  </span>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                  Delivery That
                  <br />
                  Moves Business
                  <br />
                  <span className="text-mlks-orange">Forward.</span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
                  Secure, timely, and carefully coordinated delivery solutions for pharmacies, healthcare providers, and businesses.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/booking">
                    <Button 
                      className="bg-mlks-orange hover:bg-mlks-orange-dark text-white font-bold px-8 py-4 rounded text-sm uppercase tracking-wide"
                    >
                      REQUEST A DELIVERY
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button 
                      className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded text-sm uppercase tracking-wide bg-transparent"
                    >
                      EXPLORE SERVICES →
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div className="flex flex-wrap gap-4 md:gap-8">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                    <div>
                      <div className="text-white font-bold text-[10px] md:text-xs whitespace-nowrap">CAREFUL HANDLING</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                    <div>
                      <div className="text-white font-bold text-[10px] md:text-xs whitespace-nowrap">FLEXIBLE SCHEDULING</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                    <div>
                      <div className="text-white font-bold text-[10px] md:text-xs whitespace-nowrap">RESPONSIVE COMMUNICATION</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
