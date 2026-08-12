'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  services: any[];
}

export default function BookingForm({ services }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [requestNumber, setRequestNumber] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setRequestNumber(result.requestNumber);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
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
        <h2 className="text-3xl font-bold text-mlks-ink mb-4">Request Submitted!</h2>
        <p className="text-lg text-mlks-slate mb-6">
          Your delivery request has been received. Our team will contact you shortly to coordinate the details.
        </p>
        <div className="bg-mlks-ice rounded-xl p-6 mb-8">
          <p className="text-sm text-mlks-slate mb-2">Your Request Number</p>
          <p className="text-2xl font-bold text-mlks-orange">{requestNumber}</p>
        </div>
        <Button variant="primary" onClick={() => window.location.href = '/'}>
          Return to Homepage
        </Button>
      </div>
    );
  }

  const totalSteps = 4;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= num ? 'bg-mlks-orange text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                {num}
              </div>
              {num < totalSteps && (
                <div className={`flex-1 h-1 mx-2 ${step > num ? 'bg-mlks-orange' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-mlks-slate font-medium">
          Step {step} of {totalSteps}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Customer Information */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-mlks-ink mb-6">Customer Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-mlks-ink mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('customerName', { required: true })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                placeholder="John Doe"
              />
              {errors.customerName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-mlks-ink mb-2">Business Name</label>
              <input
                type="text"
                {...register('businessName')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                placeholder="ABC Pharmacy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-mlks-ink mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Valid email required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-mlks-ink mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: true })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Delivery Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-mlks-ink mb-6">Delivery Details</h3>
            
            {services.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-mlks-ink mb-2">Service Type</label>
                <select
                  {...register('service')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((service: any) => (
                    <option key={service._id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-mlks-ink mb-2">
                Package Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('packageDescription', { required: true })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                placeholder="Describe what needs to be delivered..."
              />
              {errors.packageDescription && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-mlks-ink mb-2">
                  Number of Items <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register('numberOfItems', { required: true, min: 1 })}
                  defaultValue={1}
                  min={1}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mlks-ink mb-2">Approximate Size</label>
                <input
                  type="text"
                  {...register('approximateSize')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                  placeholder="e.g., Small box"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mlks-ink mb-2">Approximate Weight</label>
                <input
                  type="text"
                  {...register('approximateWeight')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                  placeholder="e.g., 5 lbs"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" {...register('fragile')} className="w-5 h-5 text-mlks-orange" />
                <span className="text-mlks-ink">Fragile items</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" {...register('medicalRelated')} className="w-5 h-5 text-mlks-orange" />
                <span className="text-mlks-ink">Medical/pharmacy related</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" {...register('temperatureSensitive')} className="w-5 h-5 text-mlks-orange" />
                <span className="text-mlks-ink">Temperature sensitive</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Pickup & Delivery Locations */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-mlks-ink mb-6">Pickup Location</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('pickupContactName', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register('pickupPhone', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-mlks-ink mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('pickupAddress', { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('pickupCity', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('pickupProvince', { required: true })}
                      defaultValue="ON"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('pickupPostalCode', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-mlks-ink mb-6">Delivery Location</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('deliveryContactName', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register('deliveryPhone', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-mlks-ink mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('deliveryAddress', { required: true })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('deliveryCity', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('deliveryProvince', { required: true })}
                      defaultValue="ON"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlks-ink mb-2">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('deliveryPostalCode', { required: true })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Additional Information */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-mlks-ink mb-6">Additional Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-mlks-ink mb-2">Special Instructions</label>
              <textarea
                {...register('notes')}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mlks-orange focus:outline-none transition-colors"
                placeholder="Any special handling instructions or additional details..."
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" {...register('recurringDelivery')} className="w-5 h-5 text-mlks-orange" />
                <span className="text-mlks-ink font-medium">This is a recurring delivery need</span>
              </label>
            </div>

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Submission Failed</p>
                  <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-8 border-t-2 border-gray-100">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={isSubmitting}
            >
              Previous
            </Button>
          )}
          
          {step < totalSteps ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => setStep(step + 1)}
              className={step === 1 ? 'ml-auto' : ''}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
