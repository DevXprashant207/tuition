
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HomeServices from './components/HomeServices';
import HomeLawyerTeam from './components/HomeLawyerTeam';
import HomeStats from './components/HomeStats';
import HomeCaseStudies from './components/HomeCaseStudies';
import ConsultationForm from './components/ConsultationForm';
import Services from './pages/Services';
import Lawyers from './pages/Lawyers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import './App.css';

function App() {
  return (
      <div className="min-h-screen bg-[#f8f6f2] font-serif flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <HomeServices />
                <HomeLawyerTeam />
                <HomeStats />
                <HomeCaseStudies />
                <ConsultationForm />
              </>
            } />
            <Route path="/consultation" element={<ConsultationForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
        <Footer />
    </div>
  );
}

export default App;
