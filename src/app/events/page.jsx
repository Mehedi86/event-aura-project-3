import dbConnect from '@/lib/dbConnect'
import React from 'react'

export default async function Events() {
    const eventCollection = dbConnect("eventBookings");
    const data = await eventCollection.find({}).toArray();
    console.log(data)
    return (
        <div>

        </div>
    )
}
