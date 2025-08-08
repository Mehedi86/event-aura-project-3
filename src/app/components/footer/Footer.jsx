import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className='py-6'>
            <h1 className='text-4xl'>EventAura</h1>
        </div>
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left Links */}
          <div>
            <div className="mb-4">
              <span className="font-bold">ABOUT</span>
              <span className="ml-4">
                <a href="#" className="hover:underline">Gallery</a> |{' '}
                <a href="#" className="hover:underline">Register</a> |{' '}
                <a href="#" className="hover:underline">Upcoming</a> |{' '}
                <a href="#" className="hover:underline">Artist Page</a> |{' '}
                <a href="#" className="hover:underline">Blog</a>
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold">CONTACT US</span>
              <span className="ml-4">
                <a href="#" className="hover:underline">Events Search (Legacy)</a> |{' '}
                <a href="#" className="hover:underline">Events</a> |{' '}
                <a href="#" className="hover:underline">Select Tickets Maroon 5</a> |{' '}
                <a href="#" className="hover:underline">Select Ticket Guitar Vibes</a>
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold">STAY CONNECTED</span>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="flex items-center gap-1 hover:underline "><FaFacebookF size={20} className='bg-sky-800 p-1'/> Facebook</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaTwitter size={20} className='bg-sky-400 p-1'/> Twitter</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaLinkedinIn size={20} className='bg-sky-600 p-1'/> LinkedIn</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaGoogle size={20} className='bg-red-700 p-1'/> Google</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaInstagram size={20} className='bg-rose-400 p-1'/> Instagram</a>
              </div>
            </div>
          </div>

          {/* Right Dashboard */}
          <div className="mt-8 lg:mt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gray-700">
            <div className="lg:pl-8">
              <span className="font-bold block mb-2">MYTICKET DASHBOARD</span>
              <a href="#" className="block hover:underline mb-1">Contact us</a>
              <a href="#" className="block hover:underline">Subscriber Login</a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400">
          © 2023 MYTICKET.COM. ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
