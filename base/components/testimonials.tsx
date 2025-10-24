'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient',
    avatar: 'SJ',
    quote: 'Nora made it so easy to find a great doctor near me. I got an appointment the same day!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Patient',
    avatar: 'MC',
    quote: 'The AI matching was spot-on. Found the perfect specialist for my needs without endless searching.',
    rating: 5
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    role: 'Provider',
    avatar: 'ER',
    quote: 'As a provider, Nora has reduced our no-shows by 40%. The automated reminders are a game-changer.',
    rating: 5
  },
  {
    id: 4,
    name: 'James Patterson',
    role: 'Patient',
    avatar: 'JP',
    quote: 'Finally, healthcare that feels modern. Booking appointments is as easy as ordering food.',
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(4px)'
    })
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#F47C6B]/10 to-[#3A7FD5]/10 backdrop-blur-sm rounded-full border border-white/40 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
            What people are saying
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients and providers
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                filter: { duration: 0.3 }
              }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 md:p-14 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/60"
            >
              {/* Rating Stars */}
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-6 h-6 text-[#F47C6B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl text-gray-700 font-light italic text-center mb-10 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Profile */}
              <div className="flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#F47C6B] to-[#3A7FD5] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {testimonials[currentIndex].avatar}
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-[#1E1E1E] text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-[#3A7FD5] focus:ring-offset-2"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-[#3A7FD5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-[#3A7FD5] focus:ring-offset-2"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6 text-[#3A7FD5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3A7FD5] focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] w-10'
                  : 'bg-gray-300 hover:bg-gray-400 w-3'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
