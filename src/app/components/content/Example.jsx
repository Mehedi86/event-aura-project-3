'use client';
import React from 'react';
import { IoPlayCircleOutline } from "react-icons/io5";

export default function ParallaxSection() {
    return (
        <div className="h-[800px] bg-fixed bg-center bg-cover bg-no-repeat example">

            {/* Content */}
            <div className="flex flex-col items-center justify-center text-white text-center   bg-black/60 z-10 h-[400px] py-12">
                <h2 className="text-4xl md:text-5xl font-bold">LIVE THERE</h2>
                <p className="mt-4 max-w-xl text-lg">
                    Book events from anywhere in Bangladesh and get awesome experience.
                </p>
                <button className="font-bold my-6 text-gray-300">
                    <IoPlayCircleOutline size={60} />
                </button>
            </div>
            <div className='bg-white w-full h-[200px]'>

            </div>
        </div>
    );
}
