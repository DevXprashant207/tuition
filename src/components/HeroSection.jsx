
import { useEffect, useState } from 'react';
import slider1 from '../assets/HeroSection/slider-item-1.jpg';
import slider2 from '../assets/HeroSection/slider-item-2.jpg';
import slider3 from '../assets/HeroSection/slider-item-3.jpg';
function HeroSection() {
  const images = [slider1, slider2, slider3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Lawbook themed background image
  const bgImage = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80';

  return (
    <section
      className="flex flex-col md:flex-row items-center justify-center gap-0 px-6 py-8 md:px-10 md:py-8 relative min-h-[500px] mt-0 md:mt-0"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-1 flex items-center justify-center h-[400px] md:h-[500px]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-full max-w-[650px] max-h-[400px] flex items-center justify-center">
          <img
            src={images[current]}
            alt={`Hero Slide ${current + 1}`}
            className="object-cover w-full h-full transition-all duration-700 ease-in-out animate-fade"
            style={{ aspectRatio: '16/7' }}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center h-[400px] md:h-[500px]">
        <div className="relative z-10 w-full max-w-[500px] text-left flex flex-col items-start justify-center h-full bg-transparent rounded-lg p-8">
          <h1 className="text-5xl md:text-5xl font-serif text-[#4c3a1a] mb-6 font-bold">Gupta Law Firm</h1>
          <p className="text-lg md:text-lg text-[#4e3b19] mb-6">
            We are a leading law firm in financial &amp; business industry.<br />
            With more than 20 years of experience.
          </p>
          <button className="bg-[#bfa77a] text-white px-7 py-3 rounded font-semibold mb-10 shadow hover:bg-[#a08a5c] transition-all">
            CONTACT NOW &rarr;
          </button>
          <div className="mt-8">
            <span className="block text-3xl font-signature text-[#4c3a1a] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>Naman Gupta</span>
            <span className="block text-xs tracking-widest text-[#7c6a4c]">CEO, GUPTA LAW FIRM</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
