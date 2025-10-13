import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function EnquiryPopup({ targetId, onClose }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.location.pathname === '/') {
      const formSection = document.getElementById(targetId);
      if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const formSection = document.getElementById(targetId);
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-11/12 max-w-lg flex flex-col items-center animate-fade-in">
        <h3 className="text-2xl font-bold text-[#23293a] mb-4 text-center">Need Legal Assistance?</h3>
        <p className="text-gray-700 mb-6 text-center text-sm">
         Need assistance or want to consult with our lawyers?
          Click below to raise an enquiry. 
         We’ll make sure your request is handled promptly.
        </p>
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={handleClick}
            className="bg-[#cfac33] hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded transition"
          >
            Raise Enquiry
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default EnquiryPopup;