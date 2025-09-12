'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function YourBookings() {
  const [yourBookings, setYourBookings] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') return; // Wait until session is ready

    const loadData = async () => {
      try {
        const res = await fetch('/api/yourBookings', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch');
        const bookings = await res.json();
        setYourBookings(
          bookings.filter(booking => booking.organizer.email === session.user.email)
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [session, status]);

  if (status === 'loading') {
    return <div className='py-48 text-center'>Loading your bookings...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Bookings</h1>

      {yourBookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {yourBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>{booking.proposedEventName}</td>
                  <td>{booking.eventCategory}</td>
                  <td>{new Date(booking.proposedEventDate).toLocaleDateString()}</td>
                  <td>{booking.proposedEventTime}</td>
                  <td>{booking.venue}</td>
                  <td
                    className={`font-semibold ${
                      booking.bookingStatus === 'Pending'
                        ? 'text-yellow-600'
                        : booking.bookingStatus === 'Approved'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {booking.bookingStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
