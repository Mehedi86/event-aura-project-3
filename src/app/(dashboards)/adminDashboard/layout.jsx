'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaCalendarCheck, FaUser, FaCog, FaChartBar, FaTools } from 'react-icons/fa';

export default function AdminDashboardLayout({ children }) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-12">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto bg-gray-50 border-r p-6 pt-20 md:pt-36 w-64 md:w-full flex flex-col items-center transform transition-transform duration-300 z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Profile */}
        <div className="text-center mb-8">
          <h2 className="mt-4 font-semibold">{session?.user?.name || 'Admin User'}</h2>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="space-y-2">
            <NavItem href="/dashboard/admin/users" icon={<FaUser />} text="Manage Users" />
            <NavItem href="/dashboard/admin/bookings" icon={<FaCalendarCheck />} text="Manage Bookings" />
            <NavItem href="/dashboard/admin/events" icon={<FaCog />} text="Manage Events" />
            <NavItem href="/dashboard/admin/reports" icon={<FaChartBar />} text="Reports & Analytics" />
            <NavItem href="/dashboard/admin/settings" icon={<FaTools />} text="Site Settings" />
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:col-span-9 p-6 pt-24 md:pt-24">{children}</main>
    </div>
  );
}

function NavItem({ href, icon, text }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 transition"
      >
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
}

