export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { CalendarDays, MapPin, User, Tag } from "lucide-react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default async function EventDetails({ params }) {

    const eventCollection = dbConnect("eventBookings");
    const eventId = await params;

    const event = await eventCollection.findOne({
        _id: new ObjectId(eventId.id),
    });

    if (!event) {
        return <div className="pt-40 text-center">Event not found</div>;
    }

    const statusStyles = {
        Pending: "bg-yellow-600 text-white",
        Approved: "bg-green-500 text-white",
        Rejected: "bg-red-500 text-white",
    };

    const statusClass =
        statusStyles[event.bookingStatus] || "bg-gray-100 text-gray-800";

    return (
        <div className="lg:w-3/5 mx-auto px-4 pt-32 lg:pt-48 pb-20">
            <div className="pb-12">
                <Link href="/events">
                    <FaArrowLeft size={24} />
                </Link>
            </div>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                    <h1 className="text-3xl font-bold">
                        {event.proposedEventName}
                    </h1>
                    <p className="opacity-90 mt-1">
                        {event.eventCategory}
                    </p>
                </div>

                <div className="p-6 space-y-6 text-gray-700">

                    {/* Status */}
                    <div>
                        <span className={`px-4 py-1 rounded-full text-sm ${statusClass}`}>
                            {event.bookingStatus}
                        </span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-indigo-500" />
                        <span>
                            {event.proposedEventDate} at {event.proposedEventTime}
                        </span>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        <span>{event.venue}</span>
                    </div>

                    {/* Organizer (ONLY safe info) */}
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-indigo-500" />
                        <span>{event.organizer.fullName}</span>
                    </div>

                    {/* Notes */}
                    {event.additionalNotes && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Additional Notes</h3>
                            <p className="text-gray-600 italic">
                                {event.additionalNotes}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
