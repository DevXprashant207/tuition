import React, { useEffect, useState } from "react";

function TutorModule() {
  const [tutors, setTutors] = useState([]);

  // 10 dummy tutors
  const dummyTutors = [
    { id: 1, name: "Amit Verma", subject: "Mathematics", location: "Delhi", phone: "9876543210", email: "amitv@gmail.com" },
    { id: 2, name: "Sneha Sharma", subject: "Physics", location: "Mumbai", phone: "9865321470", email: "sneha.sharma@gmail.com" },
    { id: 3, name: "Rohit Patel", subject: "Chemistry", location: "Pune", phone: "9832145690", email: "rohitp@gmail.com" },
    { id: 4, name: "Priya Nair", subject: "English", location: "Bangalore", phone: "9823456789", email: "priyanair@gmail.com" },
    { id: 5, name: "Karan Singh", subject: "Computer Science", location: "Noida", phone: "9812345678", email: "karansingh@gmail.com" },
    { id: 6, name: "Divya Mehta", subject: "Biology", location: "Chandigarh", phone: "9809876543", email: "divyamehta@gmail.com" },
    { id: 7, name: "Arjun Yadav", subject: "Economics", location: "Lucknow", phone: "9898123456", email: "arjuny@gmail.com" },
    { id: 8, name: "Nisha Gupta", subject: "History", location: "Jaipur", phone: "9823412354", email: "nishagupta@gmail.com" },
    { id: 9, name: "Rahul Soni", subject: "Geography", location: "Indore", phone: "9815672345", email: "rahulsoni@gmail.com" },
    { id: 10, name: "Ankita Das", subject: "Political Science", location: "Kolkata", phone: "9876549876", email: "ankitadas@gmail.com" },
  ];

  useEffect(() => {
    // 🧩 Simulate fetching from API
    const fetchTutors = async () => {
      try {
        const response = await fetch("https://api.example.com/tutors"); // Replace later
        if (response.ok) {
          const data = await response.json();
          setTutors([...dummyTutors, ...data]); // combine dummy + API data
        } else {
          setTutors(dummyTutors); // fallback if API fails
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setTutors(dummyTutors);
      }
    };

    fetchTutors();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#23293a]">All Tutors</h2>
      <p className="text-gray-600 mb-6">Manage all tutors in your system.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl">
          <thead className="bg-[#f8f6f2]">
            <tr>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Subject</th>
              <th className="py-3 px-4 border-b text-left">Location</th>
              <th className="py-3 px-4 border-b text-left">Phone</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {tutors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Loading tutors...
                </td>
              </tr>
            ) : (
              tutors.map((tutor, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#fff8e6] transition duration-200"
                >
                  <td className="py-3 px-4 border-b">{tutor.name}</td>
                  <td className="py-3 px-4 border-b">{tutor.subject}</td>
                  <td className="py-3 px-4 border-b">{tutor.location}</td>
                  <td className="py-3 px-4 border-b">{tutor.phone}</td>
                  <td className="py-3 px-4 border-b">{tutor.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TutorModule;
