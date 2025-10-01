
import { useEffect, useState } from 'react';
import LawyersModule from './LawyersModule';
import EnquiriesModule from './EnquiriesModule';
import MediaModule from './MediaModule';
import PostsModule from './PostsModule';
import ServicesModule from './ServicesModule';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23293a] text-white flex flex-col py-8 px-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-[#bfa77a] rounded-full p-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg></span>
          <span className="font-bold text-lg">Sterling & Associates</span>
        </div>
        <nav className="flex flex-col gap-4">
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='dashboard' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('dashboard')}>Dashboard</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='enquiries' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('enquiries')}>Enquiries</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='lawyers' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('lawyers')}>Lawyers</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='services' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('services')}>Services</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='posts' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('posts')}>Posts</button>
          <button className={`text-left px-4 py-2 rounded transition ${activeSection==='media' ? 'bg-[#bfa77a] text-white' : 'hover:bg-[#bfa77a] hover:text-white'}`} onClick={() => setActiveSection('media')}>Media</button>
        </nav>
        <button className="mt-auto px-4 py-2 rounded bg-[#bfa77a] text-white font-semibold" onClick={() => {localStorage.removeItem('admin_token');navigate('/admin/login');}}>Logout</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8">Admin Dashboard</h1>
        {activeSection === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">Welcome to the Admin Dashboard. Select a section from the sidebar.</div>
          </div>
        )}
        {activeSection === 'lawyers' && (
          <div className="bg-white rounded-lg shadow p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#23293a] mb-6 text-center">Manage Lawyers</h2>
            <LawyersModule />
          </div>
        )}
        {activeSection === 'enquiries' && (
          <EnquiriesModule />
        )}
        {activeSection === 'media' && (
          <MediaModule />
        )}
        {activeSection === 'posts' && (
          <PostsModule />
        )}
        {activeSection === 'services' && (
          <ServicesModule />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
