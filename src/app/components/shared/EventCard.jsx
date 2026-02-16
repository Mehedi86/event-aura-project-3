// import React from "react";
// import { CalendarDays, MapPin, User } from "lucide-react";

// export default function EventCard({ event }) {

//   const statusStyles = {
//     Pending: "bg-yellow-600 text-white",
//     Approved: "bg-green-500 text-white",
//     Rejected: "bg-red-500 text-white",
//   };



//   const statusClass =
//     statusStyles[event.bookingStatus] || "bg-gray-100 text-gray-800";

//   return (
//     <div className="group relative rounded overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
//         <span className="text-xs uppercase tracking-wide opacity-90">
//           {event.eventCategory}
//         </span>
//         <h2 className="text-xl font-bold mt-1">
//           {event.proposedEventName}
//         </h2>
//       </div>

//       {/* Status badge */}
//       <span
//         className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs ${statusClass}`}
//       >
//         {event.bookingStatus}
//       </span>

//       {/* Content */}
//       <div className="p-5 space-y-3 text-sm text-gray-700">
//         <div className="flex items-center gap-2">
//           <CalendarDays className="w-4 h-4 text-indigo-500" />
//           <span>
//             {event.proposedEventDate} • {event.proposedEventTime}
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <MapPin className="w-4 h-4 text-indigo-500" />
//           <span>{event.venue}</span>
//         </div>

//         <div className="flex items-center gap-2">
//           <User className="w-4 h-4 text-indigo-500" />
//           <span>{event.organizer.fullName}</span>
//         </div>

//         {event.additionalNotes && (
//           <p className="text-gray-500 italic border-t pt-3">
//             {event.additionalNotes}
//           </p>
//         )}
//       </div>

//       {/* Hover footer */}
//       <div className="transition p-4 bg-gray-50 text-center text-sm font-medium text-indigo-600">
//         View Details →
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import Link from "next/link";
// import { CalendarDays, MapPin, User } from "lucide-react";

// export default function EventCard({ event }) {

//   const statusStyles = {
//     Pending: "bg-yellow-600 text-white",
//     Approved: "bg-green-500 text-white",
//     Rejected: "bg-red-500 text-white",
//   };

//   const statusClass =
//     statusStyles[event.bookingStatus] || "bg-gray-100 text-gray-800";

//   return (
//     <Link href={`/events/${event._id}`}>
//       <div className="group relative rounded overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
//           <span className="text-xs uppercase tracking-wide opacity-90">
//             {event.eventCategory}
//           </span>
//           <h2 className="text-xl font-bold mt-1">
//             {event.proposedEventName}
//           </h2>
//         </div>

//         {/* Status badge */}
//         <span
//           className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs ${statusClass}`}
//         >
//           {event.bookingStatus}
//         </span>

//         <div className="p-5 space-y-3 text-sm text-gray-700">
//           <div className="flex items-center gap-2">
//             <CalendarDays className="w-4 h-4 text-indigo-500" />
//             <span>
//               {event.proposedEventDate} • {event.proposedEventTime}
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-indigo-500" />
//             <span>{event.venue}</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <User className="w-4 h-4 text-indigo-500" />
//             <span>{event.organizer.fullName}</span>
//           </div>
//         </div>

//         <div className="transition p-4 bg-gray-50 text-center text-sm font-medium text-indigo-600">
//           View Details →
//         </div>
//       </div>
//     </Link>
//   );
// }

import React from "react";
import Link from "next/link";
import { CalendarDays, MapPin, User } from "lucide-react";

export default function EventCard({ event }) {
  const statusStyles = {
    Pending: "bg-yellow-600 text-white",
    Approved: "bg-green-500 text-white",
    Rejected: "bg-red-500 text-white",
  };

  const statusClass =
    statusStyles[event.bookingStatus] || "bg-gray-100 text-gray-800";

  return (
    <Link href={`/events/${event._id}`} className="block">
      <div className="group relative rounded overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <span className="text-xs uppercase tracking-wide opacity-90">
            {event.eventCategory}
          </span>
          <h2 className="text-xl font-bold mt-1 line-clamp-1">
            {event.proposedEventName}
          </h2>
        </div>

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs ${statusClass}`}
        >
          {event.bookingStatus}
        </span>

        {/* Content */}
        <div className="p-5 space-y-3 text-sm text-gray-700">

          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-indigo-500" />
            <span>
              {event.proposedEventDate} • {event.proposedEventTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span className="line-clamp-1">
              {event.venue}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            <span className="line-clamp-1">
              {event.organizer?.fullName}
            </span>
          </div>

          {/* Additional Notes (if exists) */}
          {event.additionalNotes && (
            <p className="text-gray-500 italic border-t pt-3 line-clamp-2">
              {event.additionalNotes}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="transition p-4 bg-gray-50 text-center text-sm font-medium text-indigo-600 group-hover:bg-indigo-50">
          View Details →
        </div>
      </div>
    </Link>
  );
}

