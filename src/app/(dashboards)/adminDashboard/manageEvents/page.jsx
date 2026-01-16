'use client';

import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    image: '',
    status: 'active',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingEvent ? `/api/events/${editingEvent._id}` : '/api/events';
      const method = editingEvent ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingEvent ? 'Event updated successfully' : 'Event created successfully');
        setShowModal(false);
        resetForm();
        loadEvents();
      } else {
        toast.error('Failed to save event');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      category: event.category || '',
      date: event.date || '',
      time: event.time || '',
      venue: event.venue || '',
      price: event.price || '',
      image: event.image || '',
      status: event.status || 'active',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Event deleted successfully');
          loadEvents();
        } else {
          toast.error('Failed to delete event');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedEvents.length === 0) {
      toast.error('Please select at least one event');
      return;
    }

    const result = await Swal.fire({
      title: 'Delete Multiple Events?',
      text: `Are you sure you want to delete ${selectedEvents.length} event(s)? This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
    });

    if (result.isConfirmed) {
      try {
        const promises = selectedEvents.map(id =>
          fetch(`/api/events/${id}`, { method: 'DELETE' })
        );

        await Promise.all(promises);
        toast.success(`${selectedEvents.length} event(s) deleted successfully`);
        setSelectedEvents([]);
        loadEvents();
      } catch (error) {
        toast.error('Failed to delete events');
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEvents(filteredEvents.map(e => e._id));
    } else {
      setSelectedEvents([]);
    }
  };

  const handleSelectEvent = (id) => {
    setSelectedEvents(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Category', 'Date', 'Time', 'Venue', 'Price', 'Status'];
    const rows = filteredEvents.map(event => [
      event.title || '',
      event.category || '',
      event.date ? new Date(event.date).toLocaleDateString() : '',
      event.time || '',
      event.venue || '',
      event.price || '0',
      event.status || 'active',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `events-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Events exported to CSV');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      date: '',
      time: '',
      venue: '',
      price: '',
      image: '',
      status: 'active',
    });
    setEditingEvent(null);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

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
        <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
        <div className="flex gap-2">
          <button onClick={exportToCSV} className="btn btn-outline gap-2">
            <FaDownload /> Export CSV
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary gap-2"
          >
            <FaPlus /> Add New Event
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 shadow-lg mb-6">
        <div className="card-body">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-primary" />
            <h2 className="card-title text-lg">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Categories</option>
              <option value="SPORTS">SPORTS</option>
              <option value="ANNUAL PARTY">ANNUAL PARTY</option>
              <option value="PRODUCT LAUNCH">PRODUCT LAUNCH</option>
              <option value="PRESENTATION">PRESENTATION</option>
              <option value="SEMINAR">SEMINAR</option>
              <option value="WEDDING">WEDDING</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedEvents.length > 0 && (
        <div className="alert alert-info mb-4">
          <div className="flex-1">
            <span>{selectedEvents.length} event(s) selected</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBulkDelete}
              className="btn btn-sm btn-error"
            >
              <FaTrash /> Delete All
            </button>
            <button
              onClick={() => setSelectedEvents([])}
              className="btn btn-sm btn-ghost"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Events Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>
                <input
                  type="checkbox"
                  checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                  onChange={handleSelectAll}
                  className="checkbox checkbox-primary"
                />
              </th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  No events found
                </td>
              </tr>
            ) : (
              filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event._id)}
                      onChange={() => handleSelectEvent(event._id)}
                      className="checkbox checkbox-primary"
                    />
                  </td>
                  <td className="font-semibold">{event.title || 'N/A'}</td>
                  <td>
                    <span className="badge badge-outline">{event.category || 'N/A'}</span>
                  </td>
                  <td>
                    {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>{event.venue || 'N/A'}</td>
                  <td>${event.price || '0'}</td>
                  <td>
                    <span
                      className={`badge ${
                        event.status === 'active' ? 'badge-success' : 'badge-error'
                      }`}
                    >
                      {event.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="btn btn-sm btn-info gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="btn btn-sm btn-error gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Event Title *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Category *</span>
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select category</option>
                      <option value="SPORTS">SPORTS</option>
                      <option value="ANNUAL PARTY">ANNUAL PARTY</option>
                      <option value="PRODUCT LAUNCH">PRODUCT LAUNCH</option>
                      <option value="PRESENTATION">PRESENTATION</option>
                      <option value="SEMINAR">SEMINAR</option>
                      <option value="WEDDING">WEDDING</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Date *</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Time *</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Venue *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Price</span>
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Image URL</span>
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Status</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Description</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="textarea textarea-bordered w-full"
                    rows="4"
                  />
                </div>
                <div className="flex gap-4 justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
