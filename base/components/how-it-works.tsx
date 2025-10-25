'use client';

import React from 'react';
import { motion } from 'motion/react';

const steps = [
  {
    id: 1,
    title: 'Describe your symptoms',
    description: 'OpenAI-powered analysis understands your health concerns in natural language',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    gradient: 'from-[#F47C6B] to-[#FF8C7A]'
  },
  {
    id: 2,
    title: 'AI matches you with specialists',
    description: 'Intelligent matching finds the right providers based on your symptoms and insurance',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-[#3A7FD5] to-[#5A94E8]'
  },
  {
    id: 3,
    title: 'Book with real-time availability',
    description: 'See open slots instantly and get automated email confirmations and reminders',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-[#78B8FF] to-[#9AC8FF]'
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,124,107,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(58,127,213,0.05),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#F47C6B]/10 to-[#3A7FD5]/10 backdrop-blur-sm rounded-full border border-white/40 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
              Simple Process
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
            How NORA Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered healthcare matching in three simple steps
          </p>
        </motion.div>

        {/* Three-step layout with connecting lines */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-[#F47C6B] via-[#3A7FD5] to-[#78B8FF] opacity-20" style={{ zIndex: 0 }} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative" style={{ zIndex: 1 }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className="relative bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-lg border-4 border-white flex items-center justify-center">
                    <span className={`text-lg font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.id}
                    </span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 bg-gradient-to-br ${step.gradient} rounded-2xl text-white mb-6 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[#1E1E1E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative gradient bar */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} rounded-b-2xl`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="px-10 py-4 bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] text-white font-bold text-lg rounded-xl shadow-[0_4px_20px_rgba(244,124,107,0.3)] hover:shadow-[0_6px_30px_rgba(244,124,107,0.4)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try it yourself
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
