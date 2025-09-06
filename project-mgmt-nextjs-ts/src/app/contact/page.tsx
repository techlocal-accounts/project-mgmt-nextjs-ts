'use client';

import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';
import { ContactForm } from '@/components/Contact/ContactForm';
import { WhatsAppCTA } from '@/components/Contact/WhatsAppCTA';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setFormSubmitted(true);
    // Here you would typically send the data to your backend
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Bug reports, feature requests and partnership inquiries via contact form and WhatsApp CTA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Send us a message
                </h2>
              </div>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Message sent successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">support@projectmanagement.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">WhatsApp</h4>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Available 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <MapPinIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Office</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Business Street<br />
                      Suite 100<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <WhatsAppCTA />

            {/* FAQ */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    How do I get started?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Simply clone the repository and run <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">npm install</code> followed by <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">npm run dev</code>.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Is this free to use?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Yes! This project is open source and available under the MIT license.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Can I customize the theme?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Absolutely! The app supports light/dark themes and you can customize colors in the Tailwind config.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}