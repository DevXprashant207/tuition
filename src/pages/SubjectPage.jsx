"use client";

import React, { useState, useEffect } from "react";


function SubjectCard({ subject, image }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5e2dc] h-full w-full max-w-xs mx-auto">
      <img
        src={image || fallbackImg}
        alt={subject.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImg;
        }}
        className="w-full h-44 object-cover rounded-t-xl"
      />
      <div className="px-5 py-4 text-center">
        <h3 className="text-base font-bold text-[#23293a] mb-1 uppercase tracking-wide">
          {subject.name}
        </h3>
        <p className="text-sm text-[#8b857d]">{subject.description}</p>
      </div>
    </div>
  );
}

function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API delay
    setTimeout(() => {
      const dummySubjects = [
        {
          name: "JEE Main & Advanced",
          description: "Engineering entrance preparation for Class 11–12 students.",
          image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "NEET Biology",
          description: "Comprehensive biology preparation for NEET aspirants.",
          image:
            "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "CBSE Board (Class 10)",
          description: "Board exam-focused learning for all subjects.",
          image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Mathematics (Class 11–12)",
          description: "Advanced math concepts for board and entrance exams.",
          image:
            "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Physics (JEE/NEET)",
          description: "Concepts and problem-solving for Physics lovers.",
          image:
            "https://images.unsplash.com/photo-1614624532983-4ce03390d0d6?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Chemistry (Organic & Inorganic)",
          description: "Master chemical reactions and formulas easily.",
          image:
            "https://images.unsplash.com/photo-1616628188502-3d8a05e9b5e1?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "English (Spoken & Grammar)",
          description: "Enhance communication skills and grammar excellence.",
          image:
            "https://images.unsplash.com/photo-1584697964192-02e3e3d9c04f?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Computer Science (C++ / Python)",
          description: "Programming fundamentals for school and competition.",
          image:
            "https://images.unsplash.com/photo-1581093588401-22a4b0a4e1e9?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Economics (XI–XII)",
          description: "Understand markets, demand, and financial systems.",
          image:
            "https://images.unsplash.com/photo-1565373678535-8b1c88b6e03b?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Accountancy (Commerce)",
          description: "Master double-entry, ledgers, and financial statements.",
          image:
            "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Political Science (Humanities)",
          description: "Explore governance, constitutions, and democracy.",
          image:
            "https://images.unsplash.com/photo-1591696331114-ffadc4a8d1a8?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "History (Ancient to Modern)",
          description: "Learn about world civilizations and major revolutions.",
          image:
            "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Geography",
          description: "Study the physical and human geography of the world.",
          image:
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Sociology",
          description: "Understand society, culture, and human behavior.",
          image:
            "https://images.unsplash.com/photo-1602526218679-8f6f5c3576b0?auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Hindi Literature",
          description: "Dive into poems, stories, and grammar of Hindi.",
          image:
            "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
        },
      ];
      setSubjects(dummySubjects);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-10 bg-[#faf4e4] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-[#b88a2f] uppercase tracking-wide mb-2 text-center">
          Our Courses
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center mb-10">
          Subjects We Teach
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#b88a2f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {subjects.map((subject, idx) => (
              <SubjectCard key={idx} subject={subject} image={subject.image} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SubjectsPage;
