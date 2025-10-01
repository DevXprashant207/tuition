import React, { useState } from 'react';

const testimonials = [
  {
    name: 'Jennth White',
    location: 'San Francisco',
    text: 'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Christopher Thompson',
    location: 'Washington',
    text: 'The legal team exceeded my expectations. They were professional, responsive, and truly cared about my case. Highly recommended!',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Elizabeth Brown',
    location: 'Los Angeles',
    text: 'I felt supported throughout the process. The lawyers explained everything clearly and made me feel confident in my decisions.',
    stars: 4.5,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Michael Lee',
    location: 'New York',
    text: 'Excellent service and attention to detail. The team handled my case with expertise and compassion.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    name: 'Priya Sharma',
    location: 'Chicago',
    text: 'Very professional and knowledgeable lawyers. I am grateful for their help and would recommend them to anyone.',
    stars: 4.5,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'David Kim',
    location: 'Houston',
    text: 'Quick response and great results. The team made a stressful situation much easier to handle.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
];

function StarRating({ stars }) {
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1 >= 0.5;
  return (
    <span className="flex gap-1 text-[#bfa77a] text-xl">
      {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
      {halfStar && <span>☆</span>}
    </span>
  );
}

function HomeTestimonials() {
  const [active, setActive] = useState(1);
  const [direction, setDirection] = useState('');

  const handleNav = (i) => {
    setDirection(i > active ? 'right' : 'left');
    setTimeout(() => setActive(i), 150);
  };

  return (
    <section className="relative py-16 px-2 md:px-10 bg-[#f8f6f2]">
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none select-none">
        <span className="text-[7vw] font-bold uppercase text-[#e5e2dc] opacity-10 md:opacity-15" style={{letterSpacing: '0.1em'}}>TESTIMONIALS</span>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center mb-10">What Our Clients Say</h2>
        <div className="flex gap-6 justify-center items-stretch">
          {testimonials.map((t, i) => {
            let anim = '';
            if (i === active) anim = direction === 'right' ? 'animate-slide-in-right' : direction === 'left' ? 'animate-slide-in-left' : '';
            else if (i < active) anim = 'animate-slide-out-left';
            else if (i > active) anim = 'animate-slide-out-right';
            return (
              <div key={i} className={`bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md transition-all duration-300 ${i === active ? 'scale-105 z-10 border-2 border-[#bfa77a] shadow-xl' : 'opacity-60 scale-95'} ${anim}`} style={{minWidth: '280px'}}>
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#e5e2dc]" />
                  <div>
                    <div className="font-bold text-lg text-[#23293a]">{t.name}</div>
                    <div className="text-sm text-[#bfa77a]">{t.location}</div>
                  </div>
                  <div className="ml-auto"><StarRating stars={t.stars} /></div>
                </div>
                <div className="text-[#23293a] text-base leading-relaxed italic">{t.text}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} className={`w-3 h-3 rounded-full ${i === active ? 'bg-[#bfa77a]' : 'bg-[#e5e2dc]'}`} onClick={() => handleNav(i)} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slide-in-right { 0% { opacity: 0; transform: translateX(100px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-left { 0% { opacity: 0; transform: translateX(-100px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slide-out-right { 0% { opacity: 1; transform: translateX(0); } 100% { opacity: 0; transform: translateX(100px); } }
        @keyframes slide-out-left { 0% { opacity: 1; transform: translateX(0); } 100% { opacity: 0; transform: translateX(-100px); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s; }
        .animate-slide-in-left { animation: slide-in-left 0.3s; }
        .animate-slide-out-right { animation: slide-out-right 0.3s; }
        .animate-slide-out-left { animation: slide-out-left 0.3s; }
      `}</style>
    </section>
  );
}

export default HomeTestimonials;
