import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const newUser = await req.json();
    try {
        const userCollection = await dbConnect('users');
        const exist = await userCollection.findOne({ email: newUser.email });
        console.log(exist)
        if (exist) {
            return NextResponse.json({ message: "User Exists" }, { status: 304 })
        }
        const result = await userCollection.insertOne({ newUser });
        return NextResponse.json({ message: "User Created" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something Went Wrong", error },
            { status: 500 }
        );
    }
}