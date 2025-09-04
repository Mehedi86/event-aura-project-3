'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

const videoData = [
  {
    title: 'Nike Urban Running Challenge with Kobe 2023',
    youtubeId: 'L_jWHffIx5E',
    thumbnail: '/img/recent/recent1.jpg',
  },
  {
    title: 'Entrepreneurial Think Thank: Shifting the Education Paradigm',
    youtubeId: '3JZ_D3ELwOQ',
    thumbnail: '/img/recent/recent2.jpeg',
  },
  {
    title: 'Southeast Asia Weekend Festival 2023/2024',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/img/recent/recent3.jfif',
  },
  {
    title: 'Envato Author Community Fun Hiking at Semeru Mountaint',
    youtubeId: 'tgbNymZ7vqY',
    thumbnail: '/img/recent/recent4.png',
  },
];

export default function RecentVideos() {
  const [playingIndex, setPlayingIndex] = useState(null);

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto my-20">
      {/* Section Heading */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-5 bg-orange-500 inline-block"></span>
        RECENT VIDEOS
      </h2>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {videoData.map((video, index) => (
          <div key={index}>
            {/* Video Box */}
            <div
              className="relative rounded-md overflow-hidden group h-44 bg-black cursor-pointer"
              onClick={() => setPlayingIndex(index)}
            >
              {playingIndex === index ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <>
                  <img className="w-full h-full object-cover" src={video.thumbnail}/>
                  {/* Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white px-3 py-2 flex justify-between items-center text-sm">
                    <FaPlay className="text-xs" />
                    <span className="font-semibold text-xs">YouTube</span>
                  </div>
                </>
              )}
            </div>

            {/* Title and underline */}
            <p className="mt-3 text-sm text-gray-800 hover:text-orange-500 cursor-pointer leading-5 transition duration-300">
              {video.title}
            </p>
            <div className="w-8 h-[2px] bg-orange-500 mt-2 transition duration-300" />
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-orange-500 text-white px-6 py-10 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/img/banner/subbanner.jpg')] bg-cover bg-center pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold mb-2">
              Share experiences with your friends
            </h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy.
            </p>
          </div>
          <button className="bg-white text-orange-500 font-bold px-8 py-3 rounded-md hover:bg-orange-100 transition">
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
}
