'use client';

import Link from 'next/link';
import React from 'react';
import { FaPhoneAlt, FaOpencart } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Navbar() {
  const navItems = () => {
    return (
      <ul className='flex gap-4 font-semibold'>
        <li className='hover:text-orange-300 cursor-pointer'>Dashboard</li>
        <li className='hover:text-orange-300 cursor-pointer'>Events</li>
        <li className='hover:text-orange-300 cursor-pointer'>Search</li>
        <li className='hover:text-orange-300 cursor-pointer'>Gallery</li>
        <li className='hover:text-orange-300 cursor-pointer'>Contact</li>
      </ul>
    );
  };

  return (
    <div className="absolute top-0 w-full z-50">
      {/* Top Info Bar */}
      <div className='bg-neutral-700 py-2'>
        <div className='w-11/12 lg:w-4/5 mx-auto flex justify-between items-center text-sm text-white px-4'>
          <div className='flex gap-6'>
            <p className='flex items-center gap-1'><FaPhoneAlt size={14} className='text-orange-500' /> +1 (322) 233-3243-434</p>
            <p className='flex items-center gap-1'><IoMdMail size={16} className='text-orange-500' /> event-aura@gmail.com</p>
          </div>
          <div>
            <Link href="/login" className='text-orange-400 hover:underline px-2'>Login</Link>
            <Link href="/register" className='text-gray-300 border-l-2 border-gray-500 pl-2 hover:underline'>Register</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className='text-white py-3 shadow-md'>
        <div className='w-11/12 lg:w-4/5 mx-auto flex justify-between items-center py-4 px-2 border-b-2 border-neutral-50'>
          <h1 className='text-3xl font-bold tracking-wide'>EventAura</h1>
          <div className='flex items-center gap-6'>
            {navItems()}
            <div className='flex items-center gap-2 px-4 py-1 rounded-full border border-white'>
              <span className='text-lg'>0</span>
              <FaOpencart size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
