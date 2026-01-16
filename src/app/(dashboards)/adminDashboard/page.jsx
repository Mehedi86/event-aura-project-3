'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaUsers, FaCalendarCheck, FaChartLine, FaDollarSign, 
  FaArrowUp, FaArrowDown, FaClock, FaExclamationTriangle,
  FaCheckCircle, FaTimesCircle, FaEye, FaDownload
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    rejectedBookings: 0,
    totalEvents: 0,
    newUsersToday: 0,
    newBookingsToday: 0,
    approvalRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [usersRes, bookingsRes, eventsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/yourBookings'),
        fetch('/api/events'),
      ]);

      const users = usersRes.ok ? await usersRes.json() : [];
      const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
      const events = eventsRes.ok ? await eventsRes.json() : [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const newUsersToday = users.filter(user => {
        if (!user.createdAt) return false;
        const userDate = new Date(user.createdAt);
        userDate.setHours(0, 0, 0, 0);
        return userDate.getTime() === today.getTime();
      }).length;

      const newBookingsToday = bookings.filter(booking => {
        if (!booking.requestDate) return false;
        const bookingDate = new Date(booking.requestDate);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate.getTime() === today.getTime();
      }).length;

      const approvalRate = bookings.length > 0 
        ? ((bookings.filter(b => b.bookingStatus === 'Approved').length / bookings.length) * 100).toFixed(1)
        : 0;

      setStats({
        totalUsers: users.length,
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b) => b.bookingStatus === 'Pending').length,
        approvedBookings: bookings.filter((b) => b.bookingStatus === 'Approved').length,
        rejectedBookings: bookings.filter((b) => b.bookingStatus === 'Rejected').length,
        totalEvents: events.length,
        newUsersToday,
        newBookingsToday,
        approvalRate: parseFloat(approvalRate),
      });

      // Recent bookings
      const recent = bookings
        .sort((a, b) => new Date(b.requestDate || 0) - new Date(a.requestDate || 0))
        .slice(0, 5);
      setRecentBookings(recent);

      // Recent users
      const recentUsersList = users
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5);
      setRecentUsers(recentUsersList);

      // Upcoming events
      const upcoming = events
        .filter(e => e.date && new Date(e.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'badge-warning',
      Approved: 'badge-success',
      Rejected: 'badge-error',
    };
    return styles[status] || 'badge-ghost';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline gap-2">
            <FaDownload /> Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaUsers className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Total Users</div>
          <div className="stat-value text-white">{stats.totalUsers}</div>
          <div className="stat-desc text-white opacity-75">
            <FaArrowUp className="inline mr-1" />
            {stats.newUsersToday} new today
          </div>
        </div>

        <div className="stat bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaCalendarCheck className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Total Bookings</div>
          <div className="stat-value text-white">{stats.totalBookings}</div>
          <div className="stat-desc text-white opacity-75">
            <FaArrowUp className="inline mr-1" />
            {stats.newBookingsToday} new today
          </div>
        </div>

        <div className="stat bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaChartLine className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Total Events</div>
          <div className="stat-value text-white">{stats.totalEvents}</div>
          <div className="stat-desc text-white opacity-75">
            {stats.pendingBookings} pending review
          </div>
        </div>

        <div className="stat bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaDollarSign className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Approval Rate</div>
          <div className="stat-value text-white">{stats.approvalRate}%</div>
          <div className="stat-desc text-white opacity-75">
            {stats.approvedBookings} approved
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Pending Bookings</div>
                <div className="text-3xl font-bold text-warning">{stats.pendingBookings}</div>
              </div>
              <FaExclamationTriangle className="text-4xl text-warning opacity-50" />
            </div>
            <div className="card-actions justify-end mt-4">
              <Link href="/adminDashboard/manageBookings?status=Pending" className="btn btn-sm btn-warning">
                Review Now
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Approved Bookings</div>
                <div className="text-3xl font-bold text-success">{stats.approvedBookings}</div>
              </div>
              <FaCheckCircle className="text-4xl text-success opacity-50" />
            </div>
            <div className="card-actions justify-end mt-4">
              <Link href="/adminDashboard/manageBookings?status=Approved" className="btn btn-sm btn-success">
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Rejected Bookings</div>
                <div className="text-3xl font-bold text-error">{stats.rejectedBookings}</div>
              </div>
              <FaTimesCircle className="text-4xl text-error opacity-50" />
            </div>
            <div className="card-actions justify-end mt-4">
              <Link href="/adminDashboard/manageBookings?status=Rejected" className="btn btn-sm btn-error">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Bookings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Recent Bookings</h2>
              <Link href="/adminDashboard/manageBookings" className="btn btn-sm btn-ghost">
                View All <FaEye className="ml-2" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Organizer</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No recent bookings
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => (
                      <tr key={booking._id} className="hover">
                        <td className="font-semibold">{booking.proposedEventName}</td>
                        <td className="text-sm">{booking.organizer?.fullName || 'N/A'}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(booking.bookingStatus)}`}>
                            {booking.bookingStatus}
                          </span>
                        </td>
                        <td className="text-sm">
                          {booking.proposedEventDate
                            ? new Date(booking.proposedEventDate).toLocaleDateString()
                            : 'N/A'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Recent Users</h2>
              <Link href="/adminDashboard/manageUser" className="btn btn-sm btn-ghost">
                View All <FaEye className="ml-2" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No recent users
                      </td>
                    </tr>
                  ) : (
                    recentUsers.map((user) => (
                      <tr key={user._id} className="hover">
                        <td className="font-semibold">{user.name || 'N/A'}</td>
                        <td className="text-sm">{user.email}</td>
                        <td>
                          <span className="badge badge-outline">
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td>
                          <Link
                            href="/adminDashboard/manageUser"
                            className="btn btn-xs btn-ghost"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Upcoming Events</h2>
            <Link href="/adminDashboard/manageEvents" className="btn btn-sm btn-ghost">
              View All <FaEye className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                No upcoming events
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event._id} className="card bg-base-100 shadow">
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg">{event.title || 'Untitled Event'}</h3>
                    <p className="text-sm text-gray-600">
                      <FaClock className="inline mr-1" />
                      {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'} at {event.time || 'TBD'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <FaCalendarCheck className="inline mr-1" />
                      {event.venue || 'Venue TBD'}
                    </p>
                    <div className="card-actions justify-end mt-2">
                      <span className={`badge ${event.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {event.status || 'active'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-200 shadow-lg mt-6">
        <div className="card-body">
          <h2 className="card-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/adminDashboard/manageEvents" className="btn btn-outline">
              <FaCalendarCheck className="mr-2" /> Manage Events
            </Link>
            <Link href="/adminDashboard/manageBookings" className="btn btn-outline">
              <FaCheckCircle className="mr-2" /> Review Bookings
            </Link>
            <Link href="/adminDashboard/manageUser" className="btn btn-outline">
              <FaUsers className="mr-2" /> Manage Users
            </Link>
            <Link href="/adminDashboard/analytics" className="btn btn-outline">
              <FaChartLine className="mr-2" /> View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
