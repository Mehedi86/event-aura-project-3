'use client';

import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref}
      className="relative w-full min-h-[400px] sm:min-h-[350px] md:min-h-[300px] overflow-hidden text-white"
    >
      {/* Background image */}
      <Image
        src="/img/stats/stats.jpg"
        alt="stats background"
        fill
        priority
        className="object-cover w-full h-full"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-neutral-700 to-neutral-950 opacity-90"></div>

      {/* Stats content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Stat 1 */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {inView && <CountUp end={598} duration={2} />}
            </h2>
            <div className="my-4 sm:my-6 w-16 sm:w-20 h-0.5 bg-white mx-auto" />
            <p className="uppercase text-sm sm:text-base md:text-lg tracking-widest">
              Events Organized
            </p>
          </div>

          {/* Stat 2 */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {inView && <CountUp end={16173} duration={2.5} separator="," />}
            </h2>
            <div className="my-4 sm:my-6 w-16 sm:w-20 h-0.5 bg-white mx-auto" />
            <p className="uppercase text-sm sm:text-base md:text-lg tracking-widest">
              Active Users
            </p>
          </div>

          {/* Stat 3 */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {inView && <CountUp end={136874} duration={3} separator="," />}
            </h2>
            <div className="my-4 sm:my-6 w-16 sm:w-20 h-0.5 bg-white mx-auto" />
            <p className="uppercase text-sm sm:text-base md:text-lg tracking-widest">
              Tickets Sold
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
