import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';

const API_BASE = 'https://law-firm-backend-e082.onrender.com';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // only take first 6 for homepage
          setServices(data.data.slice(0, 6));
        } else {
          setError('Failed to fetch services');
        }
      })
      .catch(() => setError('Failed to fetch services'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading services...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-5xl font-bold text-[#000000] mb-12 text-center">Our Services</h2>

      {services.length === 0 ? (
        <div className="text-center text-gray-500">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service._id || service.id}
              name={service.name}
              slug={service.slug}
              imageUrl={service.imageUrl ? `${API_BASE}${service.imageUrl}` : null} // pass full API image URL
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
