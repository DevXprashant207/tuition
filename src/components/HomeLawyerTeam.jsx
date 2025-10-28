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

function HomeTeacherTeam() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
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
      {
        name: "Deepak Mishra",
        subject: "Economics (XI–XII)",
        experience: 10,
        image:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Priya Nair",
        subject: "Accountancy (Commerce)",
        experience: 6,
        image:
          "https://images.unsplash.com/photo-1587614382346-4ec71c96a326?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Arjun Mehta",
        subject: "Political Science (Humanities)",
        experience: 7,
        image:
          "https://images.unsplash.com/photo-1596813362035-3b6ccfb66a6b?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Ritika Joshi",
        subject: "History (Ancient to Modern)",
        experience: 5,
        image:
          "https://images.unsplash.com/photo-1554384645-13eab165c24b?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Anil Chauhan",
        subject: "Geography (Physical & Human)",
        experience: 8,
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Kavita Sharma",
        subject: "Hindi (Poetry & Grammar)",
        experience: 9,
        image:
          "https://images.unsplash.com/photo-1573497161161-3c929cd9aa58?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Manoj Pandey",
        subject: "Science (Class 6–8)",
        experience: 4,
        image:
          "https://images.unsplash.com/photo-1623264535917-0371d59b97a4?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Tanya Gupta",
        subject: "Mathematics (Class 6–8)",
        experience: 5,
        image:
          "https://images.unsplash.com/photo-1614281115721-9c8f74af0f2e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Vikas Rai",
        subject: "Sociology (Class 12 & BA)",
        experience: 6,
        image:
          "https://images.unsplash.com/photo-1614281115931-1b4b4e33a9b1?auto=format&fit=crop&w=800&q=80",
      },
    ];

    setTeachers(dummyTeachers);
  }, []);

  const duplicatedTeachers = [...teachers, ...teachers];

  return (
    <section className="relative py-20 px-6 md:px-10 bg-[#faf4e4] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-[#b88a2f] uppercase tracking-wide mb-2">
          Expert Mentors
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a]">
          Our Teaching Faculty
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#b88a2f] to-[#d1b469] rounded mt-4 mb-10"></div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 animate-scroll-infinite"
            style={{ width: `${duplicatedTeachers.length * 260}px` }}
          >
            {duplicatedTeachers.map((teacher, idx) => (
              <div
                className="min-w-[240px] flex-shrink-0"
                key={`${teacher.name}-${idx}`}
              >
                <TeacherCard teacher={teacher} image={teacher.image} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollInfinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-infinite {
          animation: scrollInfinite 35s linear infinite;
          will-change: transform;
        }

        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default HomeTeacherTeam;
