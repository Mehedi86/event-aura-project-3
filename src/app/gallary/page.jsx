"use client";

import React from "react";

const Page = () => {
  const images = [
    "/img/recent/recent1.jpg",
    "/img/recent/recent2.jpeg",
    "/img/recent/recent3.jfif",
    "/img/recent/recent4.png",
    "/img/recent/dhaka.jpg",
    "/img/categories/wedding.jpg",
  ];

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto min-h-screen px-6 py-40 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">View</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
