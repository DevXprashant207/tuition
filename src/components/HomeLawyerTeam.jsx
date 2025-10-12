import React, { useEffect, useState } from 'react';
import LawyerCard from './LawyerCard';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function HomeLawyerTeam() {
  const [lawyers, setLawyers] = useState([]);
  const [startIdx, setStartIdx] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/api/lawyers`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setLawyers(data.data);
        } else {
          setLawyers([]);
        }
      })
      .catch((err) => console.error('Failed to fetch lawyers:', err));
  }, []);

  useEffect(() => {
    if (lawyers.length > 4) {
      const interval = setInterval(() => {
        setStartIdx((prev) => (prev + 1) % lawyers.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [lawyers]);

  const getImageUrl = (url) => {
    if (!url) return '/default-lawyer.png';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  // Only build visibleLawyers if data exists
  const visibleLawyers = lawyers.length
    ? Array.from({ length: Math.min(4, lawyers.length) }, (_, i) => lawyers[(startIdx + i) % lawyers.length])
    : [];

  const trackWidth = 4 * 240;
  const offset = -(startIdx * 240);

  return (
    <section className="relative py-16 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg font-bold text-[#23293a] mb-2 text-left tracking-widest uppercase">
          Team
        </h2>
        <h3 className="text-2xl md:text-5xl font-serif font-bold text-[#7c6a4c] mb-8 text-left leading-tight">
          Our Lawyer Team
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#bfa77a] to-[#7c6a4c] rounded mb-10 ml-0" />

        <div className="overflow-hidden pb-2 relative" style={{ height: '320px' }}>
          <div
            className="flex gap-8 absolute left-0 top-0 transition-transform duration-700"
            style={{ width: `${trackWidth}px`, transform: `translateX(${offset}px)` }}
          >
            {visibleLawyers.length > 0 ? (
              visibleLawyers.map((lawyer, idx) => {
                const imageSrc = getImageUrl(lawyer?.imageUrl);
                return (
                  <div className="min-w-[220px] max-w-xs" key={lawyer?._id || idx}>
                    <LawyerCard lawyer={lawyer} image={imageSrc} />
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500">No lawyers available.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLawyerTeam;
