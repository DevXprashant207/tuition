import React, { useState } from "react";
import imgTutor from "../assets/becomeTutor.jpg";

function BecomeTutorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://law-firm-backend-e082.onrender.com/api/enquiry/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-[#002a5c] text-white px-4 py-12 md:px-10">
      {/* Outer Container */}
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Image + Headline */}
        <div className="relative w-full md:w-1/2">
          <img
            src={imgTutor}
            alt="Professional home tutor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
              Join as a <span className="text-[#ffca28]">Home Tuition Tutor</span>
            </h1>
            <p className="text-gray-200 max-w-md text-sm md:text-base">
              Start your journey as a professional home tutor. Expand your reach,
              teach passionate students, and earn while doing what you love.
            </p>
          </div>
        </div>

        {/* Right Side - Tutor Registration Form */}
        <div className="w-full md:w-1/2 bg-white text-gray-900 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Become a <span className="text-[#cfac33]">Tuition Tutor</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below and our team will contact you soon.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-label="Tutor Registration Form"
          >
            {/* Name Field */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#cfac33] transition"
            />

            {/* Contact Number */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contact Number*"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#cfac33] transition"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#cfac33] transition"
            />

            {/* Location */}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your Teaching Location"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#cfac33] transition"
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mention subjects you can teach or experience (optional)"
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#cfac33] transition"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                status === "loading"
                  ? "bg-[#cfac33]/70 cursor-not-allowed"
                  : "bg-[#cfac33] hover:bg-[#b69729]"
              }`}
            >
              {status === "loading" ? "Submitting..." : "Join Now"}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <p className="text-green-600 text-center font-medium mt-3">
                ✅ Thank you for joining! We’ll reach out to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center font-medium mt-3">
                ❌ Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default BecomeTutorForm;
