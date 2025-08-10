"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function BookEvent() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    eventCategory: "",
    proposedEventName: "",
    proposedEventDate: "",
    proposedEventTime: "",
    venue: "",
    additionalNotes: "",
    organizerPhone: "",
    organizerAddress: "",
  });

  if (status === "loading") return <p>Loading session...</p>;
  if (!session) return <p>Please log in to book an event.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...form,
      bookingStatus: "Pending",
      requestDate: new Date().toISOString(),
      organizer: {
        organizerId: session.user.email,
        fullName: session.user.name,
        email: session.user.email,
        phone: form.organizerPhone,
        address: form.organizerAddress,
      },
    };
    console.log("Booking Data to submit:", bookingData);

    try {
      const res = await fetch("http://localhost:3000/api/eventBooking", {
        method: "POST",
        body: JSON.stringify(bookingData),
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();
      toast.success(response?.message || "Booking successful");

      // Reset form state (not .reset() since form is state object)
      setForm({
        eventCategory: "",
        proposedEventName: "",
        proposedEventDate: "",
        proposedEventTime: "",
        venue: "",
        additionalNotes: "",
        organizerPhone: "",
        organizerAddress: "",
      });
    } catch (err) {
      toast.error("Booking failed");
      console.error("Booking failed", err);
    }
  };


  return (
    <div className="w-11/12 lg:w-3/5 mx-auto px-6 py-48 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Book an Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Organizer Info (auto-filled & disabled) */}
        <div>
          <label className="block font-semibold mb-1">Organizer Name</label>
          <input
            type="text"
            value={session.user.name}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Organizer Email</label>
          <input
            type="email"
            value={session.user.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Organizer Phone (editable) */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="organizerPhone">
            Organizer Phone
          </label>
          <input
            type="tel"
            id="organizerPhone"
            name="organizerPhone"
            value={form.organizerPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Organizer Address (editable) */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="organizerAddress">
            Organizer Address
          </label>
          <input
            type="text"
            id="organizerAddress"
            name="organizerAddress"
            value={form.organizerAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Event Category */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="eventCategory">
            Event Category
          </label>
          <select
            id="eventCategory"
            name="eventCategory"
            value={form.eventCategory}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>
            <option value="SPORTS">SPORTS</option>
            <option value="ANNUAL PARTY">ANNUAL PARTY</option>
            <option value="PRODUCT LAUNCH">PRODUCT LAUNCH</option>
            <option value="PRESENTATION">PRESENTATION</option>
            <option value="SEMINAR">SEMINAR</option>
            <option value="WEDDING">WEDDING</option>
          </select>
        </div>

        {/* Proposed Event Name */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="proposedEventName">
            Event Name
          </label>
          <input
            type="text"
            id="proposedEventName"
            name="proposedEventName"
            value={form.proposedEventName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Proposed Event Date */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="proposedEventDate">
            Event Date
          </label>
          <input
            type="date"
            id="proposedEventDate"
            name="proposedEventDate"
            value={form.proposedEventDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Proposed Event Time */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="proposedEventTime">
            Event Time
          </label>
          <input
            type="time"
            id="proposedEventTime"
            name="proposedEventTime"
            value={form.proposedEventTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="venue">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={form.venue}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter venue address"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="additionalNotes">
            Additional Notes (Optional)
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={form.additionalNotes}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            placeholder="Any special requests or notes"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-950 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
}
