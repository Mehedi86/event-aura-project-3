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
  console.log(yourBookings)

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
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Event Name</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Time</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Venue</th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {yourBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-sm text-gray-800">{booking.proposedEventName}</td>
                  <td className="py-3 px-4 border-b text-sm text-gray-600">{booking.eventCategory}</td>
                  <td className="py-3 px-4 border-b text-sm text-gray-600">
                    {new Date(booking.proposedEventDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b text-sm text-gray-600">{booking.proposedEventTime}</td>
                  <td className="py-3 px-4 border-b text-sm text-gray-600">{booking.venue}</td>
                  <td
                    className={`py-3 px-4 border-b text-sm font-semibold ${
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
