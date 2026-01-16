'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaCheck, FaTimes, FaTrash, FaDownload, FaCalendarAlt, FaFilter, FaCheckSquare, FaSquare } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'calendar'

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await fetch('/api/yourBookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingStatus: newStatus }),
      });

      if (res.ok) {
        toast.success(`Booking ${newStatus.toLowerCase()} successfully`);
        loadBookings();
      } else {
        toast.error('Failed to update booking');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedBookings.length === 0) {
      toast.error('Please select at least one booking');
      return;
    }

    const result = await Swal.fire({
      title: 'Update Multiple Bookings?',
      text: `Are you sure you want to ${status.toLowerCase()} ${selectedBookings.length} booking(s)?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update them!',
    });

    if (result.isConfirmed) {
      try {
        const promises = selectedBookings.map(id =>
          fetch(`/api/bookings/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingStatus: status }),
          })
        );

        await Promise.all(promises);
        toast.success(`${selectedBookings.length} booking(s) updated successfully`);
        setSelectedBookings([]);
        loadBookings();
      } catch (error) {
        toast.error('Failed to update bookings');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedBookings.length === 0) {
      toast.error('Please select at least one booking');
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Multiple Bookings?',
      text: `Are you sure you want to delete ${selectedBookings.length} booking(s)? This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
    });

    if (result.isConfirmed) {
      try {
        const promises = selectedBookings.map(id =>
          fetch(`/api/bookings/${id}`, { method: 'DELETE' })
        );

        await Promise.all(promises);
        toast.success(`${selectedBookings.length} booking(s) deleted successfully`);
        setSelectedBookings([]);
        loadBookings();
      } catch (error) {
        toast.error('Failed to delete bookings');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Booking deleted successfully');
          loadBookings();
        } else {
          toast.error('Failed to delete booking');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBookings(filteredBookings.map(b => b._id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (id) => {
    setSelectedBookings(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Event Name', 'Organizer', 'Category', 'Date', 'Time', 'Venue', 'Status', 'Request Date'];
    const rows = filteredBookings.map(booking => [
      booking.proposedEventName || '',
      booking.organizer?.fullName || '',
      booking.eventCategory || '',
      booking.proposedEventDate ? new Date(booking.proposedEventDate).toLocaleDateString() : '',
      booking.proposedEventTime || '',
      booking.venue || '',
      booking.bookingStatus || '',
      booking.requestDate ? new Date(booking.requestDate).toLocaleDateString() : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Bookings exported to CSV');
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'badge-warning',
      Approved: 'badge-success',
      Rejected: 'badge-error',
    };
    return styles[status] || 'badge-ghost';
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.proposedEventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.organizer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.organizer?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.bookingStatus === statusFilter;
    
    const matchesDate = !dateFilter || (booking.proposedEventDate && 
      new Date(booking.proposedEventDate).toISOString().split('T')[0] === dateFilter);
    
    const matchesCategory = categoryFilter === 'all' || booking.eventCategory === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesDate && matchesCategory;
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
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
        <div className="flex gap-2">
          <button onClick={exportToCSV} className="btn btn-outline gap-2">
            <FaDownload /> Export CSV
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'table' ? 'calendar' : 'table')}
            className="btn btn-outline gap-2"
          >
            <FaCalendarAlt /> {viewMode === 'table' ? 'Calendar View' : 'Table View'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value text-primary">{bookings.length}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">
            {bookings.filter((b) => b.bookingStatus === 'Pending').length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Approved</div>
          <div className="stat-value text-success">
            {bookings.filter((b) => b.bookingStatus === 'Approved').length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Rejected</div>
          <div className="stat-value text-error">
            {bookings.filter((b) => b.bookingStatus === 'Rejected').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-primary" />
            <h2 className="card-title text-lg">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Categories</option>
              <option value="SPORTS">SPORTS</option>
              <option value="ANNUAL PARTY">ANNUAL PARTY</option>
              <option value="PRODUCT LAUNCH">PRODUCT LAUNCH</option>
              <option value="PRESENTATION">PRESENTATION</option>
              <option value="SEMINAR">SEMINAR</option>
              <option value="WEDDING">WEDDING</option>
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

      {/* Bulk Actions */}
      {selectedBookings.length > 0 && (
        <div className="alert alert-info mb-4">
          <div className="flex-1">
            <span>{selectedBookings.length} booking(s) selected</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkStatusUpdate('Approved')}
              className="btn btn-sm btn-success"
            >
              <FaCheck /> Approve All
            </button>
            <button
              onClick={() => handleBulkStatusUpdate('Rejected')}
              className="btn btn-sm btn-error"
            >
              <FaTimes /> Reject All
            </button>
            <button
              onClick={handleBulkDelete}
              className="btn btn-sm btn-error"
            >
              <FaTrash /> Delete All
            </button>
            <button
              onClick={() => setSelectedBookings([])}
              className="btn btn-sm btn-ghost"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>
                <input
                  type="checkbox"
                  checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                  onChange={handleSelectAll}
                  className="checkbox checkbox-primary"
                />
              </th>
              <th>Event Name</th>
              <th>Organizer</th>
              <th>Category</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking._id)}
                      onChange={() => handleSelectBooking(booking._id)}
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td className="font-semibold">{booking.proposedEventName || 'N/A'}</td>
                  <td>
                    <div>
                      <div className="font-medium">{booking.organizer?.fullName || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{booking.organizer?.email || 'N/A'}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {booking.eventCategory || 'N/A'}
                    </span>
                  </td>
                  <td>
                    {booking.proposedEventDate
                      ? new Date(booking.proposedEventDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>{booking.venue || 'N/A'}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(booking.bookingStatus)}`}>
                      {booking.bookingStatus || 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="btn btn-sm btn-info gap-1"
                      >
                        <FaEye /> View
                      </button>
                      {booking.bookingStatus === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'Approved')}
                            className="btn btn-sm btn-success gap-1"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'Rejected')}
                            className="btn btn-sm btn-error gap-1"
                          >
                            <FaTimes /> Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="btn btn-sm btn-error gap-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Event Name</span>
                    </label>
                    <p className="text-gray-700">{selectedBooking.proposedEventName}</p>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Category</span>
                    </label>
                    <p className="text-gray-700">{selectedBooking.eventCategory}</p>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Date</span>
                    </label>
                    <p className="text-gray-700">
                      {selectedBooking.proposedEventDate
                        ? new Date(selectedBooking.proposedEventDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Time</span>
                    </label>
                    <p className="text-gray-700">{selectedBooking.proposedEventTime || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Venue</span>
                    </label>
                    <p className="text-gray-700">{selectedBooking.venue}</p>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Status</span>
                    </label>
                    <span className={`badge ${getStatusBadge(selectedBooking.bookingStatus)}`}>
                      {selectedBooking.bookingStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Organizer Information</span>
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Name:</strong> {selectedBooking.organizer?.fullName}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {selectedBooking.organizer?.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> {selectedBooking.organizer?.phone || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> {selectedBooking.organizer?.address || 'N/A'}
                    </p>
                  </div>
                </div>
                {selectedBooking.additionalNotes && (
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Additional Notes</span>
                    </label>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {selectedBooking.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
