'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    patients: [
      { label: 'Find a Provider', href: '/providers' },
      { label: 'Book Appointment', href: '/appointments' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'FAQ', href: '/faq' }
    ],
    providers: [
      { label: 'Join as Provider', href: '/signup?role=provider' },
      { label: 'Provider Dashboard', href: '/providers/dashboard' },
      { label: 'Features', href: '/providers/features' },
      { label: 'Support', href: '/providers/support' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/norahealth',
      icon: (
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/norahealth',
      icon: (
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/norahealth',
      icon: (
        <>
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </>
      )
    }
  ];

  return (
    <footer className="relative bg-[#1E1E1E] text-white overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#3A7FD5]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F47C6B]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-light lowercase mb-4 tracking-wide">nora</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              AI-powered symptom analysis and smart scheduling that connects patients with the right specialists instantly.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              HIPAA Compliant
            </div>
          </motion.div>

          {/* Patients Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white">Patients</h3>
            <ul className="space-y-3">
              {footerLinks.patients.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-[2px] bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] group-hover:w-4 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Providers Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white">Providers</h3>
            <ul className="space-y-3">
              {footerLinks.providers.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-[2px] bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] group-hover:w-4 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-[2px] bg-gradient-to-r from-[#F47C6B] to-[#3A7FD5] group-hover:w-4 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider with gradient */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 Nora Health. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 border-2 border-gray-700 rounded-full flex items-center justify-center hover:border-[#3A7FD5] hover:bg-[#3A7FD5]/10 transition-all duration-300 group"
                aria-label={social.name}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#3A7FD5] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-8 pt-8 border-t border-gray-800 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
