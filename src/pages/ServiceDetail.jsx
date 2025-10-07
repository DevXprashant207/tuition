import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:3000/api";

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy fallback data
  const dummyService = {
    name: decodeURIComponent(id),
    description: 'This is a sample description for the service. We provide expert legal advice and representation in this area.'
  };
  const dummyLawyers = [
    {
      id: '1',
      name: 'Naman Gupta',
      title: 'Senior Attorney',
      bio: 'Expert in corporate and civil law with 15+ years of experience.',
      imageUrl: '/assets/herosection/slider-item-2.jpg'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      title: 'Associate Lawyer',
      bio: 'Specializes in family and property law.',
      imageUrl: '/assets/herosection/slider-item-2.jpg'
    },
    {
      id: '3',
      name: 'Rahul Verma',
      title: 'Legal Consultant',
      bio: 'Focuses on intellectual property and contract law.',
      imageUrl: '/assets/herosection/slider-item-2.jpg'
    }
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch service details
        const resService = await fetch(`${API_BASE}/services/${id}`);
        const serviceData = await resService.json();
        setService(serviceData.data || dummyService);

        // Fetch all lawyers
        const resLawyers = await fetch(`${API_BASE}/lawyers`);
        const lawyersData = await resLawyers.json();

        // Filter lawyers associated with this service
        const associatedLawyers = (lawyersData.data || dummyLawyers).filter(lawyer =>
          lawyer.services ? lawyer.services.includes(id) : true
        );
        setLawyers(associatedLawyers.length ? associatedLawyers : dummyLawyers);
      } catch {
        setService(dummyService);
        setLawyers(dummyLawyers);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-lg">Loading...</div>;
  if (!service) return <div className="py-20 text-center text-lg">Service not found.</div>;

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
       
      <h1 className="text-3xl md:text-4xl font-bold text-[#4c3a1a] mb-4">{service.name}</h1>
      <p className="text-lg text-[#7c6a4c] mb-8">{service.description}</p>
      <div className="border-t border-[#e5e2dc] pt-8 mt-8">
        <h2 className="text-2xl font-semibold text-[#4c3a1a] mb-4">Associated Lawyers</h2>
        {lawyers.length === 0 ? (
          <div className="text-[#bfa77a]">No lawyers associated with this service yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lawyers.map(lawyer => (
              <div key={lawyer.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <img
                  src={lawyer.imageUrl || "/assets/herosection/slider-item-2.jpg"}
                  alt={lawyer.name}
                  className="w-24 h-24 object-cover rounded-full mb-3"
                />
                <div className="font-bold text-[#4c3a1a]">{lawyer.name}</div>
                <div className="text-[#bfa77a] text-sm mb-2">{lawyer.title}</div>
                <div className="text-xs text-[#7c6a4c] text-center">{lawyer.bio}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceDetail;
