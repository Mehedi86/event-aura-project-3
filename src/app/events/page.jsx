import dbConnect from "@/lib/dbConnect";
import React from "react";
import EventCard from "../components/shared/EventCard";


export default async function Events() {
    const eventCollection = dbConnect("eventBookings");
    const events = await eventCollection.find({}).toArray();
    console.log(events)

    
    return (
        <div className="w-11/12 lg:w-4/5 mx-auto px-6 py-48 grid md:grid-cols-3 gap-6">
            {events.length === 0 && <p>No events found.</p>}
            {events.map((event) => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    );
}

