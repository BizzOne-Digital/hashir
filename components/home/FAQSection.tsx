'use client';

import FadeIn from '../animations/FadeIn';
import { Star, Quote } from 'lucide-react';

export default function FAQSection() {
  const reviews = [
    {
      name: 'Sarah Mitchell',
      role: 'Pharmacy Manager',
      location: 'Toronto, ON',
      rating: 5,
      text: 'MLKS has been an absolute game-changer for our pharmacy. Their reliable delivery service and professional handling give us complete confidence. Our customers appreciate the timely deliveries.',
      date: 'January 2024',
    },
    {
      name: 'David Chen',
      role: 'Healthcare Provider',
      location: 'Mississauga, ON',
      rating: 5,
      text: 'Outstanding service! The coordination and communication from MLKS is exceptional. They understand the importance of timely medical deliveries and always deliver on their promises.',
      date: 'February 2024',
    },
    {
      name: 'Jennifer Williams',
      role: 'Business Owner',
      location: 'Brampton, ON',
      rating: 5,
      text: 'We switched to MLKS for our business deliveries and couldn\'t be happier. Professional, responsive, and always on time. Highly recommend their services!',
      date: 'March 2024',
    },
    {
      name: 'Michael Brown',
      role: 'Operations Director',
      location: 'Oakville, ON',
      rating: 5,
      text: 'MLKS Delivery Solutions has become an integral part of our operations. Their attention to detail and secure handling procedures are exactly what we need.',
      date: 'January 2024',
    },
    {
      name: 'Lisa Anderson',
      role: 'Pharmacy Owner',
      location: 'Hamilton, ON',
      rating: 5,
      text: 'Exceptional delivery service! MLKS understands the unique needs of pharmacy deliveries. Their team is professional, careful, and always responsive to our requests.',
      date: 'February 2024',
    },
    {
      name: 'Robert Taylor',
      role: 'Medical Office Manager',
      location: 'Burlington, ON',
      rating: 5,
      text: 'We rely on MLKS for time-sensitive medical deliveries and they never disappoint. Professional service with a personal touch. Truly a reliable partner for our practice.',
      date: 'March 2024',
    },
  ];

  return (
    <section className="py-20 bg-mlks-ice">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-mlks-orange/10 rounded-full">
              <span className="text-mlks-orange font-bold text-xs uppercase tracking-wider">
                Client Reviews
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-mlks-ink mb-4">
              Trusted by Businesses Across Ontario
            </h2>
            <p className="text-xl text-mlks-slate max-w-2xl mx-auto">
              See what our clients say about our delivery services
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-mlks-orange text-mlks-orange" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-mlks-orange/20 mb-4" />

                {/* Review Text */}
                <p className="text-mlks-slate italic text-base leading-relaxed mb-6 flex-1">
                  "{review.text}"
                </p>

                {/* Reviewer Info */}
                <div className="border-t border-mlks-ice pt-4">
                  <p className="text-mlks-ink font-bold text-base">{review.name}</p>
                  <p className="text-mlks-slate text-sm">{review.role}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-mlks-slate text-xs">{review.location}</p>
                    <p className="text-mlks-slate/60 text-xs">{review.date}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.8}>
          <div className="text-center mt-16">
            <p className="text-mlks-slate text-lg mb-6">
              Ready to experience professional delivery service?
            </p>
            <a 
              href="/booking"
              className="inline-block bg-mlks-orange hover:bg-mlks-orange-dark text-white font-bold px-8 py-4 rounded uppercase tracking-wide transition-colors"
            >
              Request a Delivery
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
