"use client";

import React, { useState, useMemo, useEffect } from "react";
import EventCard from "../shared/EventCard";
import PageBanner from "../shared/PageBanner";

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

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, category, date]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const clearFilters = () => {
    setKeyword("");
    setCategory("ALL");
    setDate("");
  };

  return (
    <div className="lg:w-4/5 mx-auto px-4 pt-32 lg:pt-48 pb-20">
      <div className="mb-12">
        <PageBanner
          subtitle="Search & Discover"
          title="Find Your Perfect Event"
        />
      </div>

      {/* Search & Filters */}
      <div className="lg:sticky lg:top-35 shadow-xl bg-white border border-neutral-200 p-6 rounded mb-8 z-10">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <input
            type="text"
            placeholder="Search by event name or venue"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={clearFilters}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>

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
        <>
          <div className="px-6 md:px-0 grid md:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {/* ✅ Pagination Buttons (No Design Changed Above) */}
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded border cursor-pointer ${currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-white text-black"
                  }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
