"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/HeaderLogo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const computeEndTarget = () => {
      const footerEl = document.querySelector("#site-footer") || document.querySelector("footer");
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        return Math.max(1, rect.top + window.scrollY);
      }
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    let endTarget = computeEndTarget();

    const handleScroll = () => {
      const y = window.scrollY;
      const pct = Math.min(1, Math.max(0, y / endTarget));
      setProgress(pct);
    };

    const handleResize = () => {
      endTarget = computeEndTarget();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinkClasses = `
    relative pb-1
    after:content-[''] 
    after:absolute 
    after:left-0 
    after:bottom-0 
    after:w-full 
    after:h-[2px] 
    after:bg-[#B88A2F] 
    after:scale-x-0 
    after:origin-left 
    after:transition-transform 
    after:duration-300 
    after:ease-out
    hover:after:scale-x-100
  `;

  return (
    <nav className="sticky top-0 z-[100] bg-white px-6 md:px-10 h-16 flex items-center justify-between shadow-md">
      {/* Progress track */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#B88A2F]/20" />
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-[2px] bg-[#B88A2F]"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Logo */}
      <div className="flex items-center">
        <img src={logo || "/placeholder.svg"} alt="Logo" className="h-13 w-35" />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 text-[#000000] font-medium items-center">
        <Link to="/" className={navLinkClasses}>Home</Link>
        <Link to="/subjects" className={navLinkClasses}>Subjects</Link>
        <Link to="/tutors" className={navLinkClasses}>Tutors</Link>
        <Link to="/becomeaTutor" className={navLinkClasses}>Become a Tutor</Link>
        <Link to="/hireTutor" className={navLinkClasses}>Hire Tutor</Link>
        <Link to="/Articles" className={navLinkClasses}>Articles</Link>
        <a
          href="#about-us"
          className={navLinkClasses}
          onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname !== "/") {
              window.location.href = "/#about-us";
            } else {
              document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
            }
            setOpen(false);
          }}
        >
          About Us
        </a>
        <Link
          to="/admin/login"
          className="bg-[#B88A2F] text-white px-4 py-1 rounded font-semibold ml-2"
        >
          Admin
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setOpen(false)} />
          <div
            className="absolute top-0 right-0 w-2/3 max-w-xs bg-[#f8f6f2] h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
            style={{ zIndex: 51 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" className={navLinkClasses}>Home</Link>
        <Link to="/subjects" className={navLinkClasses}>Subjects</Link>
        <Link to="/tutors" className={navLinkClasses}>Tutors</Link>
        <Link to="/becomeaTutor" className={navLinkClasses}>Become a Tutor</Link>
        <Link to="/hireTutor" className={navLinkClasses}>Hire Tutor</Link>
        <Link to="/Articles" className={navLinkClasses}>Articles</Link>
            <a
              href="#about-us"
              className={navLinkClasses}
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== "/") {
                  window.location.href = "/#about-us";
                } else {
                  document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
                }
                setOpen(false);
              }}
            >
              About Us
            </a>
            <Link
              to="/admin/login"
              className="bg-[#B88A2F] text-white px-4 py-1 rounded font-semibold"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
