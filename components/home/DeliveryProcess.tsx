'use client';

import FadeIn from '../animations/FadeIn';
import { Phone, Calendar, Truck, CheckCircle, MessageCircle } from 'lucide-react';

export default function DeliveryProcess() {
  const steps = [
    {
      icon: Phone,
      title: 'Submit Your Request',
      description: 'Contact us with your delivery details',
    },
    {
      icon: Calendar,
      title: 'Choose Your Time',
      description: 'Select a convenient pickup and delivery schedule',
    },
    {
      icon: Truck,
      title: 'We Pick Up',
      description: 'Professional pickup from your location',
    },
    {
      icon: MessageCircle,
      title: 'Secure Handling',
      description: 'Careful transportation of your items',
    },
    {
      icon: CheckCircle,
      title: 'Delivery to Destination',
      description: 'Safe delivery to the recipient',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-4">
              From Request to Delivery
            </h2>
            <p className="text-xl text-mlks-slate max-w-2xl mx-auto">
              A simple, streamlined process for your deliveries
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <div className="text-center relative">
                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-mlks-orange/20 z-0" />
                )}

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-4 border-mlks-orange rounded-full mb-4 shadow-lg">
                    <step.icon className="w-7 h-7 text-mlks-orange" />
                  </div>
                  <h3 className="text-mlks-ink font-bold text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="text-mlks-slate text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
