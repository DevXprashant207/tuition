import { useEffect, useState } from 'react';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://law-firm-backend-e082.onrender.com/api/news/')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, []);

  return (
    <section className="min-h-screen bg-[#f8f6f2] py-12 px-4 font-serif">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#23293a] mb-8 text-center">Latest News</h1>

        {loading && <div className="text-center text-[#bfa77a]">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        <div className="grid md:grid-cols-2 gap-8">
          {news.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-[#e5e2dc] flex flex-col"
            >
              <h2 className="text-2xl font-bold text-[#7c6a4c] mb-2">{item.title}</h2>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline mb-2"
                >
                  Source Link
                </a>
              )}
              <p className="text-[#23293a] mb-2 line-clamp-4">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;
