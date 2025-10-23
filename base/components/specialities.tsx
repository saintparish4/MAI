'use client';

import React from 'react';
import Link from 'next/link';

interface Specialty {
  id: string;
  name: string;
  icon: string; // Placeholder for icon path
  color: string;
}

const specialties: Specialty[] = [
  {
    id: 'primary-care',
    name: 'Primary Care',
    icon: '/icons/primary-care.svg',
    color: 'bg-yellow-100'
  },
  {
    id: 'dentist',
    name: 'Dentist',
    icon: '/icons/dentist.svg',
    color: 'bg-blue-100'
  },
  {
    id: 'obgyn',
    name: 'OB-GYN',
    icon: '/icons/obgyn.svg',
    color: 'bg-pink-100'
  },
  {
    id: 'dermatologist',
    name: 'Dermatologist',
    icon: '/icons/dermatologist.svg',
    color: 'bg-orange-100'
  },
  {
    id: 'psychiatrist',
    name: 'Psychiatrist',
    icon: '/icons/psychiatrist.svg',
    color: 'bg-purple-100'
  },
  {
    id: 'eye-doctor',
    name: 'Eye Doctor',
    icon: '/icons/eye-doctor.svg',
    color: 'bg-green-100'
  }
];

export default function Specialities() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Top-searched specialties
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.map((specialty) => (
            <Link
              key={specialty.id}
              href={`/providers?specialty=${specialty.id}`}
              className={`${specialty.color} rounded-xl p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                {/* Placeholder for icon - replace with actual icon component */}
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600">Icon</span>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {specialty.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
