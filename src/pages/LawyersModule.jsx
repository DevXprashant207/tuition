import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';
// Predefined list of services
const SERVICE_OPTIONS = [
  { id: 'law1', name: 'Criminal Law' },
  { id: 'law2', name: 'Family Law' },
  { id: 'law3', name: 'Corporate Law' },
  { id: 'law4', name: 'Intellectual Property' },
  { id: 'law5', name: 'Civil Litigation' },
  { id: 'law6', name: 'Employment Law' },
  { id: 'law7', name: 'Real Estate Law' },
  { id: 'law8', name: 'Tax Law' },
  { id: 'law9', name: 'Immigration Law' },
  { id: 'law10', name: 'Constitutional Law' },
];
  

function LawyerForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    name: '',
    specialization: '',
    experience: '', // Now stores selected service
    image: null,
    imagePreview: '',
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name || !form.specialization || !form.experience) {
      setError('All fields are required.');
      return;
    }

    if (!form.image && !initialData) {
      setError('Please upload an image.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('title', form.specialization);
    formData.append('bio', form.experience); // service selected

    if (form.image instanceof File) {
      formData.append('image', form.image);
    }

    onSubmit(formData);
  };

  const handleImageUpload = (file) => {
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* Lawyer Name */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 rounded"
        required
      />

      {/* Title */}
      <input
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />

      {/* Service Dropdown (replacing manual input) */}
      <select
        name="experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Service</option>
        {SERVICE_OPTIONS.map(service => (
          <option key={service.id} value={service.name}>
            {service.name}
          </option>
        ))}
      </select>

      {/* Image Upload */}
      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {(form.imagePreview || form.imageUrl) && (
          <div className="mt-2">
            <img
              src={form.imagePreview || `${API_BASE}${form.imageUrl}`}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-full border mx-auto"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
        >
          {initialData ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}


function LawyersModule() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/lawyers`);
      const data = await res.json();
      if (Array.isArray(data.data)) setLawyers(data.data);
      else if (Array.isArray(data)) setLawyers(data);
      else setLawyers([]);
    } catch (err) {
      console.error(err);
      setLawyers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLawyers();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/lawyers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to create lawyer');

      setShowForm(false);
      fetchLawyers();
    } catch (err) {
      console.error('Failed to create lawyer:', err);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/lawyers/${editing.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update lawyer');

      setEditing(null);
      setShowForm(false);
      fetchLawyers();
    } catch (err) {
      console.error('Failed to update lawyer:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lawyer?')) return;
    try {
      await fetch(`${API_BASE}/api/admin/lawyers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLawyers();
    } catch (err) {
      console.error('Failed to delete lawyer:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Lawyers</h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          Add Lawyer
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
            {editing ? 'Edit Lawyer' : 'Add New Lawyer'}
          </h3>
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
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Service Description</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...lawyers].reverse().map(lawyer => (
              <tr key={lawyer.id || lawyer._id} className="text-center">
                <td className="p-2 border">{lawyer.name}</td>
                <td className="p-2 border">{lawyer.title}</td>
                <td className="p-2 border">{lawyer.bio}</td>
                <td className="p-2 border">
                  {lawyer.imageUrl
                    ? <img
                        src={`${API_BASE}${lawyer.imageUrl}`}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full mx-auto"
                      />
                    : 'N/A'}
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => { setEditing(lawyer); setShowForm(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(lawyer.id || lawyer._id)}
                  >
                    Delete
                  </button>
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
