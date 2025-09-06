'use client';

import { useState } from 'react';
import { 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export function WhatsAppCTA() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '15551234567'; // Replace with your WhatsApp number
    const message = encodeURIComponent('Hi! I have a question about the Project Management app.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get instant help via WhatsApp
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
        >
          {isExpanded ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">W</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  WhatsApp Support
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Available Monday - Friday, 9 AM - 6 PM EST
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Average response time: 5 minutes
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
              What we can help with:
            </h5>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Technical support and troubleshooting</li>
              <li>• Feature requests and feedback</li>
              <li>• Integration and customization help</li>
              <li>• General questions about the app</li>
            </ul>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>Start WhatsApp Chat</span>
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Or call us at{' '}
              <a 
                href="tel:+15551234567" 
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      )}

      {!isExpanded && (
        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <span>Chat on WhatsApp</span>
        </button>
      )}
    </div>
  );
}