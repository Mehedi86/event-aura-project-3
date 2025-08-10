import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req) => {
    const bookingCollection = dbConnect('eventBookings'); 
    const bookings = await bookingCollection.find({}).toArray();

    return NextResponse.json(bookings);
};
