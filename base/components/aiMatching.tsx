'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function AIMatching() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: AI Chat Interface */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
              {/* Chat Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">N</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Nora AI</div>
                  <div className="text-xs text-gray-600">Online</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User Message */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="bg-gray-900 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-sm">
                      I have a persistent headache and need to see a neurologist
                    </p>
                  </div>
                </motion.div>

                {/* AI Response */}
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-700 mb-3">
                      I found <span className="font-medium text-gray-900">3 neurologists</span> near you who accept your insurance:
                    </p>
                    
                    {/* Provider Cards */}
                    <div className="space-y-2">
                      {[
                        { name: 'Dr. Sarah Chen', rating: '4.9', availability: 'Available today' },
                        { name: 'Dr. Michael Park', rating: '4.8', availability: 'Available tomorrow' }
                      ].map((doctor, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {doctor.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                ⭐ {doctor.rating} • {doctor.availability}
                              </div>
                            </div>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="w-full mt-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 }}
                    >
                      View All Matches
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Typing Indicator */}
              <motion.div
                className="mt-4 flex items-center gap-2 text-xs text-gray-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>AI is analyzing...</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              Your intelligent{' '}
              <span className="font-medium">care assistant</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Powered by OpenAI GPT, NORA analyzes your symptoms and intelligently matches you with the most appropriate medical specialists who accept your insurance.
            </p>

            {/* Feature List */}
            <div className="space-y-4 pt-4">
              {[
                {
                  title: 'AI symptom analysis',
                  description: 'OpenAI-powered understanding of your health concerns'
                },
                {
                  title: 'Specialist matching',
                  description: 'Smart recommendations based on symptoms and provider expertise'
                },
                {
                  title: 'Real-time scheduling',
                  description: 'Live availability with instant booking and automated notifications'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
