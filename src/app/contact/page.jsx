"use client";

import React from "react";

const Page = () => {
  return (
    <div className="w-11/12 lg:w-4/5 mx-auto min-h-screen px-6 py-40 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600">
            Feel free to reach out to us through the form or using the details below.
          </p>
          <div>
            <p className="font-medium">📍 Address:</p>
            <p className="text-gray-600">123 Main Street, Dhaka, Bangladesh</p>
          </div>
          <div>
            <p className="font-medium">📧 Email:</p>
            <p className="text-gray-600">contact@example.com</p>
          </div>
          <div>
            <p className="font-medium">📞 Phone:</p>
            <p className="text-gray-600">+880 1234-567890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
