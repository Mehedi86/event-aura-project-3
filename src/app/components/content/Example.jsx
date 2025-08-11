'use client';
import React from 'react';
import { IoPlayCircleOutline } from "react-icons/io5";

export default function ParallaxSection() {
    const division = ['DHAKA', 'CHITTAGONG', 'KHULNA', 'RANGPUR', 'SHYLHET', 'BARISHAL']
    return (
        <div className="h-[750px] bg-fixed bg-center bg-cover bg-no-repeat example">

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
            {/* Division Names */}
            <div className='bg-white w-full py-4 flex flex-wrap justify-center items-center h-[150px]'>
                <div className='flex flex-wrap justify-center gap-4 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-neutral-400 px-4'>
                    {division.map((d, i) => (
                        <h1 className='text-center' key={i}>{d}</h1>
                    ))}
                </div>
            </div>
            {/* contact */}
            <div className="relative w-full h-[300px] sm:h-[300px] md:h-[300px] lg:h-[300px] bg-center bg-cover bg-no-repeat bg-[url('/img/banner/subbanner.jpg')] text-white">
                <div className="absolute inset-0 bg-orange-500/80 flex items-center justify-center">
                    <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-1/3 text-center space-y-3 px-4">
                        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                            Stay Up to date With Your Favorite Events!
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                            volutpat.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-2">
                            <input
                                className="w-full sm:w-[250px] py-2 border border-white rounded-3xl text-white text-sm px-4 placeholder-white bg-transparent"
                                type="text"
                                placeholder="Your Email Address"
                            />
                            <button className="bg-white text-sm px-6 py-2 rounded-3xl font-bold text-orange-500 hover:bg-gray-100 transition">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
