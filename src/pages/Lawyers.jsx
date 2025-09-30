
import { useEffect, useState } from 'react';
import LawyerCard from '../components/LawyerCard';
import testImage from '../assets/HeroSection/slider-item-1.jpg';

function Lawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://law-firm-backend-e082.onrender.com/api/lawyers')
      .then(res => res.json())
      .then(result => {
        if (result.success && Array.isArray(result.data)) {
          setLawyers(result.data);
        } else {
          setLawyers([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load lawyers.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif px-4 py-10">
      <h1 className="text-3xl font-bold text-[#23293a] mb-8">Our Lawyers</h1>
      {loading && <div className="text-[#bfa77a]">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16">
        {lawyers.map(lawyer => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} image={testImage} />
        ))}
      </div>
    </div>
  );
}

export default Lawyers;
