"use client";

import React, { useState, useEffect } from "react";
import fallbackImg from "../assets/lawyer-deafult.jpg";

function TeacherCard({ teacher, image }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e2dc] h-full w-full max-w-xs mx-auto">
      <img
        src={image || fallbackImg}
        alt={teacher.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="px-5 py-4 w-full">
        <h3 className="text-sm font-bold text-[#23293a] mb-1 uppercase tracking-wide">
          {teacher.name}
        </h3>
        <p className="text-xs text-[#69665f] mb-1 font-semibold">
          {teacher.subject}
        </p>
        <p className="text-xs text-[#8b857d]">
          {teacher.experience} years experience
        </p>
      </div>
    </div>
  );
}

function TutorPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const dummyTeachers = [
        {
          name: "Amit Sharma",
          subject: "Mathematics (Class 11–12)",
          experience: 8,
          image:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Neha Singh",
          subject: "Physics (CBSE & NEET)",
          experience: 6,
          image:
            "https://images.unsplash.com/photo-1600172454520-1348b0d4ee36?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Rohit Verma",
          subject: "Chemistry (JEE/NEET)",
          experience: 7,
          image:
            "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Pooja Patel",
          subject: "Biology (Class 11–12)",
          experience: 5,
          image:
            "https://images.unsplash.com/photo-1614281115749-7b0432de9c7e?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Rajeev Kumar",
          subject: "English (Grammar & Spoken)",
          experience: 9,
          image:
            "https://images.unsplash.com/photo-1600181952841-f4a54a0d9ed2?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Sneha Kapoor",
          subject: "Computer Science (C++ / Python)",
          experience: 4,
          image:
            "https://images.unsplash.com/photo-1614281116029-2c21c1d8a57a?auto=format&fit=crop&w=800&q=80",
        },
      ];
      setTeachers(dummyTeachers);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-10 bg-[#faf4e4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-[#b88a2f] uppercase tracking-wide mb-2 text-center">
          Expert Mentors
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center mb-10">
          Our Teaching Faculty
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#b88a2f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {teachers.map((teacher, idx) => (
              <TeacherCard key={idx} teacher={teacher} image={teacher.image} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default TutorPage;
