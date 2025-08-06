import Image from 'next/image';
import React from 'react';

export default function CategoryBox({ category }) {
    const { id, name, bgColor, img } = category;
    return (
        <div className="relative w-full h-60 rounded overflow-hidden">
            {/* Background image */}
            <Image
                src={img}
                alt="sports"
                fill
                priority
                className="object-cover w-full h-full"
            />

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${bgColor}`}></div>

            {/* Centered text */}
            <div className="relative flex items-center justify-center h-full">
                <h2 className="text-white text-xl font-semibold">{name}</h2>
            </div>
        </div>
    );
}

