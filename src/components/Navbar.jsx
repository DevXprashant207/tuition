"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/HeaderLogo.png"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const computeEndTarget = () => {
      const footerEl = document.querySelector("#site-footer") || document.querySelector("footer")
      if (footerEl) {
        // top of footer relative to document
        const rect = footerEl.getBoundingClientRect()
        return Math.max(1, rect.top + window.scrollY)
      }
      // fallback: full document scrollable height
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }

    let endTarget = computeEndTarget()

    const handleScroll = () => {
      const y = window.scrollY
      const pct = Math.min(1, Math.max(0, y / endTarget))
      setProgress(pct)
    }

    const handleResize = () => {
      endTarget = computeEndTarget()
      handleScroll()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    // initialize on mount
    handleResize()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-100 bg-white sm:pl-16 px-6 py-3 flex items-center justify-between">
      {/* Progress track */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#B88A2F]/20" />
      {/* Progress bar */}
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-[2px] bg-[#B88A2F] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        
      />

      <div className="flex items-center gap-2">
        <img src={logo || "/placeholder.svg"} alt="Logo" className="h-12 w-32" />
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
            e.preventDefault()
            if (window.location.pathname !== "/") {
              window.location.href = "/#about-us"
            } else {
              document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" })
            }
            setOpen(false)
          }}
        >
          About us
        </a>
        <Link to="/admin/login" className="bg-[#B88A2F] text-white px-4 py-1 rounded font-semibold ml-2">
          Admin
        </Link>
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setOpen(false)} />
          <div
            className="absolute top-0 right-0 w-2/3 max-w-xs bg-[#f8f6f2] h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
            style={{ zIndex: 51 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link to="/lawyers" onClick={() => setOpen(false)}>
              Lawyers
            </Link>
            <Link to="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link to="/news" onClick={() => setOpen(false)}>
              News/Articles
            </Link>
            <a
              href="#about-us"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                if (window.location.pathname !== "/") {
                  window.location.href = "/#about-us"
                } else {
                  document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" })
                }
                setOpen(false)
              }}
            >
              About us
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
  )
}

export default Navbar
