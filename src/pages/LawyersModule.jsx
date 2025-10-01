import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function LawyerForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    name: '',
    specialization: '',
    experience: '',
    image: '',
  });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };
  const handleImageUpload = (imageUrl) => {
    setForm({ ...form, image: imageUrl });
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
      <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" className="w-full border p-2 rounded" required />
      <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" className="w-full border p-2 rounded" required />
      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {form.image && (
          <div className="mt-2">
            <img src={form.image} alt="Uploaded" className="w-20 h-20 object-cover rounded-full border mx-auto" />
            <input name="image" value={form.image} onChange={handleChange} className="w-full border p-2 rounded mt-2" readOnly />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-[#bfa77a] text-white px-4 py-2 rounded">{initialData ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function LawyersModule() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/lawyers`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setLawyers(data);
      } else if (Array.isArray(data.data)) {
        setLawyers(data.data);
      } else {
        setLawyers([]);
      }
    } catch (err) {
      setLawyers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleCreate = async (lawyer) => {
    await fetch(`${API_BASE}/api/admin/lawyers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lawyer),
    });
    setShowForm(false);
    fetchLawyers();
  };

  const handleUpdate = async (lawyer) => {
    await fetch(`${API_BASE}/api/admin/lawyers/${editing._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lawyer),
    });
    setEditing(null);
    setShowForm(false);
    fetchLawyers();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/api/admin/lawyers/${id}`, {
      method: 'DELETE' });
    fetchLawyers();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Lawyers</h2>
        <button className="bg-[#bfa77a] text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setEditing(null); }}>Add Lawyer</button>
      </div>
      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">Add New Lawyer</h3>
          <LawyerForm
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
              <th className="p-2 border">Specialization</th>
              <th className="p-2 border">Experience</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...lawyers].reverse().map(lawyer => (
              <tr key={lawyer.id} className="text-center">
                <td className="p-2 border">{lawyer.name}</td>
                <td className="p-2 border">{lawyer.title}</td>
                <td className="p-2 border">{lawyer.bio}</td>
                <td className="p-2 border">
                  {lawyer.imageUrl ? <img src={lawyer.imageUrl} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" /> : 'N/A'}
                </td>
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => { setEditing(lawyer); setShowForm(true); }}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(lawyer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LawyersModule;
