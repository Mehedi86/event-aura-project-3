'use client';

import React, { useState } from 'react';
import { FaBell, FaLock, FaEnvelope, FaTrash, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { signOut } from 'next-auth/react';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    bookingNotifications: true,
    marketingEmails: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSettingChange = (setting, value) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
    toast.success('Setting updated');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      // In a real app, you would call an API to change password
      toast.success('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone! All your data will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete my account',
      input: 'text',
      inputPlaceholder: 'Type DELETE to confirm',
      inputValidator: (value) => {
        if (value !== 'DELETE') {
          return 'You must type DELETE to confirm';
        }
      },
    });

    if (result.isConfirmed) {
      try {
        // In a real app, you would call an API to delete account
        toast.success('Account deletion requested');
        await signOut({ callbackUrl: '/' });
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaBell /> Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">
                    Email Notifications
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      handleSettingChange('emailNotifications', e.target.checked)
                    }
                    className="toggle toggle-primary"
                  />
                </label>
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Receive email notifications about your bookings
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">
                    Booking Updates
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.bookingNotifications}
                    onChange={(e) =>
                      handleSettingChange('bookingNotifications', e.target.checked)
                    }
                    className="toggle toggle-success"
                  />
                </label>
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Get notified when your booking status changes
                  </span>
                </label>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold">
                    Marketing Emails
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.marketingEmails}
                    onChange={(e) =>
                      handleSettingChange('marketingEmails', e.target.checked)
                    }
                    className="toggle toggle-info"
                  />
                </label>
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Receive promotional emails and updates
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaLock /> Security
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Current Password</span>
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">New Password</span>
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                  required
                  minLength={6}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="input input-bordered w-full"
                  required
                  minLength={6}
                />
              </div>
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <FaShieldAlt /> Privacy
            </h2>
            <p className="text-gray-600 mb-4">
              Manage your privacy settings and data preferences.
            </p>
            <div className="card-actions">
              <button className="btn btn-outline">Download My Data</button>
              <button className="btn btn-outline">Privacy Policy</button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card bg-red-50 border-2 border-red-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4 text-red-600 flex items-center gap-2">
              <FaTrash /> Danger Zone
            </h2>
            <p className="text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <div className="card-actions">
              <button
                onClick={handleDeleteAccount}
                className="btn btn-error gap-2"
              >
                <FaTrash /> Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
