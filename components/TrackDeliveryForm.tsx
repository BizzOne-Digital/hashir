'use client';

import { useState } from 'react';
import Button from './ui/Button';
import { Search, Package, AlertCircle } from 'lucide-react';

export default function TrackDeliveryForm() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mlks-slate" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              setSearched(false);
            }}
            placeholder="Enter your delivery number"
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors text-lg"
            required
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="sm:px-8">
          <Search className="w-5 h-5 mr-2" />
          Track
        </Button>
      </form>

      {searched && trackingNumber && (
        <div className="bg-mlks-ice border-2 border-mlks-cyan/30 rounded-xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-mlks-indigo flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-mlks-ink mb-2">Tracking: {trackingNumber}</p>
            <p className="text-mlks-slate text-sm leading-relaxed">
              Real-time delivery tracking is coming soon. For now, please contact us at{' '}
              <a href="mailto:info@mlksdelivery.com" className="text-mlks-orange hover:underline">
                info@mlksdelivery.com
              </a>{' '}
              or call us for delivery status updates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
