import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const eventBookings = dbConnect('eventBookings');
        const result = await eventBookings.insertOne(body);
        return NextResponse.json({ 
            success: true, 
            message: "Booking request submitted successfully",
            id: result.insertedId 
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Failed to submit booking request",
            error: error.message 
        }, { status: 500 });
    }
}

export const GET = async (req) => {
    try {
        const eventBookings = dbConnect('eventBookings');
        const bookings = await eventBookings.find({}).toArray();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ 
            error: error.message 
        }, { status: 500 });
    }
}
