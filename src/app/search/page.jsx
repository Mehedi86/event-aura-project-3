// app/events/page.jsx
import dbConnect from "@/lib/dbConnect";
import SearchEvents from "../components/content/SearchEvents";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const eventCollection = dbConnect("eventBookings");
  const events = await eventCollection.find({}).toArray();

  // Convert _id to string for React key
  const eventsWithId = events.map((e) => ({ ...e, _id: e._id.toString() }));

  return (
    <div>
      <SearchEvents events={eventsWithId} />
    </div>
  );
}
