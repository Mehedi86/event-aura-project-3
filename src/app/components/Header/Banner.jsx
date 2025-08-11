'use client';

import Image from 'next/image';
import { Search } from 'lucide-react';

export default function Banner() {
  return (
    <div className="relative w-full h-[calc(100vh-100px)]">
      {/* Background image */}
      <Image
        src="/img/banner/banner.jpg"
        alt="Banner"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-20"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4 pt-36 md:pt-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Make Your Dream Come True
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Meet your favorite artists, sport teams and parties
        </p>

        {/* Search Box */}
        <div className="flex items-center w-full max-w-xl bg-white rounded-full overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Search Artist, Team, or Venue"
            className="flex-grow px-6 py-3 text-black focus:outline-none"
          />
          <div className="px-4 text-orange-500">
            <Search size={24} />
          </div>
        </div>

        {/* Location */}
        <div className="mt-6 text-sm">
          <span className="flex items-center gap-1 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C8.13 2 5 5.13 5 9c0 4.418 7 13 7 13s7-8.582 7-13c0-3.87-3.13-7-7-7z"
              />
            </svg>
            <span>Dhaka, Bangladesh</span>
            <button className="ml-2 underline text-sm">Change Location</button>
          </span>
        </div>
      </div>
    </div>
  );
}
