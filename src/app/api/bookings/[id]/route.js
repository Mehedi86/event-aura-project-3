import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Update booking status
export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
    const body = await req.json();
    const bookingCollection = dbConnect('eventBookings');
    
    const result = await bookingCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// Delete booking
export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    const bookingCollection = dbConnect('eventBookings');
    
    const result = await bookingCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
