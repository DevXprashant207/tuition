function HomeAboutUs() {
  return (
    <section id="about-us" className="relative py-20 px-4 md:px-0 bg-[#f3f3f3] flex justify-center items-center">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h3 className="uppercase text-[#23293a] font-bold tracking-widest text-lg mb-2">About Gupta Law Firm</h3>
          <div className="w-12 h-1 bg-[#bfa77a] mb-6" />
          <p className="text-[#000000] text-lg leading-relaxed mb-8">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river.
          </p>
          <div className="mt-8 mb-2">
            <span className="block text-3xl font-signature text-[#000000] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>Naman Gupta</span>
            <span className="block text-xs tracking-widest text-[#000000]">CEO &amp; Founder of Gupta Law Firm</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-[#232220]">
          <img src={slider2} alt="About Gupta Law Firm" className="w-full h-full object-cover" style={{maxHeight: '400px'}} />
        </div>
      </div>
    </section>
  );
}

import slider2 from '../assets/HeroSection/slider-item-2.jpg';
export default HomeAboutUs;
