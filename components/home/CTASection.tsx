'use client';

import Link from 'next/link';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';
import { Zap, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-mlks-deep-indigo via-mlks-indigo to-mlks-orange">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-white rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-2 border-mlks-orange rotate-45" style={{ animation: 'spin 20s linear infinite' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/10 rounded-2xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/30">
                <Zap className="w-5 h-5 text-mlks-orange animate-pulse" />
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  Ready to Ship?
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Let's Get Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mlks-orange via-yellow-400 to-mlks-orange" style={{ backgroundSize: '200% auto', animation: 'gradient 3s ease infinite' }}>
                  Delivery Moving
                </span>
              </h2>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
                Professional, reliable delivery services for pharmacies and businesses. 
                <span className="block mt-2 text-mlks-orange font-semibold">Book your delivery in minutes.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link href="/booking">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="group relative overflow-hidden bg-mlks-orange hover:bg-mlks-orange-dark shadow-2xl transform hover:scale-110 transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-3 text-lg font-bold">
                      Request Delivery Now
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white text-mlks-indigo hover:bg-mlks-ice border-2 border-white shadow-xl transform hover:scale-110 transition-all"
                  >
                    <span className="flex items-center gap-2 text-lg font-bold">
                      Talk to Our Team
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Contact Cards */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone Card */}
              <div 
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white hover:border-mlks-orange transition-all duration-500 transform hover:-translate-y-2"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-mlks-orange rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-white/70 group-hover:text-mlks-slate text-sm font-medium mb-1">Call Us</div>
                    <a 
                      href="tel:+15197783390" 
                      className="text-white group-hover:text-mlks-orange font-bold text-lg transition-colors"
                    >
                      (519) 778-3390
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div 
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white hover:border-mlks-orange transition-all duration-500 transform hover:-translate-y-2"
                style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '1s' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-mlks-cyan rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-white/70 group-hover:text-mlks-slate text-sm font-medium mb-1">Email</div>
                    <a 
                      href="mailto:info@mlksdelivery.com" 
                      className="text-white group-hover:text-mlks-orange font-bold text-lg transition-colors truncate block"
                    >
                      Get In Touch
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div 
                className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white hover:border-mlks-orange transition-all duration-500 transform hover:-translate-y-2"
                style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '2s' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-mlks-indigo rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-white/70 group-hover:text-mlks-slate text-sm font-medium mb-1">Serving</div>
                    <div className="text-white group-hover:text-mlks-orange font-bold text-lg transition-colors">
                      Ontario, Canada
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
