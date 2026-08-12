'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';

interface FAQAccordionProps {
  faqs: any[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq: any, index: number) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={faq._id}
            className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-mlks-orange/30 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-mlks-ice/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-lg text-mlks-ink pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  'w-6 h-6 text-mlks-orange flex-shrink-0 transition-transform duration-300',
                  isOpen && 'transform rotate-180'
                )}
              />
            </button>
            
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96' : 'max-h-0'
              )}
            >
              <div className="px-6 pb-4 text-mlks-slate leading-relaxed whitespace-pre-line">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
