'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { FaCalendarCheck, FaUser, FaCog, FaChartBar, FaTools } from 'react-icons/fa';

export default function AdminDashboardLayout({ children }) {
  const { data: session } = useSession();

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <aside className="hidden col-span-3 border-r bg-gray-50 p-6 lg:flex flex-col items-center pt-36">
        {/* Profile */}
        <div className="text-center mb-8">
          
          <h2 className="mt-4 font-semibold">{session?.user?.name || 'Admin User'}</h2>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="space-y-2">
            {/* Manage Users */}
            <li>
              <Link
                href="/adminDashboard/manageUser"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaUser />
                <span>Manage Users</span>
              </Link>
            </li>

            {/* Manage Bookings */}
            <li>
              <Link
                href="/adminDashboard/manageBookings"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaCalendarCheck />
                <span>Manage Bookings</span>
              </Link>
            </li>

            {/* Manage Events */}
            <li>
              <Link
                href="/adminDashboard/manageEvents"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaCog />
                <span>Manage Events</span>
              </Link>
            </li>

            {/* Reports & Analytics */}
            <li>
              <Link
                href="/adminDashboard/analytics"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaChartBar />
                <span>Reports & Analytics</span>
              </Link>
            </li>

            {/* Site Settings */}
            <li>
              <Link
                href="/adminDashboard/siteSettings"
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                <FaTools />
                <span>Site Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 lg:col-span-9 p-6 pt-24">{children}</main>
    </div>
  );
}
