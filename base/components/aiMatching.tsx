'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function AIMatching() {
  return (
    <section className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(58,127,213,0.05),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: AI Chat UI Illustration */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-gray-100">
              {/* Chat Interface */}
              <div className="space-y-6">
                {/* User Message */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-[#F47C6B] to-[#FF8C7A] rounded-2xl rounded-tr-sm px-6 py-4 max-w-xs shadow-lg">
                    <p className="text-sm text-white font-medium">
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
                  <div className="bg-white rounded-2xl rounded-tl-sm px-6 py-5 max-w-sm shadow-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-br from-[#3A7FD5] to-[#78B8FF] rounded-full flex items-center justify-center shadow-md"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-xs font-bold text-white">N</span>
                      </motion.div>
                      <span className="text-sm font-bold text-gray-900">Nora AI</span>
                      <motion.div
                        className="flex gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-[#3A7FD5] rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </motion.div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4 font-medium">
                      I found <span className="font-bold text-[#3A7FD5]">3 neurologists</span> near you who accept your insurance:
                    </p>
                    
                    {/* Mini Provider Cards */}
                    <div className="space-y-3">
                      {[
                        { name: 'Dr. Sarah Chen', rating: '4.9', availability: 'Available today', color: 'from-[#F47C6B] to-[#FF8C7A]' },
                        { name: 'Dr. Michael Park', rating: '4.8', availability: 'Available tomorrow', color: 'from-[#3A7FD5] to-[#5A94E8]' }
                      ].map((doctor, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${doctor.color} rounded-lg shadow-md flex items-center justify-center text-white font-bold text-sm`}>
                              {doctor.name.split(' ')[1][0]}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900">{doctor.name}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span className="flex items-center gap-1">
                                  ⭐ {doctor.rating}
                                </span>
                                <span>•</span>
                                <span className="text-green-600 font-medium">{doctor.availability}</span>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quick action button */}
                    <motion.button
                      className="w-full mt-4 py-3 bg-gradient-to-r from-[#3A7FD5] to-[#78B8FF] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
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

              {/* Floating typing indicator */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <motion.div
                    className="w-2 h-2 bg-[#3A7FD5] rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  AI is analyzing...
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#F47C6B]/20 to-transparent rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-gradient-to-r from-[#F47C6B]/10 to-[#3A7FD5]/10 backdrop-blur-sm rounded-full border border-white/40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
                Powered by AI
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your intelligent{' '}
              <span className="bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
                care assistant
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Powered by OpenAI GPT, NORA analyzes your symptoms and intelligently matches you with the most appropriate medical specialists who accept your insurance.
            </p>

            {/* Feature List */}
            <div className="space-y-5 pt-4">
              {[
                {
                  title: 'AI symptom analysis',
                  description: 'OpenAI-powered understanding of your health concerns',
                  icon: '🤖'
                },
                {
                  title: 'Specialist matching',
                  description: 'Smart recommendations based on symptoms and provider expertise',
                  icon: '🎯'
                },
                {
                  title: 'Real-time scheduling',
                  description: 'Live availability with instant booking and automated notifications',
                  icon: '⚡'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-gray-100 hover:border-[#3A7FD5]/30 hover:shadow-lg transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
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
