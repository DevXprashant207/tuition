import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Gupta_law_office.png';

function EnquiryPopup({ targetId, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.location.pathname === '/') {
      const formSection = document.getElementById(targetId);
      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const formSection = document.getElementById(targetId);
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-11/12 max-w-lg flex flex-col items-center animate-fade-in">
        <h3 className="text-2xl font-bold text-[#23293a] mb-4 text-center">Need Legal Assistance?</h3>
        <p className="text-gray-700 mb-6 text-center text-sm">
         Need assistance or want to consult with our lawyers?
          Click below to raise an enquiry. 
         We’ll make sure your request is handled promptly.
        </p>
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={handleClick}
            className="bg-[#cfac33] hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded transition"
          >
            Raise Enquiry
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <nav className="bg-[#f8f6f2] border-b border-[#e5e2dc] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={goHome}>
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-lg tracking-wide text-[#000000]">Gupta Law Offices</span>
        </div>

        <div className="hidden md:flex gap-8 text-[#000000] font-medium">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/lawyers">Lawyers</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/news">News/Articles</Link>
          <a
            href="#about-us"
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/') {
                window.location.href = '/#about-us';
              } else {
                document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
              }
              setOpen(false);
            }}
          >
            About us
          </a>
          <Link
            to="/admin/login"
            className="bg-[#cfac33] text-white px-4 py-1 rounded font-semibold ml-2"
          >
            Admin
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
          <span
            className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}
          ></span>
          <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span
            className={`block w-6 h-0.5 bg-[#7c6a4c] transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}
          ></span>
        </button>

        {open && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setOpen(false)}></div>
            <div
              className="absolute top-0 right-0 w-2/3 max-w-xs bg-[#f8f6f2] h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
              style={{ zIndex: 51 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
              <Link to="/lawyers" onClick={() => setOpen(false)}>Lawyers</Link>
              <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
              <Link to="/news" onClick={() => setOpen(false)}>News/Articles</Link>
              <a
                href="#about-us"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== '/') {
                    window.location.href = '/#about-us';
                  } else {
                    document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setOpen(false);
                }}
              >
                About us
              </a>
              <Link
                to="/admin/login"
                className="bg-[#cfac33] text-white px-4 py-1 rounded font-semibold"
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>

      {showPopup && <EnquiryPopup targetId="consultation" onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default Navbar;
