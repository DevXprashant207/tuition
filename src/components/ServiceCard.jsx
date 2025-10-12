import React from 'react';
import { useNavigate } from 'react-router-dom';

const icons = {
  'Intellectual Property': (
    <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4 text-[#7c6a4c]">
      <rect x="10" y="20" width="28" height="16" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="14" y="24" width="20" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="18" y="28" width="12" height="4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  Confidential: (
    <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4 text-[#7c6a4c]">
      <rect x="12" y="16" width="24" height="16" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M24 24v8" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="20" width="8" height="4" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  'Legal Protection': (
    <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-4 text-[#7c6a4c]">
      <path d="M24 8v32" stroke="currentColor" strokeWidth="2" />
      <path d="M12 24h24" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="10" ry="16" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
};

function ServiceCard({ name, slug }) {
  const navigate = useNavigate();
  const icon = icons[name] || icons['Intellectual Property'];

  return (
    <div className="flex flex-col items-start bg-[#f8f6f2] rounded-lg shadow p-8 border border-[#cfac33] h-full">
      {icon}
      <h3 className="text-lg font-bold text-[#cfac33] mb-2 uppercase tracking-wide">{name}</h3>
      <p className="text-gray-900 mb-6 line-clamp-2">
        {slug ? slug.replace(/-/g, ' ') : 'Click below to learn more.'}
      </p>
      <button
        onClick={() => navigate(`/services/${slug}`)}
        className="text-[#cfac33] font-semibold text-sm flex items-center gap-1 hover:underline"
      >
        LEARN MORE <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default ServiceCard;
