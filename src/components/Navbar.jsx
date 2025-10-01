import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#f8f6f2] border-b border-[#e5e2dc] px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="https://i.imgur.com/1Q9Z1ZB.png" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-lg tracking-wide text-[#7c6a4c]">ATTORNA</span>
      </div>
      <div className="hidden md:flex gap-8 text-[#7c6a4c] font-medium">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/lawyers">Lawyers</Link>
        <Link to="/blog">Case study</Link>
  <Link to="/news">News</Link>
        <Link to="/about" >About us</Link>
  <Link to="/consultation" >Free Consultation</Link>
        <Link to="/admin/login" className="bg-[#bfa77a] text-white px-4 py-1 rounded font-semibold ml-2">Admin</Link>
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50" onClick={() => setOpen(false)}>
          <div className="absolute top-0 right-0 w-2/3 max-w-xs bg-[#f8f6f2] h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in" onClick={e => e.stopPropagation()}>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setOpen(false)}>Practice Area</Link>
            <Link to="/lawyers" onClick={() => setOpen(false)}>Lawyers</Link>
            <Link to="/blog" onClick={() => setOpen(false)}>Case study</Link>
            <Link to="/news" onClick={() => setOpen(false)}>News</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About us</Link>
            <Link to="/consultation" onClick={() => setOpen(false)}>Free Consultation</Link>
            <Link to="/admin/login" className="bg-[#bfa77a] text-white px-4 py-1 rounded font-semibold" onClick={() => setOpen(false)}>Admin</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
