"use client";

import React from "react";

const Page = () => {
  return (
    <div className="lg:w-4/5 mx-auto min-h-screen px-6 pt-40 pb-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          We’d love to hear about your event or inquiry
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Tell us about your event…"
              className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Get in Touch
          </h2>

          <p className="text-gray-600">
            Reach out through the form or contact us directly using the details
            below.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">📍 Address</p>
              <p className="text-gray-600">
                123 Main Street, Dhaka, Bangladesh
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">📧 Email</p>
              <p className="text-gray-600">contact@example.com</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">📞 Phone</p>
              <p className="text-gray-600">+880 1234-567890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

