'use client';

import Link from 'next/link';
import FadeIn from '../animations/FadeIn';
import { Package, Users, ArrowRight } from 'lucide-react';

export default function BusinessFocus() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Images */}
          <div className="grid grid-cols-2 gap-4">
            <FadeIn direction="left">
              <div className="rounded-lg overflow-hidden shadow-xl h-[250px] md:h-[300px]">
                <img 
                  src="/images/home-4.png" 
                  alt="Professional Delivery Service" 
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <div className="rounded-lg overflow-hidden shadow-xl h-[250px] md:h-[300px] mt-8 md:mt-12">
                <img 
                  src="/images/home-5.png" 
                  alt="Business Delivery Solutions" 
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div>
            <FadeIn direction="right">
              <div className="inline-block mb-4 px-4 py-2 bg-mlks-orange/10 rounded-full">
                <span className="text-mlks-orange font-bold text-xs uppercase tracking-wider">
                  Built for Businesses
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-mlks-ink mb-6 leading-tight">
                Built for Businesses.
                <br />
                <span className="text-mlks-orange">Driven by Reliability.</span>
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <p className="text-mlks-slate text-base md:text-lg leading-relaxed mb-6">
                MLKS Delivery Solutions specializes in pharmacy and business deliveries. We understand that your deliveries carry more than just packages—they represent your business reputation and customer relationships.
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-mlks-ice rounded-lg">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-mlks-indigo rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-mlks-ink font-bold text-xs md:text-sm">PHARMACY FOCUSED</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-mlks-ice rounded-lg">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-mlks-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-mlks-ink font-bold text-xs md:text-sm">BUSINESS READY</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <Link href="/industries">
                <button className="inline-flex items-center gap-2 text-mlks-orange font-bold hover:gap-4 transition-all text-sm md:text-base">
                  Explore Industries We Serve
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
