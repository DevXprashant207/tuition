import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function ServiceForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    name: '',
    description: '',
    slug: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      imageUrl: form.imageUrl
    };
    onSubmit(payload);
  };

  const handleImageUpload = (imageUrl) => {
    setForm({ ...form, imageUrl });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Service Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded h-32 resize-none overflow-y-auto"
        required
      />
      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {form.imageUrl && (
          <div className="mt-2">
            <img
              src={form.imageUrl}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-full border mx-auto"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-[#bfa77a] text-white px-4 py-2 rounded"
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

function ServicesModule() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error('Fetch services error:', err);
      setServices([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        fetchServices();
      } else {
        alert(data.message || 'Failed to create service');
      }
    } catch (err) {
      console.error('Create service error:', err);
    }
  };

  const handleUpdate = async (payload) => {
    if (!editing || !editing.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/services/${editing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        setShowForm(false);
        fetchServices();
      } else {
        alert(data.message || 'Failed to update service');
      }
    } catch (err) {
      console.error('Update service error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchServices();
      } else {
        alert(data.message || 'Failed to delete service');
      }
    } catch (err) {
      console.error('Delete service error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Services</h2>
        <button
          className="bg-[#bfa77a] text-white px-4 py-2 rounded"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          Add Service
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
            {editing ? 'Edit Service' : 'Add New Service'}
          </h3>
          <ServiceForm
            onSubmit={editing ? handleUpdate : handleCreate}
            initialData={editing ? editing : undefined}
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
              <th className="p-2 border">Service Name</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Description</th>
              {/* <th className="p-2 border">Image</th> */}
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...services].reverse().map(item => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.slug}</td>
                <td className="p-2 border max-w-xs">
                  <div
                    className="max-h-24 overflow-y-auto text-sm text-gray-700 px-2"
                    style={{ lineHeight: '1.5', scrollbarWidth: 'thin' }}
                  >
                    {item.description}
                  </div>
                </td>
                {/* <td className="p-2 border">
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" />
                    : 'N/A'}
                </td> */}
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => { setEditing(item); setShowForm(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(item.id)}
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

export default ServicesModule;
