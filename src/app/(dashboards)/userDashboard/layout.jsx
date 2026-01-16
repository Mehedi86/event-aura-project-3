'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendarCheck, FaUser, FaCog } from 'react-icons/fa';

export default function UserDashboardLayout({ children }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const closeDrawer = () => {
    const drawer = document.getElementById("user-drawer");
    if (drawer) drawer.checked = false;
  };

  const navLinks = [
    { href: "/userDashboard/yourBookings", icon: <FaCalendarCheck />, label: "Your Bookings" },
    { href: "/userDashboard/yourInfo", icon: <FaUser />, label: "Your Information" },
    { href: "/userDashboard/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="pt-[94px] lg:pt-[137px] drawer lg:drawer-open min-h-screen">
      <input id="user-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="w-full navbar bg-base-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="user-drawer" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">User Dashboard</div>
        </div>

        <main className="p-6 pt-12 lg:pt-6">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="user-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="pt-[200px] md:pt-[150px] lg:pt-[20] menu bg-base-200 text-base-content min-h-full w-80 p-6">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="avatar mb-4">
              <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={session?.user?.image || '/img/user/userIcon.png'}
                  alt={session?.user?.name || 'User'}
                />
              </div>
            </div>
            <h2 className="mt-2 font-semibold">{session?.user?.name || 'User'}</h2>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
            <span className="badge badge-info badge-sm mt-2">
              {session?.user?.role?.toUpperCase() || 'USER'}
            </span>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            {navLinks.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-content font-semibold'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
