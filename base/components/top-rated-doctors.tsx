'use client';

import React from 'react';
import DoctorCard from './doctor-card';

const topRatedDoctors = [
  {
    id: '1',
    name: 'Dr. Michele Martinho',
    credentials: 'MD',
    role: 'Primary Care Doctor',
    location: 'San Francisco, CA',
    rating: 4.88,
    reviewCount: 1294,
    tagline: 'New patient appointments · Highly recommended',
    nextAvailable: 'Tue, Oct 28',
    badge: 'Excellent wait time',
    profileImage: '/images/doctors/martinho.jpg'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    credentials: 'MD',
    role: 'Primary Care Doctor',
    location: 'Los Angeles, CA',
    rating: 4.92,
    reviewCount: 856,
    tagline: 'Comprehensive care · Patient favorite',
    nextAvailable: 'Wed, Oct 29',
    badge: 'Highly recommended',
    profileImage: '/images/doctors/johnson.jpg'
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    credentials: 'MD',
    role: 'Primary Care Doctor',
    location: 'San Diego, CA',
    rating: 4.85,
    reviewCount: 1123,
    tagline: 'Same-day appointments available',
    nextAvailable: 'Thu, Oct 30',
    profileImage: '/images/doctors/chen.jpg'
  },
  {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    credentials: 'MD',
    role: 'Primary Care Doctor',
    location: 'San Jose, CA',
    rating: 4.90,
    reviewCount: 967,
    tagline: 'Bilingual care · Family medicine specialist',
    nextAvailable: 'Fri, Oct 31',
    badge: 'Excellent wait time',
    profileImage: '/images/doctors/rodriguez.jpg'
  }
];

export default function TopRatedDoctors() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Top-rated primary care doctors
            </h2>
            <p className="text-lg text-gray-600">
              90% of patients gave these primary care doctors 5 stars
            </p>
          </div>
          <a 
            href="/providers?specialty=primary-care"
            className="text-[#CC342D] font-semibold hover:text-[#9B2226] transition-colors"
          >
            See all (300+)
          </a>
        </div>

        {/* Horizontal scrollable carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {topRatedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}

