'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function YourInfo() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',
        address: session.user.address || '',
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        // Update session
        await update();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: session.user.phone || '',
        address: session.user.address || '',
      });
    }
    setIsEditing(false);
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Information</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary gap-2"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="avatar mb-4">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={session.user?.image || '/img/user/userIcon.png'}
                  alt={session.user?.name || 'User'}
                  className="rounded-full"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {session.user?.name || 'User'}
            </h2>
            <p className="text-gray-500">{session.user?.role?.toUpperCase() || 'USER'}</p>
          </div>

          {/* Information Form */}
          <div className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaUser /> Full Name
                </span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="p-3 bg-base-100 rounded-lg border border-gray-300">
                  {formData.name || 'Not provided'}
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaEnvelope /> Email Address
                </span>
              </label>
              <div className="p-3 bg-base-100 rounded-lg border border-gray-300 text-gray-500">
                {formData.email || 'Not provided'}
              </div>
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Email cannot be changed
                </span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaPhone /> Phone Number
                </span>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="p-3 bg-base-100 rounded-lg border border-gray-300">
                  {formData.phone || 'Not provided'}
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaMapMarkerAlt /> Address
                </span>
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="p-3 bg-base-100 rounded-lg border border-gray-300">
                  {formData.address || 'Not provided'}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-4 justify-end mt-6">
                <button
                  onClick={handleCancel}
                  className="btn btn-ghost gap-2"
                  disabled={loading}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-primary gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
