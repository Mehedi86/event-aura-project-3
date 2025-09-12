'use client'

import { useSession } from 'next-auth/react';
import React from 'react';

export default function YourInfo() {
  const { data } = useSession();
  const { name, email, role, image } = data?.user || {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-12 text-center text-gray-800">
        Your Information
      </h1>

      <div className="flex justify-center">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 flex flex-col items-center">
          <img
            src={image || "/img/user/userIcon.png"}
            alt={name || "User Avatar"}
            className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{name || "No Name"}</h2>
          <p className="text-gray-500 mb-1">{email || "No Email"}</p>
          <p className="text-gray-500">{role ? role.toUpperCase() : "User Role"}</p>
        </div>
      </div>
    </div>
  );
}
