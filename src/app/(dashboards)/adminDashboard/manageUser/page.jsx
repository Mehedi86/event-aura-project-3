'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaUserShield, FaUser, FaDownload, FaFilter, FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        toast.success('User role updated successfully');
        loadUsers();
      } else {
        toast.error('Failed to update user role');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleBulkRoleUpdate = async (role) => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user');
      return;
    }

    const result = await Swal.fire({
      title: 'Update Multiple Users?',
      text: `Are you sure you want to change role to ${role} for ${selectedUsers.length} user(s)?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update them!',
    });

    if (result.isConfirmed) {
      try {
        const promises = selectedUsers.map(id =>
          fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role }),
          })
        );

        await Promise.all(promises);
        toast.success(`${selectedUsers.length} user(s) updated successfully`);
        setSelectedUsers([]);
        loadUsers();
      } catch (error) {
        toast.error('Failed to update users');
      }
    }
  };

  const handleDelete = async (id, email) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete user: ${email}. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('User deleted successfully');
          loadUsers();
        } else {
          toast.error('Failed to delete user');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user');
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Multiple Users?',
      text: `Are you sure you want to delete ${selectedUsers.length} user(s)? This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
    });

    if (result.isConfirmed) {
      try {
        const promises = selectedUsers.map(id =>
          fetch(`/api/users/${id}`, { method: 'DELETE' })
        );

        await Promise.all(promises);
        toast.success(`${selectedUsers.length} user(s) deleted successfully`);
        setSelectedUsers([]);
        loadUsers();
      } catch (error) {
        toast.error('Failed to delete users');
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map(u => u._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Provider', 'Created At'];
    const rows = filteredUsers.map(user => [
      user.name || '',
      user.email || '',
      user.role || 'user',
      user.provider || 'credentials',
      user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Users exported to CSV');
  };

  const filteredUsers = users.filter(
    (user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <button onClick={exportToCSV} className="btn btn-outline gap-2">
          <FaDownload /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{users.length}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Admins</div>
          <div className="stat-value text-success">
            {users.filter((u) => u.role === 'admin').length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Regular Users</div>
          <div className="stat-value text-info">
            {users.filter((u) => u.role === 'user').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-primary" />
            <h2 className="card-title text-lg">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="alert alert-info mb-4">
          <div className="flex-1">
            <span>{selectedUsers.length} user(s) selected</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkRoleUpdate('admin')}
              className="btn btn-sm btn-success"
            >
              <FaUserShield /> Make Admin
            </button>
            <button
              onClick={() => handleBulkRoleUpdate('user')}
              className="btn btn-sm btn-info"
            >
              <FaUser /> Make User
            </button>
            <button
              onClick={handleBulkDelete}
              className="btn btn-sm btn-error"
            >
              <FaTrash /> Delete All
            </button>
            <button
              onClick={() => setSelectedUsers([])}
              className="btn btn-sm btn-ghost"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  className="checkbox checkbox-primary"
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Provider</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <FaUser className="text-gray-600" />
                        </div>
                      )}
                      <span className="font-semibold">{user.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="text-gray-700">{user.email}</td>
                  <td>
                    <select
                      value={user.role || 'user'}
                      onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                      className="select select-bordered select-sm"
                      disabled={user.role === 'admin' && selectedUsers.length === 0}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <span className="badge badge-outline">
                      {user.provider || 'credentials'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id, user.email)}
                      className="btn btn-sm btn-error gap-1"
                      disabled={user.role === 'admin'}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
