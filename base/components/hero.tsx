'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import Link from 'next/link';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform motion values at top level
  const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 400], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen py-24 md:py-32 mt-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <motion.div
          className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-[#F47C6B]/20 to-[#3A7FD5]/20 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-0 -right-40 w-[800px] h-[800px] bg-gradient-to-tl from-[#3A7FD5]/20 to-[#78B8FF]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-[#F47C6B]/10 to-transparent rounded-full blur-2xl"
        variants={floatVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-[#3A7FD5]/10 to-transparent rounded-full blur-2xl"
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Copy */}
          <motion.div
            className="space-y-10 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F47C6B]/10 to-[#3A7FD5]/10 backdrop-blur-sm rounded-full border border-white/40">
                <span className="w-2 h-2 bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] rounded-full animate-pulse" />
                <span className="text-sm font-medium bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
                  Trusted by 50,000+ patients
                </span>
              </div>
            </motion.div>

            {/* Headline with gradient text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#1E1E1E] leading-[0.95] tracking-tight">
                Find care that{' '}
                <span className="relative inline-block">
                  <motion.span
                    className="bg-gradient-to-r from-[#F47C6B] via-[#3A7FD5] to-[#78B8FF] bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ backgroundSize: '200% 200%' }}
                  >
                    fits you
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#F47C6B] via-[#3A7FD5] to-[#78B8FF] rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl font-light"
              >
                AI-powered matching connects you with the perfect healthcare provider in minutes.{' '}
                <span className="text-[#1E1E1E] font-medium">Real availability. Real results.</span>
              </motion.p>
            </motion.div>
            
            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/book"
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] text-white font-semibold text-lg rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(244,124,107,0.3)] hover:shadow-[0_8px_40px_rgba(244,124,107,0.5)] transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#3A7FD5] to-[#78B8FF]"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/how-it-works"
                  className="px-10 py-5 bg-white/80 backdrop-blur-sm text-[#1E1E1E] font-semibold text-lg rounded-xl border-2 border-[#3A7FD5]/20 hover:border-[#3A7FD5] hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  How it works
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Proof Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 pt-6 border-t border-gray-200/50"
            >
              {[
                { value: '50K+', label: 'Patients' },
                { value: '98%', label: 'Satisfaction' },
                { value: '<2min', label: 'Avg. Match Time' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Premium Search Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Glassmorphic Card with 3D tilt effect */}
            <motion.div
              className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.12)] p-10 border border-white/60"
              style={{
                transformStyle: 'preserve-3d',
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F47C6B]/5 via-transparent to-[#3A7FD5]/5 rounded-3xl" />
              
              <div className="relative space-y-8">
                <div className="space-y-3">
                  <motion.h3
                    className="text-3xl font-bold text-[#1E1E1E]"
                    layoutId="panel-title"
                  >
                    Book an appointment
                  </motion.h3>
                  <p className="text-base text-gray-600 font-light">
                    AI-powered matching in seconds
                  </p>
                </div>

                {/* Symptoms Input with micro-interactions */}
                <motion.div
                  className="space-y-3"
                  whileFocus="focus"
                >
                  <label htmlFor="symptoms" className="text-xs font-semibold text-[#1E1E1E] block tracking-wide uppercase">
                    What brings you in?
                  </label>
                  <motion.input
                    id="symptoms"
                    type="text"
                    placeholder="e.g., Annual checkup, headache, knee pain..."
                    className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#3A7FD5]/50 focus:border-[#3A7FD5] focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-400"
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {/* Insurance Dropdown */}
                <motion.div
                  className="space-y-3"
                  whileFocus="focus"
                >
                  <label htmlFor="insurance" className="text-xs font-semibold text-[#1E1E1E] block tracking-wide uppercase">
                    Insurance
                  </label>
                  <motion.select
                    id="insurance"
                    className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#3A7FD5]/50 focus:border-[#3A7FD5] focus:bg-white outline-none transition-all duration-300 appearance-none cursor-pointer"
                    whileFocus={{ scale: 1.01 }}
                  >
                    <option>Select your insurance</option>
                    <option>Blue Cross Blue Shield</option>
                    <option>Aetna</option>
                    <option>UnitedHealthcare</option>
                    <option>Cigna</option>
                    <option>Other</option>
                    <option>No insurance</option>
                  </motion.select>
                </motion.div>

                {/* Location & Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-3"
                    whileFocus="focus"
                  >
                    <label htmlFor="location" className="text-xs font-semibold text-[#1E1E1E] block tracking-wide uppercase">
                      Location
                    </label>
                    <motion.input
                      id="location"
                      type="text"
                      placeholder="City or ZIP"
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#3A7FD5]/50 focus:border-[#3A7FD5] focus:bg-white outline-none transition-all duration-300 placeholder:text-gray-400"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    whileFocus="focus"
                  >
                    <label htmlFor="date" className="text-xs font-semibold text-[#1E1E1E] block tracking-wide uppercase">
                      Date
                    </label>
                    <motion.input
                      id="date"
                      type="date"
                      className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#3A7FD5]/50 focus:border-[#3A7FD5] focus:bg-white outline-none transition-all duration-300"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>
                </div>

                {/* Premium Search Button */}
                <motion.button
                  className="group relative w-full px-8 py-5 bg-gradient-to-r from-[#3A7FD5] to-[#78B8FF] text-white font-bold text-lg rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(58,127,213,0.3)] hover:shadow-[0_12px_40px_rgba(58,127,213,0.4)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                  >
                    Find Your Perfect Match
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
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 font-medium">
                    HIPAA Compliant • Secure Booking
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#F47C6B] to-[#3A7FD5] rounded-2xl opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-[#3A7FD5] to-[#78B8FF] rounded-full opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
