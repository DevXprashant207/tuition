import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react'; // for dropdown icon

const API_BASE = 'https://law-firm-backend-e082.onrender.com'; // your backend URL

function EnquiryForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        className="w-full border p-2 rounded"
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-[#bfa77a] text-white px-4 py-2 rounded">
          {initialData ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ✅ Updated Dropdown menu component
function EnquiryActions({ enquiry, handleDelete, handleStatusUpdate }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('New');

  const statuses = [
    'New',
    'Complete',
    'Not Interested',
    'Irrelevant',
    'Out of Service Area',
  ];

  const handleSelect = async (status) => {
    setSelectedStatus(status);
    setOpen(false);
    await handleStatusUpdate(enquiry.id, status);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {/* Dropdown Button */}
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-500 text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-blue-600"
        >
          {selectedStatus}
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => handleSelect(status)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(enquiry.id)}
        className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

function EnquiriesModule() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/enquiries`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setEnquiries(data.data);
      else setEnquiries([]);
    } catch (err) {
      console.error(err);
      setEnquiries([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleCreate = async (enquiry) => {
    try {
      await fetch(`${API_BASE}/api/admin/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(enquiry),
      });
      setShowForm(false);
      fetchEnquiries();
    } catch (err) { console.error('Failed to create enquiry:', err); }
  };

  const handleUpdate = async (enquiry) => {
    try {
      await fetch(`${API_BASE}/api/admin/enquiries/${editing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(enquiry),
      });
      setEditing(null);
      setShowForm(false);
      fetchEnquiries();
    } catch (err) { console.error('Failed to update enquiry:', err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchEnquiries();
    } catch (err) { console.error('Failed to delete enquiry:', err); }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchEnquiries();
    } catch (err) { console.error('Failed to update status:', err); }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Enquiries</h2>
      </div>

      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
            {editing ? 'Edit Enquiry' : 'Add New Enquiry'}
          </h3>
          <EnquiryForm
            onSubmit={editing ? handleUpdate : handleCreate}
            initialData={editing}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-[#f8f6f2]">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone No</th>
              <th className="p-2 border">Law</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...enquiries].reverse().map(enquiry => (
              <tr key={enquiry.id} className="text-center">
                <td className="p-2 border">{enquiry.firstName} {enquiry.lastName}</td>
                <td className="p-2 border">{enquiry.email}</td>
                <td className="p-2 border">{enquiry.phone}</td>
                <td className="p-2 border">{enquiry.lawId}</td>
                <td className="p-2 border">{enquiry.message}</td>
                <td className="p-2 border text-center">
                  <EnquiryActions 
                    enquiry={enquiry} 
                    handleDelete={handleDelete} 
                    handleStatusUpdate={handleStatusUpdate} 
                  />
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-[#bfa77a]">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EnquiriesModule;
