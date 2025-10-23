'use client';

import React from 'react';
import DoctorCard from './doctor-card';

const dentistsShortWait = [
  {
    id: '1',
    name: 'Dr. Lisa Thompson',
    credentials: 'DDS',
    role: 'Dentist',
    location: 'San Francisco, CA',
    rating: 4.75,
    reviewCount: 432,
    tagline: 'Same-day appointments · Emergency care available',
    nextAvailable: 'Today, 2:30 PM',
    badge: 'Shortest wait time',
    profileImage: '/images/dentists/thompson.jpg'
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    credentials: 'DDS',
    role: 'Dentist',
    location: 'Oakland, CA',
    rating: 4.82,
    reviewCount: 678,
    tagline: 'Family dentistry · Weekend hours',
    nextAvailable: 'Tomorrow, 9:00 AM',
    badge: 'Excellent wait time',
    profileImage: '/images/dentists/wilson.jpg'
  },
  {
    id: '3',
    name: 'Dr. Maria Garcia',
    credentials: 'DDS',
    role: 'Dentist',
    location: 'Berkeley, CA',
    rating: 4.78,
    reviewCount: 521,
    tagline: 'Cosmetic dentistry specialist · Bilingual',
    nextAvailable: 'Mon, Oct 27',
    profileImage: '/images/dentists/garcia.jpg'
  },
  {
    id: '4',
    name: 'Dr. David Kim',
    credentials: 'DDS',
    role: 'Dentist',
    location: 'San Jose, CA',
    rating: 4.85,
    reviewCount: 389,
    tagline: 'Pediatric dentistry · Gentle care',
    nextAvailable: 'Tue, Oct 28',
    badge: 'Highly recommended',
    profileImage: '/images/dentists/kim.jpg'
  }
];

export default function DentistsShortWait() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dentists with the shortest wait time
            </h2>
            <p className="text-lg text-gray-600">
              Book your dental appointment with minimal waiting
            </p>
          </div>
          <a 
            href="/providers?specialty=dentist"
            className="text-[#CC342D] font-semibold hover:text-[#9B2226] transition-colors"
          >
            See all (300+)
          </a>
        </div>

        {/* Horizontal scrollable carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {dentistsShortWait.map((dentist) => (
            <DoctorCard key={dentist.id} {...dentist} />
          ))}
        </div>
      </div>
    </section>
  );
}

