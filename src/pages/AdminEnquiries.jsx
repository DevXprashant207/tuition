import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:3000/api/admin/enquiries';
const ACTIONS = [
  { label: 'Complete', value: 'complete' },
  { label: 'Not Interested', value: 'not_interested' },
  { label: 'Irrelevant', value: 'irrelevant' },
  { label: 'Delete', value: 'delete' },
];

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch enquiries with token
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const res = await fetch(API_BASE, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) {
        throw new Error('Unauthorized: Invalid or missing token.');
      }

      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setEnquiries(data.data);
      } else {
        setEnquiries([]);
      }

    } catch (err) {
      setError(err.message || 'Failed to fetch enquiries.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ✅ Handle actions like delete, mark complete, etc.
  const handleAction = async (id, action) => {
    const token = localStorage.getItem('token');

    if (action === 'delete') {
      if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

      try {
        const res = await fetch(`${API_BASE}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to delete enquiry.');

        setEnquiries(enquiries.filter(e => e.id !== id));
      } catch (err) {
        alert(err.message);
      }
    } else {
      // Simulate status change (not persisted)
      setEnquiries(enquiries.filter(e => e.id !== id));
    }
  };

  return (
    <section className="min-h-screen bg-[#f8f6f2] py-12 px-4 font-serif">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8 text-center">
          Admin - Enquiries
        </h1>

        {loading && <div className="text-center text-[#bfa77a]">Loading...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        <div className="grid gap-8">
          {!loading && enquiries.length === 0 ? (
            <div className="text-center text-[#bfa77a]">No enquiries found.</div>
          ) : (
            enquiries.map(enquiry => (
              <div
                key={enquiry.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-[#e5e2dc]"
              >
                <div className="mb-2 text-lg font-bold text-[#7c6a4c]">
                  {enquiry.firstName} {enquiry.lastName}
                </div>
                <div className="mb-1 text-[#23293a]">Email: {enquiry.email}</div>
                <div className="mb-1 text-[#23293a]">Phone: {enquiry.phone}</div>
                <div className="mb-2 text-[#7c6a4c]">
                  Message: {enquiry.message}
                </div>

                <div className="flex gap-3 mt-4 flex-wrap">
                  {ACTIONS.map(action => (
                    <button
                      key={action.value}
                      onClick={() => handleAction(enquiry.id, action.value)}
                      className={`px-4 py-2 rounded font-semibold text-sm shadow transition-all ${
                        action.value === 'delete'
                          ? 'bg-red-500 text-white hover:bg-red-700'
                          : 'bg-[#bfa77a] text-white hover:bg-[#a08a5c]'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminEnquiries;
