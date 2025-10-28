"use client";

import {
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className="w-full flex flex-col md:flex-row text-sm font-medium shadow-sm overflow-hidden">
      {/* Left Section - White */}
      <div className="relative w-full md:w-[47%] bg-white text-[#002b6b] flex items-center justify-center md:justify-end py-2 px-6 gap-6">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-500" />
          <span className="hover:text-[#B88A2F] transition-colors cursor-pointer">
            6387488141
          </span>
        </div>

        <span className="hidden md:inline text-gray-400">|</span>

        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-green-500" />
          <span className="hover:text-[#B88A2F] transition-colors cursor-pointer">
            6387488141
          </span>
        </div>


      </div>

      {/* Right Section - Blue */}
      <div className="w-full md:w-[53%] bg-[#fafafa] text-[#B88A2F] flex items-center justify-center md:justify-between py-2 px-8">
        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <Facebook className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Instagram className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Twitter className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
          <Linkedin className="w-4 h-4 hover:text-[#B88A2F] cursor-pointer transition-colors" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            to="/hire-tutor"
            className="flex items-center gap-1 bg-[#B88A2F] text-white px-3 py-1.5 rounded-md hover:bg-[#a17c27] transition-all text-sm shadow-md"
          >
            <Play className="w-3 h-3" /> Hire Tutor
          </Link>
          <Link
            to="/become-tutor"
            className="flex items-center gap-1 bg-[#B88A2F] text-white px-3 py-1.5 rounded-md hover:bg-[#a17c27] transition-all text-sm shadow-md"
          >
            <Play className="w-3 h-3" /> Join as Tutor
          </Link>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }
      `}</style>
    </div>
  );
}

export default TopBar;
