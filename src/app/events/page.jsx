export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect";
import EventCard from "../components/shared/EventCard";
import Link from "next/link";
import PageBanner from "../components/shared/PageBanner";

export default async function Events({ searchParams }) {

    const page = parseInt(searchParams?.page) || 1;
    const limit = 6; // events per page

    const eventCollection = dbConnect("eventBookings");

    // ✅ Load ALL data first
    const allEvents = await eventCollection.find({}).toArray();

    const totalEvents = allEvents.length;
    const totalPages = Math.ceil(totalEvents / limit);

    // ✅ Pagination using slice()
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const events = allEvents.slice(startIndex, endIndex);

    return (
        <div className="lg:w-4/5 mx-auto px-4 pt-32 lg:pt-48 pb-20">
            <div className="mb-12">
                <PageBanner
                    subtitle="All Bookings"
                    title="Our Events"
                />
            </div>
            {/* Grid (UNCHANGED DESIGN) */}
            <div className="grid md:grid-cols-3 gap-4">
                {events.length === 0 && <p>No events found.</p>}
                {events.map((event) => (
                    <EventCard key={event._id.toString()} event={event} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Link
                        key={index}
                        href={`/events?page=${index + 1}`}
                        className={`px-4 py-2 rounded border cursor-pointer ${page === index + 1
                            ? "bg-black text-white"
                            : "bg-white text-black"
                            }`}
                    >
                        {index + 1}
                    </Link>
                ))}
            </div>

        </div>
    );
}
