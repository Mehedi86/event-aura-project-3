// "use client";
// import { useSession } from "next-auth/react";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaInfoCircle } from "react-icons/fa";
// import { useRouter } from "next/navigation";


// export default function BookEvent() {
//   const { data: session, status } = useSession();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     eventCategory: "",
//     proposedEventName: "",
//     proposedEventDate: "",
//     proposedEventTime: "",
//     venue: "",
//     additionalNotes: "",
//     organizerPhone: "",
//     organizerAddress: "",
//   });

//   const router = useRouter();


//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (!session) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="text-center">
//           <p className="text-xl text-gray-600 mb-4">Please log in to book an event.</p>
//           <a href="/login" className="btn btn-primary">Go to Login</a>
//         </div>
//       </div>
//     );
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const bookingData = {
//       ...form,
//       bookingStatus: "Pending",
//       requestDate: new Date().toISOString(),
//       organizer: {
//         organizerId: session.user.email,
//         fullName: session.user.name,
//         email: session.user.email,
//         phone: form.organizerPhone,
//         address: form.organizerAddress,
//       },
//     };

//     try {
//       const res = await fetch("/api/eventBooking", {
//         method: "POST",
//         body: JSON.stringify(bookingData),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (res.ok) {
//         toast.success("Booking request submitted successfully!");

//         setForm({
//           eventCategory: "",
//           proposedEventName: "",
//           proposedEventDate: "",
//           proposedEventTime: "",
//           venue: "",
//           additionalNotes: "",
//           organizerPhone: "",
//           organizerAddress: "",
//         });
//         router.push("/events");
//       } else {
//         const error = await res.json();
//         toast.error(error.message || "Booking failed");
//       }
//     } catch (err) {
//       toast.error("Booking failed. Please try again.");
//       console.error("Booking failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
//       <div className="card bg-base-200 shadow-2xl">
//         <div className="card-body">
//           <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
//             Book an Event
//           </h1>
//           <p className="text-center text-gray-600 mb-8">
//             Fill out the form below to submit your event booking request
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Organizer Information Section */}
//             <div className="bg-base-100 p-6 rounded-lg border border-gray-300">
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <FaUser className="text-primary" /> Organizer Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaUser /> Full Name
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     value={session.user.name}
//                     disabled
//                     className="input input-bordered bg-gray-100 cursor-not-allowed"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaEnvelope /> Email Address
//                     </span>
//                   </label>
//                   <input
//                     type="email"
//                     value={session.user.email}
//                     disabled
//                     className="input input-bordered bg-gray-100 cursor-not-allowed"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaPhone /> Phone Number *
//                     </span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="organizerPhone"
//                     value={form.organizerPhone}
//                     onChange={handleChange}
//                     className="input input-bordered"
//                     placeholder="Enter your phone number"
//                     required
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaMapMarkerAlt /> Address *
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     name="organizerAddress"
//                     value={form.organizerAddress}
//                     onChange={handleChange}
//                     className="input input-bordered"
//                     placeholder="Enter your address"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Event Details Section */}
//             <div className="bg-base-100 p-6 rounded-lg border border-gray-300">
//               <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                 <FaCalendarAlt className="text-primary" /> Event Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="form-control md:col-span-2">
//                   <label className="label">
//                     <span className="label-text font-semibold">Event Category *</span>
//                   </label>
//                   <select
//                     name="eventCategory"
//                     value={form.eventCategory}
//                     onChange={handleChange}
//                     required
//                     className="select select-bordered w-full"
//                   >
//                     <option value="">Select category</option>
//                     <option value="SPORTS">SPORTS</option>
//                     <option value="ANNUAL PARTY">ANNUAL PARTY</option>
//                     <option value="PRODUCT LAUNCH">PRODUCT LAUNCH</option>
//                     <option value="PRESENTATION">PRESENTATION</option>
//                     <option value="SEMINAR">SEMINAR</option>
//                     <option value="WEDDING">WEDDING</option>
//                   </select>
//                 </div>

//                 <div className="form-control md:col-span-2">
//                   <label className="label">
//                     <span className="label-text font-semibold">Event Name *</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="proposedEventName"
//                     value={form.proposedEventName}
//                     onChange={handleChange}
//                     required
//                     className="input input-bordered w-full"
//                     placeholder="Enter event name"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaCalendarAlt /> Event Date *
//                     </span>
//                   </label>
//                   <input
//                     type="date"
//                     name="proposedEventDate"
//                     value={form.proposedEventDate}
//                     onChange={handleChange}
//                     required
//                     min={new Date().toISOString().split('T')[0]}
//                     className="input input-bordered w-full"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaClock /> Event Time *
//                     </span>
//                   </label>
//                   <input
//                     type="time"
//                     name="proposedEventTime"
//                     value={form.proposedEventTime}
//                     onChange={handleChange}
//                     required
//                     className="input input-bordered w-full"
//                   />
//                 </div>

