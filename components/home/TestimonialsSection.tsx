'use client';

import FadeIn from '../animations/FadeIn';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'MLKS has been instrumental in helping us serve our customers better. Their reliable pharmacy delivery service is exactly what we needed.',
      author: 'Pharmacy Manager',
      location: 'Toronto, ON',
    },
    {
      quote: 'Professional, responsive, and always on time. MLKS Delivery Solutions has become a trusted partner for our business deliveries.',
      author: 'Business Owner',
      location: 'Mississauga, ON',
    },
    {
      quote: 'The careful handling and secure delivery process gives us complete confidence. Highly recommend their services.',
      author: 'Healthcare Provider',
      location: 'Brampton, ON',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-4">
              Trusted by Pharmacies, Providers, and Businesses
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <div className="bg-mlks-ice p-8 rounded-xl relative">
                <Quote className="w-12 h-12 text-mlks-orange/20 absolute top-4 right-4" />
                <div className="relative z-10">
                  <p className="text-mlks-slate italic text-base leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-mlks-slate/20 pt-4">
                    <p className="text-mlks-ink font-bold text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-mlks-slate text-xs mt-1">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
