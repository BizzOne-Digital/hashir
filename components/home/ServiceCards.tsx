'use client';

import Link from 'next/link';
import FadeIn from '../animations/FadeIn';
import { Package, Truck, Timer, Building } from 'lucide-react';

export default function ServiceCards() {
  const services = [
    {
      title: 'PHARMACY DELIVERY',
      description: 'Specialized pharmaceutical delivery services with secure handling.',
      icon: Package,
      image: 'pharmacy-delivery.jpg',
    },
    {
      title: 'CORPORATE SERVICES',
      description: 'Professional delivery solutions for businesses and corporate clients.',
      icon: Building,
      image: 'corporate-services.jpg',
    },
    {
      title: 'BUSINESS DELIVERY',
      description: 'Flexible business logistics and delivery coordination.',
      icon: Truck,
      image: 'business-delivery.jpg',
    },
    {
      title: 'EXPRESS REQUESTS',
      description: 'Time-sensitive deliveries for urgent business needs.',
      icon: Timer,
      image: 'express-requests.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <div className="group relative bg-[#0a1628] rounded-lg overflow-hidden h-[280px] cursor-pointer transition-transform hover:scale-105">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-mlks-indigo/50 to-mlks-deep-indigo/80 flex items-center justify-center">
                  <div className="text-white/20 text-center">
                    <service.icon className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-xs">{service.image}</p>
                    <p className="text-[10px] mt-1">400x280px</p>
                  </div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-mlks-orange/0 group-hover:bg-mlks-orange/10 transition-colors duration-300" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
