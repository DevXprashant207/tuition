import { useEffect, useState } from 'react';
import LawyersModule from './LawyersModule';
import EnquiriesModule from './EnquiriesModule';
import MediaModule from './MediaModule';
import NewsModule from './NewsModule';
import PostsModule from './PostsModule';
import ServicesModule from './ServicesModule';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  // State for counts
  const [counts, setCounts] = useState({
    news: 0,
    lawyers: 0,
    posts: 0,
    services: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');

    // Fetch counts
    const fetchCounts = async () => {
      try {
        const [newsRes, lawyersRes, postsRes, servicesRes] = await Promise.all([
          fetch('https://law-firm-backend-e082.onrender.com/api/news/').then(res => res.json()),
          fetch('https://law-firm-backend-e082.onrender.com/api/lawyers').then(res => res.json()),
          fetch('https://law-firm-backend-e082.onrender.com/api/posts/').then(res => res.json()),
          fetch('https://law-firm-backend-e082.onrender.com/api/services/').then(res => res.json())
        ]);

        setCounts({
           news: Array.isArray(newsRes) ? newsRes.length : 0,
          lawyers: lawyersRes.data?.length || 0,
          posts: postsRes.data?.length || 0,
          services: servicesRes.data?.length || 0
      });
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchCounts();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23293a] text-white flex flex-col py-8 px-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-[#bfa77a] rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
            </svg>
          </span>
          <span className="font-bold text-lg">Sterling & Associates</span>
        </div>
        <nav className="flex flex-col gap-4">
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='dashboard' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('dashboard')}>Dashboard</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='enquiries' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('enquiries')}>Enquiries</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='lawyers' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('lawyers')}>Lawyers</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='services' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('services')}>Services</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='posts' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('posts')}>Blogs & Articles</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='news' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('news')}>News</button>
        </nav>
        <button className="mt-auto px-4 py-2 rounded bg-[#bfa77a] text-white font-semibold" onClick={() => {localStorage.removeItem('token');navigate('/admin/login');}}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8">Admin Dashboard</h1>

        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-[#23293a] mb-2">News</h2>
              <p className="text-3xl font-bold text-[#bfa77a]">{counts.news}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-[#23293a] mb-2">Lawyers</h2>
              <p className="text-3xl font-bold text-[#bfa77a]">{counts.lawyers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-[#23293a] mb-2">Posts</h2>
              <p className="text-3xl font-bold text-[#bfa77a]">{counts.posts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-[#23293a] mb-2">Services</h2>
              <p className="text-3xl font-bold text-[#bfa77a]">{counts.services}</p>
            </div>
          </div>
        )}

        {activeSection === 'lawyers' && <LawyersModule />}
        {activeSection === 'enquiries' && <EnquiriesModule />}
        {activeSection === 'posts' && <PostsModule />}
        {activeSection === 'services' && <ServicesModule />}
        {activeSection === 'news' && <NewsModule />}
      </main>
    </div>
  );
}

export default AdminDashboard;
