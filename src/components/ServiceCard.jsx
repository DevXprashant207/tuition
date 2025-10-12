import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServiceCard({ name, slug, imageUrl }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start bg-[#f8f6f2] rounded-lg shadow p-6 border border-[#cfac33] h-full">
      {/* Render API Image if available, otherwise fallback icon */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

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
