import React, { useEffect, useState } from 'react';
import LawyerCard from './LawyerCard';
import testImage from '../assets/HeroSection/slider-item-1.jpg';

function HomeLawyerTeam() {
  const [lawyers, setLawyers] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  useEffect(() => {
    fetch('https://law-firm-backend-e082.onrender.com/api/lawyers')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLawyers(data.data);
        }
      });
  }, []);

  useEffect(() => {
    if (lawyers.length > 4) {
      const interval = setInterval(() => {
        setStartIdx(prev => (prev + 1) % lawyers.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [lawyers]);

  // Show 4 lawyers at a time, sliding one by one
  const visibleLawyers = [];
  for (let i = 0; i < 4; i++) {
    visibleLawyers.push(lawyers[(startIdx + i) % lawyers.length]);
  }

  // Track animation: move the cards horizontally
  const trackWidth = 4 * 240; // 4 cards, each ~240px wide
  const offset = -(startIdx * 240);

  return (
    <section className="relative py-16 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg font-bold text-[#23293a] mb-2 text-left tracking-widest uppercase">Team</h2>
        <h3 className="text-2xl md:text-5xl font-serif font-bold text-[#7c6a4c] mb-8 text-left leading-tight">Our Lawyer Team</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#bfa77a] to-[#7c6a4c] rounded mb-10 ml-0" />
        <div className="overflow-hidden pb-2 relative" style={{height: '320px'}}>
          <div
            className="flex gap-8 absolute left-0 top-0 transition-transform duration-700"
            style={{width: `${trackWidth}px`, transform: `translateX(${offset}px)`}}
          >
            {lawyers.map((lawyer, idx) => (
              <div className="min-w-[220px] max-w-xs" key={lawyer.id || idx}>
                <LawyerCard lawyer={lawyer} image={testImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLawyerTeam;
