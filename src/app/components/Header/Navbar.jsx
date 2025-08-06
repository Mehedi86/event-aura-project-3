import Link from 'next/link';
import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Navbar() {
    return (
        <div className='w-2/3 mx-auto'>
            <div className='bg-neutral-700 flex justify-between items-center px-4'>
                {/* left content */}
                <div className='flex gap-4 p-2'>
                    <p className='flex items-center gap-2'><FaPhoneAlt size={16} className='text-orange-600' /> <span className='text-white'>+1 (322) 233-3243-434</span></p>
                    <p className='flex items-center gap-2'><IoMdMail size={20} className='text-orange-600' /><span className='text-white'>EventAura@gmail.com</span></p>
                </div>
                {/* right content */}
                <div>
                    <Link href={"/login"} className='text-orange-500 px-2
                    '>Login</Link>
                    <Link href={"register"} className='text-gray-400 border-l-2 px-2'>Register</Link>
                </div>
            </div>
        </div>
    )
}
