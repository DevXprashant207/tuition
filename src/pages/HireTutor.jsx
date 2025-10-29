import React, { useState } from "react";
import hireTutorImg from "../assets/HeroSection/hero3.jpg"; // 🔹 Add your background image here

function HireTutorForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    subjects: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    // You can replace this with an actual API call later
    setTimeout(() => {
      setStatus("✅ Form submitted successfully!");
      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        subjects: "",
      });
    }, 1000);
  };

  return (
    <section className="bg-[#002a5c] py-16 px-4 md:px-8 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={hireTutorImg || "/placeholder.svg"}
            alt="Hire Tutor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h2 className="text-3xl font-semibold text-[#B88A2F] mb-6 text-center">
            Hire a Tutor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="Enter your location"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Subjects</label>
              <input
                type="text"
                name="subjects"
                value={form.subjects}
                onChange={handleChange}
                required
                placeholder="Subjects you want a tutor for (e.g., Math, Science)"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#B88A2F] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#B88A2F] hover:bg-[#9c7529] text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Submit
            </button>

            {/* Status Message */}
            {status && (
              <p className="text-center text-[#B88A2F] font-medium mt-2">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default HireTutorForm;
