import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const userCollection = dbConnect('users');
    const users = await userCollection.find({}).toArray();

    return NextResponse.json(users);
}