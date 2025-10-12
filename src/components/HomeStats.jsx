import React, { useEffect, useState } from 'react';

const stats = [
  { value: 1000, suffix: '+', label: 'Client Consultations' },
  { value: 95, suffix: '%', label: 'Successful Cases' },
  { value: 10, suffix: 'm', label: 'Recovered cost for clients' },
  { value: 30, suffix: '+', label: 'Professional Attorneys' },
];

function StatCard({ value, suffix, label, duration = 1200 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 100);
    return () => clearInterval(timer);
  }, [value, duration]);
  return (
    <div className="flex flex-col items-center justify-center px-2 md:px-8">
      <div className="text-4xl md:text-5xl font-serif text-[#23293a] font-bold mb-2">
        {count}{suffix}
      </div>
      <div className="text-base md:text-lg text-[#cfac33] font-medium mb-1 text-center">{label}</div>
    </div>
  );
}

function HomeStats() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between divide-x md:divide-x-0 divide-[#e5e2dc]">
        {stats.map((stat, idx) => (
          <div className="w-full md:w-auto" key={idx}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 767px) {
          .home-stats-sep > div:not(:last-child) {
            margin-bottom: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}

export default HomeStats;
