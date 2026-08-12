'use client';

import FadeIn from '../animations/FadeIn';
import { Shield, Clock, Truck, MapPin } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Careful Handling',
      description: 'Professional procedures for secure, damage-free delivery',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Same-day, express, and scheduled delivery options',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Truck,
      title: 'Business Focused',
      description: 'Specialized solutions for pharmacies and businesses',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Responsive Communication',
      description: 'Stay informed throughout the delivery process',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-mlks-deep-indigo to-mlks-indigo text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-white"
            style={{
              left: `${(i / 20) * 100}%`,
              animation: `slideDown ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-mlks-orange font-bold text-sm uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Delivery You Can
              <span className="block text-mlks-orange">Depend On</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.15}>
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-mlks-orange transition-all duration-500 h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
}
