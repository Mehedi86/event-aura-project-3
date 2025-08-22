'use client'

import React from 'react'
import Image from 'next/image'

export default function NewsCard({ news }) {
  return (
    <div className="w-full flex flex-col md:flex-row rounded overflow-hidden bg-white my-10">
      {/* Image Section */}
      <div className="w-full md:w-1/3">
        <Image
          className="w-full h-60 md:h-full object-cover"
          src={news.thumbnail}
          alt="news reference img"
          width={500}
          height={330}
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-2/3 px-12 py-2 flex flex-col justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
            {news.eventName}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {news.date} | {news.author || "Unknown Author"}
          </p>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-5">
            {news.newsBody}
          </p>
        </div>

        {/* Read More Button */}
        <div className="mt-4">
          <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm md:text-base transition">
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}
