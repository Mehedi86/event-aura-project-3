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
            <div className='bg-white w-full h-[100px] flex justify-center items-center'>
                <div className='w-1/3 mx-auto flex gap-6 text-xl font-bold text-neutral-400'>
                    {division.map((d, i) => <h1 className='text-center' key={i}>{d}</h1>)}
                </div>
            </div>
            <div className="relative w-full h-[250px] bg-center bg-cover bg-no-repeat bg-[url('/img/banner/subbanner.jpg')] text-white">
                <div className='absolute inset-0 bg-orange-500/80'>
                    <div className='w-1/3 mx-auto text-center my-12 space-y-3'>
                        <h1 className='font-bold text-lg'>Stay Up to date With Your Favorite Events!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                        <div className='space-x-2'>
                            <input
                                className="w-[250px] py-2 border border-white rounded-3xl text-white text-sm px-4 placeholder-white"
                                type="text"
                                placeholder="Your Email Address"
                            />
                            <button className='bg-white text-sm px-6 py-2 rounded-3xl font-bold text-orange-500'>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
