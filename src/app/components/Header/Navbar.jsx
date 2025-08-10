'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaOpencart } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Navbar() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsHomePage(pathname === '/');
    setScrolled(false); // reset scroll state when changing route
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) return; // only add scroll listener on homepage

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Determine navbar classes
  let navbarClasses = '';
  if (isHomePage && !scrolled) {
    navbarClasses = 'absolute top-0 w-full z-50'; // home top: transparent
  } else {
    navbarClasses = 'fixed top-0 w-full z-50 bg-neutral-900'; // fixed + dark bg
  }

  const navItems = () => (
    <ul className='flex gap-4'>
      <li className='hover:scale-110 transition duration-200 cursor-pointer'>Dashboard</li>
      <li className='hover:scale-110 transition duration-200 cursor-pointer'>Events</li>
      <li className='hover:scale-110 transition duration-200 cursor-pointer'>Search</li>
      <Link href="/gallary" className='hover:scale-110 transition duration-200 cursor-pointer'>Gallery</Link>
      <Link href="/contact" className='hover:scale-110 transition duration-200 cursor-pointer'>Contact</Link>
    </ul>
  );

  return (
    <div className={navbarClasses}>
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
      <div className={`text-white py-3 transition-all duration-300 ease-in-out`}>
        <div className='w-11/12 lg:w-4/5 mx-auto flex justify-between items-center py-4 px-2 border-b-2 border-neutral-50'>
          <Link href='/'><h1 className='text-3xl font-bold tracking-wide'>EventAura</h1></Link>
          <div className='flex items-center gap-6'>
            {navItems()}
            <div className='flex items-center gap-6 px-4 py-1 rounded-full border border-white'>
              <span className='text-lg'>0</span>
              <FaOpencart size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
