'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-mlks-ink mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-mlks-ink mb-2">
            Business Name
          </label>
          <input
            type="text"
            {...register('businessName')}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white"
            placeholder="Your business"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-mlks-ink mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Valid email required</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-mlks-ink mb-2">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-mlks-ink mb-2">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('subject', { required: true })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white"
          placeholder="How can we help?"
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">Subject is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-mlks-ink mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message', { required: true })}
          rows={6}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors bg-white resize-none"
          placeholder="Tell us about your delivery needs..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">Message is required</p>}
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium">Message Sent!</p>
            <p className="text-green-600 text-sm">We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Submission Failed</p>
            <p className="text-red-600 text-sm">Please try again or call us directly.</p>
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
        Send Message
      </Button>
    </form>
  );
}
