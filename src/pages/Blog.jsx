import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

const API_BASE = 'https://law-firm-backend-e082.onrender.com/api/posts';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupPost, setPopupPost] = useState(null); // selected post for popup

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data);
        else setError('Failed to fetch posts');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading blog posts...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-[#7c6a4c] mb-12 text-center">Case Studies & Blog</h2>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16">
          {posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onReadMore={() => setPopupPost(post)} 
            />
          ))}
        </div>
      )}

      {/* Popup modal */}
      {popupPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setPopupPost(null)}
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold text-[#23293a] mb-2">{popupPost.title}</h1>
            <h2 className="text-lg font-semibold text-[#7c6a4c] mb-4">{popupPost.slug}</h2>
            <p className="text-xs text-gray-500 mb-4">
              {new Date(popupPost.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}
            </p>
            <p className="text-gray-700">{popupPost.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
