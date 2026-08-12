'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { availabilityOptions } from '@/lib/data/industries';

interface PartnerInquiryFormProps {
  defaultIndustry?: string;
}

interface FormData {
  businessName: string;
  address: string;
  ownerOrManager: string;
  deliveriesPerDay: string;
  deliveryCities: string;
  timeSensitiveDeliveries: string;
  availabilityTimes: string[];
  email: string;
  phone: string;
  industry?: string;
  notes?: string;
}

export default function PartnerInquiryForm({ defaultIndustry }: PartnerInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      industry: defaultIndustry || '',
      availabilityTimes: [],
    },
  });
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timeSensitiveDeliveries: data.timeSensitiveDeliveries === 'yes',
          meetingRequested: true,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-mlks-ink mb-4">Inquiry Submitted!</h2>
        <p className="text-lg text-mlks-slate mb-4">
          Thank you for your interest in partnering with MLKS Delivery Solutions.
        </p>
        <p className="text-mlks-slate">
          Our team will review your information and reach out to schedule a meeting to discuss rates tailored to your business.
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white';
  const labelClass = 'block text-sm font-medium text-mlks-ink mb-2';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-mlks-slate text-sm bg-mlks-ice rounded-lg p-4">
        Rates vary by business type and volume. Fill out this form and our team will reach out to schedule a meeting and provide a custom quote.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('businessName', { required: true })}
            className={inputClass}
            placeholder="Your business name"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm mt-1">Business name is required</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Owner or Manager <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('ownerOrManager', { required: true })}
            className={inputClass}
            placeholder="Contact person name"
          />
          {errors.ownerOrManager && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Business Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('address', { required: true })}
          className={inputClass}
          placeholder="Street address, city, province, postal code"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">Address is required</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Number of Deliveries Per Day <span className="text-red-500">*</span>
          </label>
          <select
            {...register('deliveriesPerDay', { required: true })}
            className={inputClass}
          >
            <option value="">Select range</option>
            <option value="1-5">1 – 5</option>
            <option value="6-15">6 – 15</option>
            <option value="16-30">16 – 30</option>
            <option value="31-50">31 – 50</option>
            <option value="50+">50+</option>
          </select>
          {errors.deliveriesPerDay && (
            <p className="text-red-500 text-sm mt-1">Please select a range</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Industry</label>
          <select {...register('industry')} className={inputClass}>
            <option value="">Select industry</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="law-firms">Law Firm</option>
            <option value="food">Food & Restaurant</option>
            <option value="parcel-delivery">B2C Parcel Delivery</option>
            <option value="other">Other Business</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Cities You Require Deliveries In <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('deliveryCities', { required: true })}
          rows={2}
          className={`${inputClass} resize-none`}
          placeholder="e.g. Kitchener, Waterloo, Cambridge, Guelph"
        />
        {errors.deliveryCities && (
          <p className="text-red-500 text-sm mt-1">Please list your delivery cities</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Do you have time-sensitive deliveries? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="yes"
              {...register('timeSensitiveDeliveries', { required: true })}
              className="w-4 h-4 text-mlks-orange"
            />
            <span className="text-mlks-ink">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="no"
              {...register('timeSensitiveDeliveries', { required: true })}
              className="w-4 h-4 text-mlks-orange"
            />
            <span className="text-mlks-ink">No</span>
          </label>
        </div>
        {errors.timeSensitiveDeliveries && (
          <p className="text-red-500 text-sm mt-1">Please select an option</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Your Availability Times <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-mlks-slate mb-3">
          Select when you are typically available for a meeting to discuss rates.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availabilityOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-mlks-orange/50 transition-colors has-[:checked]:border-mlks-orange has-[:checked]:bg-mlks-orange/5"
            >
              <input
                type="checkbox"
                value={option.value}
                {...register('availabilityTimes', {
                  validate: (value) =>
                    (value && value.length > 0) || 'Select at least one time',
                })}
                className="w-4 h-4 text-mlks-orange rounded"
              />
              <span className="text-sm text-mlks-ink">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.availabilityTimes && (
          <p className="text-red-500 text-sm mt-1">Select at least one availability time</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className={inputClass}
            placeholder="you@business.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Valid email required</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register('phone', { required: true })}
            className={inputClass}
            placeholder="(519) 555-0123"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">Phone number is required</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          {...register('notes')}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Anything else we should know about your delivery needs?"
        />
      </div>

      {submitStatus === 'error' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Submission Failed</p>
            <p className="text-red-600 text-sm">
              Please try again or email us at{' '}
              <a href="mailto:info@mlksdelivery.com" className="underline">
                info@mlksdelivery.com
              </a>
            </p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        Request a Meeting for Rates
      </Button>
    </form>
  );
}
