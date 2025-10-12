import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import LawyerCard from '../components/LawyerCard';
import testImage from '../assets/HeroSection/slider-item-1.jpg';
const API_BASE = 'https://law-firm-backend-e082.onrender.com';


function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupService, setPopupService] = useState(null); // popup service

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setServices(data.data);
        else setError('Failed to fetch services');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch services');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading services...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-full mx-auto py-16 px-40 bg-white">
      <h2 className="text-5xl font-bold text-black mb-12 text-center">Our Services</h2>

      {services.length === 0 ? (
        <div className="text-center text-gray-500">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.slice(0, 6).map(service => (
            <ServiceCard
              key={service.id}
              name={service.name}
              slug={service.slug}
              onLearnMore={() => setPopupService(service)}
            />
          ))}
        </div>
      )}

      {/* Popup */}
      {popupService && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setPopupService(null)}
            >
              ✕
            </button>

            <h1 className="text-2xl font-bold text-[#23293a] mb-2">{popupService.name}</h1>
            <h2 className="text-lg font-semibold text-[#7c6a4c] mb-4">{popupService.slug}</h2>
            <p className="text-gray-700 mb-6 max-h-40 overflow-y-auto">{popupService.description}</p>

            <h3 className="text-xl font-bold text-[#7c6a4c] mb-4">Our Lawyers</h3>
            {popupService.lawyers.length === 0 ? (
              <p className="text-gray-500">No lawyers available for this service.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popupService.lawyers.map((lawyer, idx) => (
                  <div key={idx} className="w-40 mx-auto">
                    <LawyerCard
                      lawyer={lawyer}
                      image={lawyer.imageUrl || testImage}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
