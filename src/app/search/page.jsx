"use client";
import React, { useState } from "react";

const categories = [
  { id: 1, name: "SPORTS" },
  { id: 2, name: "ANNUAL PARTY" },
  { id: 3, name: "PRODUCT LAUNCH" },
  { id: 4, name: "PRESENTATION" },
  { id: 5, name: "SEMINAR" },
  { id: 6, name: "WEDDING" },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearch = () => {
    console.log("Search by:", selectedCategory, selectedDate);
    // later you'll filter the events here
  };

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto min-h-screen px-6 py-40 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Search Events</h1>

      {/* Search Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Category Filter */}
        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          className="border p-2 rounded w-full md:w-1/3"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Event Cards Container */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* You will map events here later */}
      </div>
    </div>
  );
}

