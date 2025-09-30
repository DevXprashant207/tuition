import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

function HomeServices() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch('https://law-firm-backend-e082.onrender.com/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setServices(data.data.slice(0, 10));
        }
      });
  }, []);

  return (
  <section className="relative py-20 px-4 md:px-10 bg-white">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[7vw] font-bold uppercase text-[#bfa77a] opacity-10" style={{letterSpacing: '0.2em'}}>practice</span>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg font-bold text-[#23293a] mb-2 text-left tracking-widest uppercase">Our Expertise</h2>
        <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#7c6a4c] mb-6 text-left leading-tight">Legal Practice Areas</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#bfa77a] to-[#7c6a4c] rounded mb-10 ml-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map(service => (
            <div className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
              <ServiceCard key={service.id} name={service.name} description={service.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeServices;
