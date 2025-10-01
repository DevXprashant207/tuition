import React, { useEffect, useState } from 'react';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

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
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full border p-2 rounded" required />
      <div className="flex gap-2">
        <button type="submit" className="bg-[#bfa77a] text-white px-4 py-2 rounded">{initialData ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function EnquiriesModule() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/enquiries`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEnquiries(data);
      } else if (Array.isArray(data.data)) {
        setEnquiries(data.data);
      } else {
        setEnquiries([]);
      }
    } catch (err) {
      setEnquiries([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleCreate = async (enquiry) => {
    await fetch(`${API_BASE}/api/admin/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    setShowForm(false);
    fetchEnquiries();
  };

  const handleUpdate = async (enquiry) => {
    await fetch(`${API_BASE}/api/admin/enquiries/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    setEditing(null);
    setShowForm(false);
    fetchEnquiries();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
      method: 'DELETE' });
    fetchEnquiries();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Enquiries</h2>
        <button className="bg-[#bfa77a] text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setEditing(null); }}>Add Enquiry</button>
      </div>
      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">Add New Enquiry</h3>
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
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...enquiries].reverse().map(enquiry => (
              <tr key={enquiry.id} className="text-center">
                <td className="p-2 border">{enquiry.name}</td>
                <td className="p-2 border">{enquiry.email}</td>
                <td className="p-2 border">{enquiry.message}</td>
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => { setEditing(enquiry); setShowForm(true); }}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(enquiry.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EnquiriesModule;
