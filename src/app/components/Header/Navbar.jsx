'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaOpencart, FaBars, FaTimes } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Navbar() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsHomePage(pathname === '/');
    setScrolled(false);
    setMenuOpen(false); // close menu on route change
  }, [pathname]);

  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  let navbarClasses = '';
  if (isHomePage && !scrolled) {
    navbarClasses = 'absolute top-0 w-full z-50';
  } else {
    navbarClasses = 'fixed top-0 w-full z-50 bg-neutral-900';
  }

  const navLinks = (
    <>
      {status === 'authenticated' && session?.user?.role === 'user' && (
        <>
          <Link href="/bookEvent" className='hover:scale-110 transition duration-200'>Book An Event</Link>
          <Link href="/userDashboard/yourBookings" className='hover:scale-110 transition duration-200'>Dashboard</Link>
        </>
      )}
      {status === 'authenticated' && session?.user?.role === 'admin' && (
        <Link href="/adminDashboard/manageUser" className='hover:scale-110 transition duration-200'>A Dashboard</Link>
      )}
      <Link href="/events" className='hover:scale-110 transition duration-200'>Events</Link>
      <Link href="/search" className='hover:scale-110 transition duration-200'>Search</Link>
      <Link href="/gallary" className='hover:scale-110 transition duration-200'>Gallery</Link>
      <Link href="/contact" className='hover:scale-110 transition duration-200'>Contact</Link>
    </>
  );

  return (
    <div className={navbarClasses}>
      {/* Top Info Bar */}
      <div className='bg-neutral-700 py-2'>
        <div className='w-11/12 lg:w-4/5 mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-white px-4 gap-2 sm:gap-0'>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-6 text-center sm:text-left'>
            <p className='flex items-center gap-1'><FaPhoneAlt size={14} className='text-orange-500' /> +1 (322) 233-3243-434</p>
            <p className='flex items-center gap-1'><IoMdMail size={16} className='text-orange-500' /> event-aura@gmail.com</p>
          </div>
          <div>
            {status === 'authenticated' ? (
              <div className='flex items-center'>
                <Image src={session?.user?.image || "/img/user/userIcon.png"} width={25} height={25} alt='user' className='rounded-full' />
                <button onClick={() => signOut()} className='text-gray-300 pl-2 hover:underline'>Logout</button>
              </div>
            ) : (
              <>
                <Link href="/login" className='text-orange-400 hover:underline px-2'>Login</Link>
                <Link href="/register" className='text-gray-300 border-l-2 border-gray-500 pl-2 hover:underline'>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className='text-white py-3 transition-all duration-300 ease-in-out'>
        <div className='w-11/12 lg:w-4/5 mx-auto flex justify-between items-center py-4 px-2 border-b-2 border-neutral-50'>
          <Link href='/'><h1 className='text-3xl font-bold tracking-wide'>EventAura</h1></Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-6'>
            <ul className='flex gap-4'>{navLinks}</ul>
            <div className='flex items-center gap-6 px-4 py-1 rounded-full border border-white'>
              <span className='text-lg'>0</span>
              <FaOpencart size={24} />
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className='md:hidden'>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className='md:hidden bg-neutral-800 px-4 py-4'>
            <ul className='flex flex-col gap-4'>{navLinks}</ul>
            <div className='flex items-center gap-6 px-4 py-2 mt-4 rounded-full border border-white'>
              <span className='text-lg'>0</span>
              <FaOpencart size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
