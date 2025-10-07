import React, { useState } from 'react';

const API_BASE = 'http://localhost:3000';

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.imageUrl) {
        onUpload(data.imageUrl);
      } else {
        setError('Upload failed.');
      }
    } catch (err) {
      setError('Upload error.');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="button" className="bg-[#bfa77a] text-white px-3 py-1 rounded" onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default ImageUploader;
