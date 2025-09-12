import React from 'react';

export default function YourInfo() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Dashboard
      </h1>

      <div className="flex justify-center">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-lg font-semibold">Your Information</h2>
            <p className="text-gray-500 mt-2">
              Nothing to show now!!!
            </p>
            <div className="card-actions mt-6">
              <button className="btn btn-primary">Update Info</button>
              <button className="btn btn-outline">Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
