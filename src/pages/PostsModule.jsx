import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function PostForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    title: '',
    slug: '',
    content: '',
    image: null,
    imagePreview: initialData?.imageUrl || ''
  });

  const [error, setError] = useState('');

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

    if (!form.title || !form.slug || !form.content) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('content', form.content);

    if (form.image instanceof File) {
      formData.append('image', form.image);
    }

    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
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
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
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

function PostsModule() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem('token'); // admin token

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/posts`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPosts(data.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error(err);
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        fetchPosts();
      } else {
        alert(data.message || 'Failed to create post');
      }
    } catch (err) {
      console.error('Create post error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing || !editing.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts/${editing.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setEditing(null);
        setShowForm(false);
        fetchPosts();
      } else {
        alert(data.message || 'Failed to update post');
      }
    } catch (err) {
      console.error('Update post error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      } else {
        alert(data.message || 'Failed to delete post');
      }
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#23293a]">Posts</h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          Add Post
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-[#f8f6f2] p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
            {editing ? 'Edit Post' : 'Add New Post'}
          </h3>
          <PostForm
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
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Content</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...posts].reverse().map(item => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.slug}</td>
                <td className="p-2 border max-w-xs">
                  <div className="max-h-12 overflow-y-auto text-left px-1">
                    {item.content}
                  </div>
                </td>
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
            {posts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-[#cfac33]">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostsModule;
