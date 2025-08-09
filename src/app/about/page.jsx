import dbConnect from '@/lib/dbConnect'
import React from 'react'

export default async function About() {
    const userCollection = dbConnect('users');
    const data = await userCollection.find({}).toArray();
    console.log(data)
    return (
        <div>

        </div>
    )
}
