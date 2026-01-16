"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaInfoCircle } from "react-icons/fa";

export default function BookEvent() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please log in to book an event.</p>
          <a href="/login" className="btn btn-primary">Go to Login</a>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
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

    try {
      const res = await fetch("/api/eventBooking", {
        method: "POST",
        body: JSON.stringify(bookingData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Booking request submitted successfully!");
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
      } else {
        const error = await res.json();
        toast.error(error.message || "Booking failed");
      }
    } catch (err) {
      toast.error("Booking failed. Please try again.");
      console.error("Booking failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="card bg-base-200 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
            Book an Event
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below to submit your event booking request
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organizer Information Section */}
            <div className="bg-base-100 p-6 rounded-lg border border-gray-300">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaUser className="text-primary" /> Organizer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaUser /> Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={session.user.name}
                    disabled
                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaEnvelope /> Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={session.user.email}
                    disabled
                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaPhone /> Phone Number *
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="organizerPhone"
                    value={form.organizerPhone}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaMapMarkerAlt /> Address *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="organizerAddress"
                    value={form.organizerAddress}
                    onChange={handleChange}
                    className="input input-bordered"
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="bg-base-100 p-6 rounded-lg border border-gray-300">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-primary" /> Event Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Event Category *</span>
                  </label>
                  <select
                    name="eventCategory"
                    value={form.eventCategory}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full"
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

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Event Name *</span>
                  </label>
                  <input
                    type="text"
                    name="proposedEventName"
                    value={form.proposedEventName}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter event name"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaCalendarAlt /> Event Date *
                    </span>
                  </label>
                  <input
                    type="date"
                    name="proposedEventDate"
                    value={form.proposedEventDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaClock /> Event Time *
                    </span>
                  </label>
                  <input
                    type="time"
                    name="proposedEventTime"
                    value={form.proposedEventTime}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaMapMarkerAlt /> Venue *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter venue address"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaInfoCircle /> Additional Notes (Optional)
                    </span>
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={form.additionalNotes}
                    onChange={handleChange}
                    rows={4}
                    className="textarea textarea-bordered w-full"
                    placeholder="Any special requests or notes about your event..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
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
                }}
                className="btn btn-ghost"
                disabled={loading}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCalendarAlt /> Submit Booking Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
