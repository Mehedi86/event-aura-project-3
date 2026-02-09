"use client";

import React, { useState, useMemo } from "react";
import EventCard from "../shared/EventCard";


const categories = [
  "ALL",
  "SPORTS",
  "ANNUAL PARTY",
  "PRODUCT LAUNCH",
  "PRESENTATION",
  "SEMINAR",
  "WEDDING",
];

export default function SearchEvents({ events }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("ALL");
  const [date, setDate] = useState("");

  // Filter events based on category, date, keyword
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchCategory =
        category === "ALL" || event.eventCategory === category;
      const matchDate = !date || event.proposedEventDate === date;
      const matchKeyword =
        event.proposedEventName.toLowerCase().includes(keyword.toLowerCase()) ||
        event.venue.toLowerCase().includes(keyword.toLowerCase());

      return matchCategory && matchDate && matchKeyword;
    });
  }, [events, category, date, keyword]);

  const clearFilters = () => {
    setKeyword("");
    setCategory("ALL");
    setDate("");
  };

  return (
    <div className="lg:w-4/5 mx-auto pt-48 pb-20">

      {/* Search & Filters */}
      <div className="sticky top-35 shadow-xl bg-white border border-neutral-200 p-6 rounded mb-8 z-10">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          {/* Keyword */}
          <input
            type="text"
            placeholder="Search by event name or venue"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* Clear */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                ${category === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <p className="text-center py-20 text-gray-500">
          No events found.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
