'use client';

import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    "/img/recent/recent1.jpg",
    "/img/recent/recent2.jpeg",
    "/img/recent/recent3.jfif",
    "/img/recent/recent4.png",
    "/img/recent/dhaka.jpg",
    "/img/recent/event6.jpg",
    "/img/recent/event7.jfif",
    "/img/recent/event8.png",
    "/img/recent/event9.jfif",
    "/img/recent/event10.jpg",
    "/img/recent/event11.webp",
    "/img/recent/event12.jpg",
    "/img/categories/wedding.jpg",
  ];

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto min-h-screen px-6 py-40 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <div className="absolute bottom-2 left-10 text-neutral-200 flex items-center gap-2 z-50">
              <BiSolidLike size={24} className="hover:scale-110 cursor-pointer" />
              <h1 className="font-bold text-xl">10</h1>
            </div>
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

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full lg:h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Page;
