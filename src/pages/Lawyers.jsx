
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
    <div className="min-h-screen bg-[#f8f6f2] font-serif w-screen p-0 m-0 max-w-none">
      <div className="w-screen px-0 py-8 max-w-none">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8 px-8">Our Lawyers</h1>
        {loading && <div className="text-[#bfa77a] px-8">Loading...</div>}
        {error && <div className="text-red-600 px-8">{error}</div>}
        <div className="flex flex-wrap gap-8 w-screen px-8">
          {lawyers.map(lawyer => (
            <div className="flex-grow min-w-[320px] max-w-none">
              <LawyerCard key={lawyer.id} lawyer={lawyer} image={testImage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lawyers;
