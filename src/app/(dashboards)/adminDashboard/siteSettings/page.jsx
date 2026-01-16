'use client';

import React, { useState } from 'react';
import { FaSave, FaCog, FaBell, FaEnvelope, FaShield } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Event Management System',
    siteDescription: 'Professional event management platform',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    maxBookingsPerUser: 10,
    bookingApprovalRequired: true,
    defaultBookingStatus: 'Pending',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, you would save to database
      // For now, we'll just simulate saving
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Site Settings</h1>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaCog /> General Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Site Name</span>
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Site Description</span>
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                />
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">Maintenance Mode</span>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                    className="toggle toggle-warning"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* User Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
               User Settings
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">Allow New Registrations</span>
                  <input
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => handleChange('allowRegistration', e.target.checked)}
                    className="toggle toggle-success"
                  />
                </label>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Max Bookings Per User
                  </span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={settings.maxBookingsPerUser}
                  onChange={(e) => handleChange('maxBookingsPerUser', parseInt(e.target.value))}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaBell /> Booking Settings
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">
                    Require Admin Approval for Bookings
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.bookingApprovalRequired}
                    onChange={(e) => handleChange('bookingApprovalRequired', e.target.checked)}
                    className="toggle toggle-info"
                  />
                </label>
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Default Booking Status</span>
                </label>
                <select
                  value={settings.defaultBookingStatus}
                  onChange={(e) => handleChange('defaultBookingStatus', e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaEnvelope /> Notification Settings
            </h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-semibold">Enable Email Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn btn-primary gap-2"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span> Saving...
              </>
            ) : (
              <>
                <FaSave /> Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
