import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

import HeroSection from "./components/HeroSection";
import HomeAboutUs from "./components/HomeAboutUs";
import HomeServices from "./components/HomeServices";
import HomeLawyerTeam from "./components/HomeLawyerTeam";
import HomeStats from "./components/HomeStats";
import HomeTestimonials from "./components/HomeTestimonials";
import HomeCaseStudies from "./components/HomeCaseStudies";
import ConsultationForm from "./components/ConsultationForm";

import Tutors from "./pages/TutorPage";
import Subjects from "./pages/SubjectPage";
import Articles from "./pages/Articles";

import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetail";
import Lawyers from "./pages/Lawyers";
import BecomeTutor from "./pages/Blog";
import HireTutor from "./pages/HireTutor";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import AdminNews from "./pages/AdminNews";
import AdminDashboard from "./pages/AdminDashboard";

import TutorPopupModal from "./components/TutorPopupModal";

import "./App.css";

function App() {
  const location = useLocation();
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  const handleAgree = () => {
    setHasAgreed(true);
    setShowDisclaimer(false);
  };

  // ✅ Hide Navbar, Topbar & Footer on Admin routes
  const hideLayout =
    location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";

  return (
    <div>
      <div
        className={`min-h-screen bg-white font-serif flex flex-col relative transition-all duration-500 ${
          showDisclaimer ? "blur-sm scale-[0.99]" : ""
        }`}
      >
        {/* ✅ Render Navbar + Topbar only when not on admin dashboard */}
        {!hideLayout && (
          <>
            <Topbar />
            <hr className="border-t border-[#cbb26a] opacity-70" />
            <Navbar />
          </>
        )}

        <div className="flex-1">
          <Routes>
            {/* 🏠 Home */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <HomeAboutUs />
                  <HomeServices />
                  <HomeLawyerTeam />
                  <HomeStats />
                  <HomeTestimonials />
                  <HomeCaseStudies />
                  {hasAgreed && <ConsultationForm />}
                </>
              }
            />

            {/* 🔗 Main Pages */}
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/becomeaTutor" element={<BecomeTutor />} />
            <Route path="/hireTutor" element={<HireTutor />} />
            <Route path="/articles" element={<Articles />} />

            {/* 🧩 Other Routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        {/* ✅ Render Footer only when not on admin dashboard */}
        {!hideLayout && <Footer />}
      </div>

      {/* Disclaimer Popup */}
      {showDisclaimer && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <TutorPopupModal onClose={() => setShowDisclaimer(false)} />
        </div>
      )}

      {/* ✅ Floating Action Buttons */}
      {!hideLayout && (
        <>
          <a
            href="https://wa.me/9118706214"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full 
            bg-gradient-to-br from-green-500 to-green-600 text-white shadow-[0_0_20px_rgba(37,211,102,0.5)] 
            hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] backdrop-blur-md 
            border border-white/20 hover:scale-110 transition-all duration-300 ease-out"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" strokeWidth={2.2} />
          </a>

          <a
            href="tel:+91 9118706214"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full 
            bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_0_20px_rgba(10,102,194,0.5)] 
            hover:shadow-[0_0_30px_rgba(10,102,194,0.8)] backdrop-blur-md 
            border border-white/20 hover:scale-110 transition-all duration-300 ease-out"
            title="Call Now"
          >
            <Phone className="w-6 h-6" strokeWidth={2.2} />
          </a>
        </>
      )}
    </div>
  );
}

export default App;
