
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
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
          <button className="text-left px-4 py-2 rounded hover:bg-[#bfa77a] hover:text-white transition">Dashboard</button>
          <button className="text-left px-4 py-2 rounded hover:bg-[#bfa77a] hover:text-white transition">Enquiries</button>
          <button className="text-left px-4 py-2 rounded hover:bg-[#bfa77a] hover:text-white transition">Lawyers</button>
          <button className="text-left px-4 py-2 rounded hover:bg-[#bfa77a] hover:text-white transition">Services</button>
          <button className="text-left px-4 py-2 rounded hover:bg-[#bfa77a] hover:text-white transition">Posts</button>
          <button className="text-left px-4 py-2 rounded hover:bg-[#bfa77a] hover:text-white transition">Media</button>
        </nav>
        <button className="mt-auto px-4 py-2 rounded bg-[#bfa77a] text-white font-semibold" onClick={() => {localStorage.removeItem('admin_token');navigate('/admin/login');}}>Logout</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">Enquiries Module (CRUD)</div>
          <div className="bg-white rounded-lg shadow p-6">Lawyers Module (CRUD)</div>
          <div className="bg-white rounded-lg shadow p-6">Services Module (CRUD)</div>
          <div className="bg-white rounded-lg shadow p-6">Posts Module (CRUD)</div>
          <div className="bg-white rounded-lg shadow p-6">Media Module (CRUD)</div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