//                 <div className="form-control md:col-span-2">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaMapMarkerAlt /> Venue *
//                     </span>
//                   </label>
//                   <input
//                     type="text"
//                     name="venue"
//                     value={form.venue}
//                     onChange={handleChange}
//                     required
//                     className="input input-bordered w-full"
//                     placeholder="Enter venue address"
//                   />
//                 </div>

//                 <div className="form-control md:col-span-2">
//                   <label className="label">
//                     <span className="label-text font-semibold flex items-center gap-2">
//                       <FaInfoCircle /> Additional Notes (Optional)
//                     </span>
//                   </label>
//                   <textarea
//                     name="additionalNotes"
//                     value={form.additionalNotes}
//                     onChange={handleChange}
//                     rows={4}
//                     className="textarea textarea-bordered w-full"
//                     placeholder="Any special requests or notes about your event..."
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end gap-4 pt-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setForm({
//                     eventCategory: "",
//                     proposedEventName: "",
//                     proposedEventDate: "",
//                     proposedEventTime: "",
//                     venue: "",
//                     additionalNotes: "",
//                     organizerPhone: "",
//                     organizerAddress: "",
//                   });
//                 }}
//                 className="btn btn-ghost"
//                 disabled={loading}
//               >
//                 Clear Form
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <FaCalendarAlt /> Submit Booking Request
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PageBanner from "../components/shared/PageBanner";


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

  const router = useRouter();


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
        router.push("/events");
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
    <div className="lg:w-4/5 mx-auto px-4 pt-40 pb-20">
      <div className="mb-12">
        <PageBanner
          subtitle="Reserve Your Spot"
          title="Book an Event"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT: FORM */}
        <div className="lg:col-span-2 bg-white rounded border border-neutral-200 p-8 space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book an Event</h1>
            <p className="text-gray-500 mt-1">
              Fill the details below. Approval usually takes 24 hours.
            </p>
          </div>

          {/* Organizer */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Organizer</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={session.user.name}
                disabled
                className="input input-bordered bg-gray-100"
              />

              <input
                type="email"
                value={session.user.email}
                disabled
                className="input input-bordered bg-gray-100"
              />

              <input
                type="tel"
                name="organizerPhone"
                value={form.organizerPhone}
                onChange={handleChange}
                placeholder="Phone number *"
                className="input input-bordered"
                required
              />

              <input
                type="text"
                name="organizerAddress"
                value={form.organizerAddress}
                onChange={handleChange}
                placeholder="Address *"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* Event */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Event details</h3>

            <select
              name="eventCategory"
              value={form.eventCategory}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select category *</option>
              <option>SPORTS</option>
              <option>ANNUAL PARTY</option>
              <option>PRODUCT LAUNCH</option>
              <option>PRESENTATION</option>
              <option>SEMINAR</option>
              <option>WEDDING</option>
            </select>

            <input
              type="text"
              name="proposedEventName"
              value={form.proposedEventName}
              onChange={handleChange}
              placeholder="Event name *"
              className="input input-bordered w-full"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                name="proposedEventDate"
                value={form.proposedEventDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="input input-bordered"
                required
              />

              <input
                type="time"
                name="proposedEventTime"
                value={form.proposedEventTime}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="Venue *"
              className="input input-bordered w-full"
              required
            />

            <textarea
              name="additionalNotes"
              value={form.additionalNotes}
              onChange={handleChange}
              rows={3}
              placeholder="Additional notes (optional)"
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        {/* RIGHT: SUMMARY / HELP */}
        <div className="bg-gray-50 rounded p-6 space-y-4 sticky top-40 h-fit">
          <h3 className="font-semibold text-gray-800">Booking summary</h3>

          <div className="text-sm text-gray-600 space-y-2">
            <p><span className="font-medium">Category:</span> {form.eventCategory || "—"}</p>
            <p><span className="font-medium">Event:</span> {form.proposedEventName || "—"}</p>
            <p><span className="font-medium">Date:</span> {form.proposedEventDate || "—"}</p>
            <p><span className="font-medium">Time:</span> {form.proposedEventTime || "—"}</p>
            <p><span className="font-medium">Venue:</span> {form.venue || "—"}</p>
          </div>

          <div className="pt-4 border-t text-sm text-gray-500">
            Status will be <span className="font-semibold text-amber-600">Pending</span> until approved.
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit booking"}
          </button>
        </div>

      </div>
    </div>

  );
}

