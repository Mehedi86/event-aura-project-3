'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarCheck, FaUser, FaCog } from 'react-icons/fa';

export default function UserDashboardLayout({ children }) {
  const { data: session } = useSession();
  const profileImage = session?.user?.image || '/default-avatar.png';

  return (
    <div className="grid grid-cols-12 min-h-screen">

      {/* Sidebar */}
      <aside className="col-span-3 border-r bg-gray-50 p-6 flex flex-col items-center pt-36">
        {/* Profile */}
        <div className="text-center mb-8 ">
          
          <h2 className="mt-4 font-semibold">{session?.user?.name || 'User'}</h2>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="space-y-2">
            <li>
              <Link
                href="/userDashboard/yourBookings"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaCalendarCheck />
                <span>Your Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/userDashboard/yourInfo"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaUser />
                <span>Your Information</span>
              </Link>
            </li>
            <li>
              <Link
                href="/userDashboard/settings"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

      </aside>

      {/* Main Content */}
      <main className="col-span-9 p-6 pt-24">
        {children}
      </main>
    </div>
  );
}
