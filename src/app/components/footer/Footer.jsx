import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white text-sm pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Logo */}
        <div className="py-6 text-center text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">EventAura</h1>
        </div>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Links */}
          <div className="space-y-6">
            <div>
              <span className="font-bold block mb-2">ABOUT</span>
              <div className="flex flex-wrap gap-2 text-gray-300">
                <a href="#" className="hover:underline">Gallery</a>
                <span>|</span>
                <a href="#" className="hover:underline">Register</a>
                <span>|</span>
                <a href="#" className="hover:underline">Upcoming</a>
                <span>|</span>
                <a href="#" className="hover:underline">Artist Page</a>
                <span>|</span>
                <a href="#" className="hover:underline">Blog</a>
              </div>
            </div>

            <div>
              <span className="font-bold block mb-2">CONTACT US</span>
              <div className="flex flex-wrap gap-2 text-gray-300">
                <a href="#" className="hover:underline">Events Search (Legacy)</a>
                <span>|</span>
                <a href="#" className="hover:underline">Events</a>
                <span>|</span>
                <a href="#" className="hover:underline">Select Tickets Maroon 5</a>
                <span>|</span>
                <a href="#" className="hover:underline">Select Ticket Guitar Vibes</a>
              </div>
            </div>

            <div>
              <span className="font-bold block mb-2">STAY CONNECTED</span>
              <div className="flex flex-wrap gap-4 mt-2">
                <a href="#" className="flex items-center gap-1 hover:underline"><FaFacebookF size={20} className="bg-sky-800 p-1 rounded-full" /> Facebook</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaTwitter size={20} className="bg-sky-400 p-1 rounded-full" /> Twitter</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaLinkedinIn size={20} className="bg-sky-600 p-1 rounded-full" /> LinkedIn</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaGoogle size={20} className="bg-red-700 p-1 rounded-full" /> Google</a>
                <a href="#" className="flex items-center gap-1 hover:underline"><FaInstagram size={20} className="bg-rose-400 p-1 rounded-full" /> Instagram</a>
              </div>
            </div>
          </div>

          {/* Right Dashboard */}
          <div className="lg:pl-8 lg:border-l border-gray-700">
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

