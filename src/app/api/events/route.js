import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// Get all events
export const GET = async (req) => {
  try {
    const eventCollection = dbConnect('events');
    const events = await eventCollection.find({}).toArray();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// Create new event
export const POST = async (req) => {
  try {
    const body = await req.json();
    const eventCollection = dbConnect('events');
    const result = await eventCollection.insertOne({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
