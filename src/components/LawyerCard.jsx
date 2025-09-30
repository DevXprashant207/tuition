function LawyerCard({ lawyer, image }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow p-0 flex flex-col items-start border border-[#e5e2dc] h-full w-full max-w-xs mx-auto">
      <img src={image} alt={lawyer.name} className="w-full h-48 object-cover rounded-t-xl" />
      <div className="px-5 py-4 w-full">
        <h3 className="text-xs font-bold text-[#23293a] mb-1 uppercase tracking-wide">{lawyer.name}</h3>
        <p className="text-xs text-[#7c6a4c] mb-3">{lawyer.title || 'Partner'}</p>
        <div className="flex gap-4 text-[#bfa77a] mb-1">
          <a href="#" aria-label="LinkedIn"><svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M5 7V16" stroke="currentColor" strokeWidth="1.5"/><circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5"/><rect x="8" y="9" width="8" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
          <a href="#" aria-label="Pinterest"><svg width="16" height="16" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 7.5V10L12 12" stroke="currentColor" strokeWidth="1.5"/></svg></a>
          <a href="#" aria-label="Twitter"><svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M17 5c-.5.5-1.5 1-2.5 1.25C14 5 13 4.5 12 4.5c-2 0-3.5 1.5-3.5 3.5 0 .25 0 .5.05.75C6 8.5 4.5 8 3.5 7c-.5.75-.25 1.5.5 2C4 9.5 3.5 9.5 3.5 9.5c.5 1 1.5 1.5 2.5 1.5-.5.5-1.5.75-2.5.75.5.5 1.5 1 2.5 1C8 14 9.5 14.5 11 14.5c4.5 0 7-3.75 7-7v-.5c.5-.5 1-1.5 1-2.5z" stroke="currentColor" strokeWidth="1.5"/></svg></a>
        </div>
      </div>
    </div>
  );
}

export default LawyerCard;
