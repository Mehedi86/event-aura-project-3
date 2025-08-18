'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCalendarCheck, FaUser, FaCog, FaChartBar, FaTools } from 'react-icons/fa';

export default function AdminDashboardLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const closeDrawer = () => {
    const drawer = document.getElementById("admin-drawer");
    if (drawer) drawer.checked = false; // ✅ uncheck drawer
  };

  const navLinks = [
    { href: "/adminDashboard/manageUser", icon: <FaUser />, label: "Manage Users" },
    { href: "/adminDashboard/manageBookings", icon: <FaCalendarCheck />, label: "Manage Bookings" },
    { href: "/adminDashboard/manageEvents", icon: <FaCog />, label: "Manage Events" },
    { href: "/adminDashboard/analytics", icon: <FaChartBar />, label: "Reports & Analytics" },
    { href: "/adminDashboard/siteSettings", icon: <FaTools />, label: "Site Settings" },
  ];

  return (
    <div className="pt-[191px] md:pt-[137px] drawer lg:drawer-open min-h-screen">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="w-full navbar bg-base-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="admin-drawer" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">Admin Dashboard</div>
        </div>

        <main className="p-6 pt-12 lg:pt-6">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="pt-[200px] md:pt-[150px] menu bg-base-200 text-base-content min-h-full w-80 p-6">
          {/* Profile */}
          <div className="text-center mb-8">
            <h2 className="mt-4 font-semibold">{session?.user?.name || 'Admin User'}</h2>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            {navLinks.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  onClick={closeDrawer} // ✅ close drawer after click
                  className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
