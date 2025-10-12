import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Services from './pages/Services';
import Lawyers from './pages/Lawyers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';
import News from './pages/News';          // ✅ Add this
import NewsDetail from './pages/NewsDetail'; // ✅ Add this
import AdminLogin from './pages/AdminLogin';
import ServiceDetails from './pages/ServiceDetail';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="lawyers" element={<Lawyers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News />} /> {/* ✅ Added */}
          <Route path="news/:id" element={<NewsDetail />} /> {/* ✅ Added */}
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
