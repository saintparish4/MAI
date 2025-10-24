'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Providers() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-[#F47C6B]/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                For Healthcare Providers
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-6">
              Designed for Providers,{' '}
              <span className="bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
                Too.
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automate scheduling, reduce no-shows by 40%, and fill cancellations with AI-powered patient matching.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-10">
              {[
                'Automated appointment reminders',
                'Real-time calendar synchronization',
                'AI-powered patient matching',
                'Reduced administrative overhead'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#F47C6B] to-[#3A7FD5] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup?role=provider"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] text-white font-bold text-lg rounded-xl shadow-[0_6px_24px_rgba(244,124,107,0.3)] hover:shadow-[0_8px_32px_rgba(244,124,107,0.4)] transition-all"
              >
                Join as Provider
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/60"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard UI Placeholder */}
              <div className="space-y-5">
                {[
                  { bg: 'from-[#3A7FD5] to-[#5A94E8]', width: 'w-1/3' },
                  { bg: 'from-[#78B8FF] to-[#9AC8FF]', width: 'w-2/5' },
                  { bg: 'from-[#F47C6B] to-[#FF8C7A]', width: 'w-1/2' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${item.bg} rounded-xl shadow-md`}
                        animate={{ rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      />
                      <div className="flex-1 space-y-2">
                        <motion.div
                          className={`h-3 bg-gradient-to-r ${item.bg} rounded ${item.width}`}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <div className="h-2 bg-gray-100 rounded w-3/5" />
                      </div>
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats overlay */}
              <motion.div
                className="mt-6 grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { value: '40%', label: 'Less No-shows' },
                  { value: '2x', label: 'More Bookings' },
                  { value: '5min', label: 'Setup Time' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-gradient-to-br from-[#F47C6B] to-[#3A7FD5] text-white px-6 py-3 rounded-full shadow-lg font-bold"
              initial={{ opacity: 0, scale: 0, y: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
              transition={{ type: "spring", delay: 0.5, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            >
              ⚡ Live Now
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
