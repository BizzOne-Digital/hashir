'use client';

import FadeIn from '../animations/FadeIn';
import { Package, FileText, Zap, Clock, Calendar, Headphones } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Package,
      title: 'CAREFUL PACKAGING',
      description: 'Professional handling and secure packaging for all deliveries.',
    },
    {
      icon: FileText,
      title: 'SEAMLESS MANAGEMENT',
      description: 'Easy coordination and tracking for your business needs.',
    },
    {
      icon: Zap,
      title: 'TEMPERATURE CONTROLLED',
      description: 'Specialized handling for temperature-sensitive items.',
    },
    {
      icon: Clock,
      title: 'EXPRESS COURIER',
      description: 'Fast, reliable delivery when time matters most.',
    },
    {
      icon: Calendar,
      title: 'FLEXIBLE DELIVERIES',
      description: 'Schedule deliveries that work with your timeline.',
    },
    {
      icon: Headphones,
      title: 'DEDICATED LOGISTICS TEAM',
      description: 'Expert support and responsive communication.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-4">
              Solutions Built Around Every Delivery
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <div className="text-center p-6 group hover:bg-mlks-ice rounded-xl transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-mlks-indigo/10 rounded-lg mb-4 group-hover:bg-mlks-indigo group-hover:scale-110 transition-all">
                  <feature.icon className="w-8 h-8 text-mlks-indigo group-hover:text-white" />
                </div>
                <h3 className="text-mlks-ink font-bold text-sm uppercase tracking-wide mb-3">
                  {feature.title}
                </h3>
                <p className="text-mlks-slate text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
