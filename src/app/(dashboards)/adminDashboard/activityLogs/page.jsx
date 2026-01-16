'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload, FaClock, FaUser, FaCalendarCheck, FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadActivityLogs();
  }, []);

  const loadActivityLogs = async () => {
    try {
      // In a real app, this would fetch from an activity logs API
      // For now, we'll simulate with local storage or generate sample data
      const sampleLogs = [
        {
          _id: '1',
          action: 'booking_approved',
          user: 'Admin User',
          target: 'Event Booking #123',
          details: 'Approved booking for "Summer Festival"',
          timestamp: new Date().toISOString(),
        },
        {
          _id: '2',
          action: 'user_deleted',
          user: 'Admin User',
          target: 'User Account',
          details: 'Deleted user: john.doe@example.com',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          _id: '3',
          action: 'event_created',
          user: 'Admin User',
          target: 'New Event',
          details: 'Created event: "Tech Conference 2024"',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          _id: '4',
          action: 'booking_rejected',
          user: 'Admin User',
          target: 'Event Booking #122',
          details: 'Rejected booking for "Wedding Ceremony"',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
        },
        {
          _id: '5',
          action: 'user_role_updated',
          user: 'Admin User',
          target: 'User Account',
          details: 'Updated role for user@example.com to admin',
          timestamp: new Date(Date.now() - 14400000).toISOString(),
        },
      ];

      setLogs(sampleLogs);
    } catch (error) {
      toast.error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    const icons = {
      booking_approved: <FaCalendarCheck className="text-success" />,
      booking_rejected: <FaCalendarCheck className="text-error" />,
      user_deleted: <FaTrash className="text-error" />,
      user_role_updated: <FaUser className="text-info" />,
      event_created: <FaEdit className="text-primary" />,
      event_updated: <FaEdit className="text-warning" />,
      event_deleted: <FaTrash className="text-error" />,
    };
    return icons[action] || <FaClock className="text-gray-500" />;
  };

  const getActionBadge = (action) => {
    const badges = {
      booking_approved: 'badge-success',
      booking_rejected: 'badge-error',
      user_deleted: 'badge-error',
      user_role_updated: 'badge-info',
      event_created: 'badge-primary',
      event_updated: 'badge-warning',
      event_deleted: 'badge-error',
    };
    return badges[action] || 'badge-ghost';
  };

  const formatAction = (action) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Action', 'User', 'Target', 'Details'];
    const rows = filteredLogs.map(log => [
      new Date(log.timestamp).toLocaleString(),
      formatAction(log.action),
      log.user,
      log.target,
      log.details,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Activity logs exported to CSV');
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    
    const matchesDate = !dateFilter || (log.timestamp &&
      new Date(log.timestamp).toISOString().split('T')[0] === dateFilter);
    
    return matchesSearch && matchesAction && matchesDate;
  });

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
        <h1 className="text-3xl font-bold text-gray-800">Activity Logs</h1>
        <button onClick={exportToCSV} className="btn btn-outline gap-2">
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-primary" />
            <h2 className="card-title text-lg">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Actions</option>
              <option value="booking_approved">Booking Approved</option>
              <option value="booking_rejected">Booking Rejected</option>
              <option value="user_deleted">User Deleted</option>
              <option value="user_role_updated">User Role Updated</option>
              <option value="event_created">Event Created</option>
              <option value="event_updated">Event Updated</option>
              <option value="event_deleted">Event Deleted</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Filter by date"
            />
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className="card bg-base-200 shadow-lg">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>User</th>
                  <th>Target</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No activity logs found
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-gray-400" />
                          <span className="text-sm">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span className={`badge ${getActionBadge(log.action)}`}>
                            {formatAction(log.action)}
                          </span>
                        </div>
                      </td>
                      <td className="font-medium">{log.user}</td>
                      <td>{log.target}</td>
                      <td className="text-sm text-gray-600">{log.details}</td>
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
