import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react"; // ✅ Import icons
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
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetail";
import Lawyers from "./pages/Lawyers";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import AdminNews from "./pages/AdminNews";

import TutorPopupModal from "./components/TutorPopupModal";
import "./App.css";

function App() {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // 👇 Show disclaimer on every reload (no localStorage)
  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  const handleAgree = () => {
    setHasAgreed(true);
    setShowDisclaimer(false);
  };

  return (
    <div>
      <div
        className={`min-h-screen bg-white font-serif flex flex-col relative transition-all duration-500 ${
          showDisclaimer ? "blur-sm scale-[0.99]" : ""
        }`}
      >
        <Topbar />
        {/* Horizontal Line after Topbar */}
        <hr className="border-t border-[#cbb26a] opacity-70" />
        <Navbar />

        <div className="flex-1">
          <Routes>
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
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/news" element={<AdminNews />} />
          </Routes>
        </div>

        <Footer />
      </div>

      {/* Disclaimer / Popup */}
      {showDisclaimer && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <TutorPopupModal onClose={() => setShowDisclaimer(false)} />
        </div>
      )}

            {/* ✅ Floating Action Buttons — Professional Design */}
      <a
        href="https://wa.me/9118706214" // replace with your WhatsApp number
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
        href="tel:+91 9118706214" // replace with your phone number
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full 
        bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_0_20px_rgba(10,102,194,0.5)] 
        hover:shadow-[0_0_30px_rgba(10,102,194,0.8)] backdrop-blur-md 
        border border-white/20 hover:scale-110 transition-all duration-300 ease-out"
        title="Call Now"
      >
        <Phone className="w-6 h-6" strokeWidth={2.2} />
      </a>

    </div>
  );
}

export default App;
