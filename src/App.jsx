import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
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
import AdminEnquiries from "./pages/AdminEnquiries";
import DisclaimerModal from "./components/DisclaimerModal";
import "./App.css";

function App() {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem("disclaimerAgreed");
    if (agreed === "true") {
      setHasAgreed(true);
    } else {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("disclaimerAgreed", "true");
    setHasAgreed(true);
    setShowDisclaimer(false);
  };

  return (
    <div>
      <div
        className={`min-h-screen bg-[#f8f6f2] font-serif flex flex-col relative transition-all duration-500 ${
          showDisclaimer ? "blur-sm scale-[0.99]" : ""
        }`}
      >
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
                  {/* 👇 Show Enquiry only if user agreed */}
                  {hasAgreed && <ConsultationForm />}
                </>
              }
            />
            <Route path="/consultation" element={<ConsultationForm />} />
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
            <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          </Routes>
        </div>

        <Footer />
      </div>

      {/* 👇 Show Disclaimer Modal on top */}
      {showDisclaimer && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <DisclaimerModal onAgree={handleAgree} />
        </div>
      )}
    </div>
  );
}

export default App;
