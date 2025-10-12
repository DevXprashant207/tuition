import React, { useState, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function NewsForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    link: '',
    description: '',
    image: null,
    imagePreview: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        imagePreview: initialData.imageUrl || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert('Title and Description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('link', form.link || '');
    formData.append('description', form.description);

    if (form.image instanceof File) {
      formData.append('image', form.image);
    }

    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="link"
        value={form.link}
        onChange={handleChange}
        placeholder="Link"
        className="w-full border p-2 rounded"
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
        {form.imagePreview && (
          <div className="mt-2">
            <img
              src={form.imagePreview}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-full border mx-auto"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-[#cfac33] text-white px-4 py-2 rounded">
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

function NewsModule() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token');

  const fetchNews = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/api/news/`);
    const result = await res.json();
    if (result.success && Array.isArray(result.data)) {
      setNewsList(result.data);
    } else {
      setNewsList([]);
    }
  } catch (err) {
    console.error(err);
    setNewsList([]);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchNews();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/news/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!data.error) {
        setShowForm(false);
        fetchNews();
      } else alert(data.error);
    } catch (err) {
      console.error('Create news error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing || !editing.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/news/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!data.error) {
        setEditing(null);
        setShowForm(false);
        fetchNews();
      } else alert(data.error);
    } catch (err) {
      console.error('Update news error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this news?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!data.error) fetchNews();
      else alert(data.error);
    } catch (err) {
      console.error('Delete news error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">News</h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          Add News
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
            {editing ? 'Edit News' : 'Add New News'}
          </h3>
          <NewsForm
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
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Link</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...newsList].reverse().map(item => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">
                  {item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a> : 'N/A'}
                </td>
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border">
                  {item.imageUrl
                    ? <img src={`${API_BASE}${item.imageUrl}`} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" />
                    : 'N/A'}
                </td>
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
            {newsList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-[#cfac33]">
                  No news found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NewsModule;
