import React from "react";

export default function EventCard({ event }) {
  // Map status to colors
  const statusColors = {
    Pending: "bg-red-100 text-red-800",
    Confirmed: "bg-green-100 text-green-800",
    Rejected: "bg-gray-200 text-gray-700",
  };

  const statusClass = statusColors[event.bookingStatus] || "bg-gray-100 text-gray-800";

  return (
    <div className="border rounded-lg shadow-lg p-6 bg-white max-w-sm cursor-pointer hover:scale-105 transition duration-400">
      <h2 className="text-2xl font-bold mb-3">{event.proposedEventName}</h2>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Category:</span> {event.eventCategory}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Date & Time:</span> {event.proposedEventDate} at {event.proposedEventTime}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Venue:</span> {event.venue}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Organizer:</span> {event.organizer.fullName}
      </p>

      <p className="text-gray-700 mb-3">
        <span className="font-semibold">Contact:</span> {event.organizer.phone}
      </p>

      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusClass} mb-4`}>
        Status: {event.bookingStatus}
      </div>

      {event.additionalNotes && (
        <p className="text-gray-600 italic border-t pt-3 mt-3">{event.additionalNotes}</p>
      )}
    </div>
  );
}


