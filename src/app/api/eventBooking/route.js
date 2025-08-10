import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const body = await req.json();
    const eventBookings = dbConnect('eventBookings');
    const result = await eventBookings.insertOne(body);
    return NextResponse.json(result);

}