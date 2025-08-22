import React from 'react';

export default function CategoryBox({ category }) {
  const { name, bgColor, img } = category;
  return (
    <div className="relative w-full h-60 rounded overflow-hidden hover:scale-105 transition duration-300 cursor-pointer">
      {/* Background image */}
      <img
        src={img}
        alt={name}
        className="w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${bgColor}`}></div>

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-xl font-semibold">{name}</h2>
      </div>
    </div>
  );
}
