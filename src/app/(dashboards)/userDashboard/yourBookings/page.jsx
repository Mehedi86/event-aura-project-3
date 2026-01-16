'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle, FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function YourBookings() {
  const [yourBookings, setYourBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const loadData = async () => {
      try {
        const res = await fetch('/api/yourBookings', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch');
        const bookings = await res.json();
        setYourBookings(
          bookings.filter(booking => booking.organizer?.email === session.user.email)
        );
      } catch (err) {
        toast.error('Failed to load bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [session, status]);

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'badge-warning',
      Approved: 'badge-success',
      Rejected: 'badge-error',
    };
    return styles[status] || 'badge-ghost';
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Bookings</h1>

      {yourBookings.length === 0 ? (
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body text-center py-12">
            <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Bookings Yet</h2>
            <p className="text-gray-500 mb-6">You haven't made any event bookings yet.</p>
            <a href="/bookEvent" className="btn btn-primary">
              Book Your First Event
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="stat bg-base-200 rounded-lg shadow">
              <div className="stat-title">Total Bookings</div>
              <div className="stat-value text-primary">{yourBookings.length}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg shadow">
              <div className="stat-title">Approved</div>
              <div className="stat-value text-success">
                {yourBookings.filter((b) => b.bookingStatus === 'Approved').length}
              </div>
            </div>
            <div className="stat bg-base-200 rounded-lg shadow">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-warning">
                {yourBookings.filter((b) => b.bookingStatus === 'Pending').length}
              </div>
            </div>
          </div>

          {/* Bookings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yourBookings.map((booking) => (
              <div key={booking._id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="card-title text-lg">{booking.proposedEventName}</h2>
                    <span className={`badge ${getStatusBadge(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-primary" />
                      <span>
                        {booking.proposedEventDate
                          ? new Date(booking.proposedEventDate).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-primary" />
                      <span>{booking.proposedEventTime || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-primary" />
                      <span className="truncate">{booking.venue || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaInfoCircle className="text-primary" />
                      <span className="badge badge-outline">{booking.eventCategory}</span>
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="btn btn-sm btn-primary gap-2"
                    >
                      <FaEye /> View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
                    <p className="text-gray-700">
                      <span className="badge badge-outline">{selectedBooking.eventCategory}</span>
                    </p>
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
                  <div className="col-span-2">
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
