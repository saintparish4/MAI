'use client';

import React from 'react';
import Image from 'next/image';

interface DoctorCardProps {
  id: string;
  name: string;
  credentials: string;
  role: string;
  location: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  nextAvailable: string;
  badge?: string;
  profileImage?: string;
}

export default function DoctorCard({
  id,
  name,
  credentials,
  role,
  location,
  rating,
  reviewCount,
  tagline,
  nextAvailable,
  badge,
  profileImage
}: DoctorCardProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-4">
        {/* Profile Photo and Basic Info */}
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={`${name} profile`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-medium">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {name}
            </h3>
            <p className="text-sm text-gray-600">{credentials}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </div>

        {/* Rating */}
        <div className="flex items-center text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-gray-900">{rating}</span>
            <span className="text-gray-500 ml-1">· {reviewCount.toLocaleString()} reviews</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray-600">{tagline}</p>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {badge}
          </div>
        )}

        {/* Availability */}
        <div className="text-sm text-gray-600">
          Next available on {nextAvailable}
        </div>

        {/* CTA Button */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
          Book online
        </button>
      </div>
    </div>
  );
}

