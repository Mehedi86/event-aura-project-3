'use client';

import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendarCheck, FaChartLine, FaDollarSign, FaDownload, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    rejectedBookings: 0,
    totalEvents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [usersRes, bookingsRes, eventsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/yourBookings'),
        fetch('/api/events'),
      ]);

      const users = usersRes.ok ? await usersRes.json() : [];
      const bookings = bookingsRes.ok ? await bookingsRes.json() : [];
      const events = eventsRes.ok ? await eventsRes.json() : [];

      setStats({
        totalUsers: users.length,
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b) => b.bookingStatus === 'Pending').length,
        approvedBookings: bookings.filter((b) => b.bookingStatus === 'Approved').length,
        rejectedBookings: bookings.filter((b) => b.bookingStatus === 'Rejected').length,
        totalEvents: events.length,
      });

      // Get recent bookings (last 5)
      const recent = bookings
        .sort((a, b) => new Date(b.requestDate || 0) - new Date(a.requestDate || 0))
        .slice(0, 5);
      setRecentBookings(recent);

      // Calculate booking trends (last 7 days)
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        const dayBookings = bookings.filter(b => {
          if (!b.requestDate) return false;
          const bookingDate = new Date(b.requestDate);
          bookingDate.setHours(0, 0, 0, 0);
          return bookingDate.getTime() === date.getTime();
        });

        last7Days.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          count: dayBookings.length,
        });
      }
      setBookingTrends(last7Days);

      // Category statistics
      const categoryCounts = {};
      bookings.forEach(booking => {
        const category = booking.eventCategory || 'Unknown';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
      setCategoryStats(categoryCounts);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateApprovalRate = () => {
    if (stats.totalBookings === 0) return 0;
    return ((stats.approvedBookings / stats.totalBookings) * 100).toFixed(1);
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      stats,
      approvalRate: calculateApprovalRate(),
      categoryStats,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const maxTrendValue = Math.max(...bookingTrends.map(t => t.count), 1);

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
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <button onClick={exportReport} className="btn btn-outline gap-2">
          <FaDownload /> Export Report
        </button>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaUsers className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Total Users</div>
          <div className="stat-value text-white">{stats.totalUsers}</div>
        </div>

        <div className="stat bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaCalendarCheck className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Total Bookings</div>
          <div className="stat-value text-white">{stats.totalBookings}</div>
        </div>

        <div className="stat bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaChartLine className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Total Events</div>
          <div className="stat-value text-white">{stats.totalEvents}</div>
        </div>

        <div className="stat bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg">
          <div className="stat-figure text-white opacity-80">
            <FaDollarSign className="text-4xl" />
          </div>
          <div className="stat-title text-white opacity-90">Approval Rate</div>
          <div className="stat-value text-white">{calculateApprovalRate()}%</div>
        </div>
      </div>

      {/* Booking Trends Chart */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Booking Trends (Last 7 Days)</h2>
          <div className="space-y-3">
            {bookingTrends.map((trend, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{trend.date}</span>
                  <span className="text-sm font-medium">{trend.count} bookings</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={trend.count}
                  max={maxTrendValue}
                ></progress>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Bookings by Category</h2>
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = stats.totalBookings > 0 
                ? ((count / stats.totalBookings) * 100).toFixed(1)
                : 0;
              return (
                <div key={category}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{category}</span>
                    <span className="text-sm font-medium">
                      {count} ({percentage}%)
                    </span>
                  </div>
                  <progress
                    className="progress progress-info w-full"
                    value={count}
                    max={stats.totalBookings || 1}
                  ></progress>
                </div>
              );
            })}
            {Object.keys(categoryStats).length === 0 && (
              <p className="text-center text-gray-500 py-4">No category data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-warning">Pending Bookings</h2>
            <p className="text-4xl font-bold text-warning">{stats.pendingBookings}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-warning">Awaiting Review</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-success">Approved Bookings</h2>
            <p className="text-4xl font-bold text-success">{stats.approvedBookings}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-success">Confirmed</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-error">Rejected Bookings</h2>
            <p className="text-4xl font-bold text-error">{stats.rejectedBookings}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-error">Declined</div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status Distribution */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Booking Status Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Approved</span>
                <span className="text-sm font-medium">
                  {stats.approvedBookings} ({calculateApprovalRate()}%)
                </span>
              </div>
              <progress
                className="progress progress-success w-full"
                value={stats.approvedBookings}
                max={stats.totalBookings || 1}
              ></progress>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Pending</span>
                <span className="text-sm font-medium">
                  {stats.pendingBookings} (
                  {stats.totalBookings > 0
                    ? ((stats.pendingBookings / stats.totalBookings) * 100).toFixed(1)
                    : 0}
                  %)
                </span>
              </div>
              <progress
                className="progress progress-warning w-full"
                value={stats.pendingBookings}
                max={stats.totalBookings || 1}
              ></progress>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Rejected</span>
                <span className="text-sm font-medium">
                  {stats.rejectedBookings} (
                  {stats.totalBookings > 0
                    ? ((stats.rejectedBookings / stats.totalBookings) * 100).toFixed(1)
                    : 0}
                  %)
                </span>
              </div>
              <progress
                className="progress progress-error w-full"
                value={stats.rejectedBookings}
                max={stats.totalBookings || 1}
              ></progress>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Organizer</th>
                  <th>Date</th>
                  <th>Status</th>
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
                    <tr key={booking._id}>
                      <td className="font-semibold">{booking.proposedEventName}</td>
                      <td>{booking.organizer?.fullName || booking.organizer?.email}</td>
                      <td>
                        {booking.proposedEventDate
                          ? new Date(booking.proposedEventDate).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            booking.bookingStatus === 'Approved'
                              ? 'badge-success'
                              : booking.bookingStatus === 'Rejected'
                              ? 'badge-error'
                              : 'badge-warning'
                          }`}
                        >
                          {booking.bookingStatus}
                        </span>
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
  );
}
