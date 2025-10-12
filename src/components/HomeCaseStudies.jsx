import React, { useEffect, useState } from 'react';

import sliderImg from '../assets/HeroSection/slider-item-2.jpg';

function CaseCard({ title, category, description }) {
  return (
    <div className="flex flex-col items-center bg-[#f8f6f2] rounded-xl shadow-md p-4 transition-transform hover:-translate-y-1 hover:shadow-lg w-64 border border-[#e5e2dc]">
      <img src={sliderImg} alt={title} className="w-56 h-36 object-cover rounded-lg mb-3 border-2 border-[#e5e2dc]" />
      <h4 className="text-lg font-bold text-black mb-1 text-center font-serif">{title}</h4>
      <span className="text-sm text-[#cfac33] mb-1 text-center font-medium">{category}</span>
      <p className="text-xs text-black text-center mt-1 leading-relaxed">{description}</p>
    </div>
  );
}

function HomeCaseStudies() {
  const [index, setIndex] = useState(0);
  const cases = [
    {
      title: 'Family Law Victory',
      category: 'Family Law',
      description: 'Secured custody rights for our client in a complex family dispute, ensuring child welfare and parental justice.'
    },
    {
      title: 'Corporate Dispute Resolution',
      category: 'Corporate Law',
      description: 'Resolved a multi-million dollar shareholder conflict, protecting business interests and future growth.'
    },
    {
      title: 'Property Settlement Success',
      category: 'Real Estate',
      description: 'Negotiated a favorable property settlement for a client, overcoming legal and regulatory hurdles.'
    },
    {
      title: 'Criminal Defense Acquittal',
      category: 'Criminal Law',
      description: 'Achieved acquittal for a client in a high-profile criminal case, demonstrating expert legal strategy.'
    },
    {
      title: 'Insurance Claim Win',
      category: 'Insurance Law',
      description: 'Won a disputed insurance claim, securing financial relief for our client against a major insurer.'
    },
  ];
  const visibleCount = 3;
  const visible = cases.slice(index, index + visibleCount);
  while (visible.length < visibleCount) visible.push(...cases.slice(0, visibleCount - visible.length));

  const next = () => setIndex((prev) => (prev + 1) % cases.length);
  const prev = () => setIndex((prev) => (prev - 1 + cases.length) % cases.length);

  return (
  <section className="relative py-10 px-2 md:px-8 bg-gradient-to-br from-[#f8f6f2] to-[#e5e2dc]">
      <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
        <span className="text-[7vw] font-bold uppercase text-[#e5e2dc] opacity-20 mb-2" style={{letterSpacing: '0.1em'}}>CASE STUDIES</span>
        {/* <span className="text-lg md:text-2xl font-serif text-[#bfa77a] opacity-30 max-w-2xl text-center px-2">
          Real results for real clients. Explore our proven track record in family, corporate, real estate, criminal, and insurance law. Each case study highlights our commitment to excellence and justice.
        </span> */}
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black drop-shadow-lg">Case Studies</h2>
          <a href="/blog" className="text-[#cfac33] font-semibold text-base flex items-center gap-1 hover:underline">VIEW ALL CASES &rarr;</a>
        </div>
        <div className="flex gap-6 justify-center mb-8 flex-wrap">
          {visible.map((c, i) => <CaseCard key={i} {...c} />)}
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-white border-2 border-[#cfac33] flex items-center justify-center text-[#cfac33] text-xl font-bold shadow hover:bg-[#fff2c5] transition-all">&#60;</button>
          <button onClick={next} className="w-12 h-12 rounded-full bg-white border-2 border-[#cfac33] flex items-center justify-center text-[#cfac33] text-xl font-bold shadow hover:bg-[#fff2c5] transition-all">&#62;</button>
        </div>
      </div>
    </section>
  );
}

export default HomeCaseStudies;
