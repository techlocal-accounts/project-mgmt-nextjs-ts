'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['bug', 'feature', 'partnership', 'other']),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'border-gray-300 dark:border-gray-600',
            errors.name && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'border-gray-300 dark:border-gray-600',
            errors.email && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          {...register('subject')}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'border-gray-300 dark:border-gray-600',
            errors.subject && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Type of inquiry *
        </label>
        <select
          id="type"
          {...register('type')}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'border-gray-300 dark:border-gray-600',
            errors.type && 'border-red-500 focus:ring-red-500'
          )}
        >
          <option value="">Select an option</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="partnership">Partnership Inquiry</option>
          <option value="other">Other</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.type.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={cn(
            'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none',
            'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
            'border-gray-300 dark:border-gray-600',
            errors.message && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Please provide as much detail as possible..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200',
          'bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isSubmitting && 'animate-pulse'
        )}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );
}