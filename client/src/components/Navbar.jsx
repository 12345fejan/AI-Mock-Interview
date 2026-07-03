import { FaBell } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);

  return (

    <div className="bg-white shadow px-8 py-4 flex justify-end items-center gap-6 relative">

      {/* Notification */}

      <div className="relative">

        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative"
        >

          <FaBell
            size={22}
            className="cursor-pointer hover:text-blue-600 transition"
          />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            6
          </span>

        </button>

        {showNotifications && (

          <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

            <div className="bg-blue-600 text-white px-5 py-4">

              <h2 className="text-lg font-bold">

                🔔 Notifications

              </h2>

            </div>

            <div className="max-h-96 overflow-y-auto">

              <div className="px-5 py-4 border-b hover:bg-gray-50">

                ✅ Welcome, {user?.name} 👋

              </div>

              <div className="px-5 py-4 border-b hover:bg-gray-50">

                📄 Resume Uploaded Successfully

              </div>

              <div className="px-5 py-4 border-b hover:bg-gray-50">

                👤 Profile Updated Successfully

              </div>

              <div className="px-5 py-4 border-b hover:bg-gray-50">

                🎯 Interview Completed Successfully

              </div>

              <div className="px-5 py-4 border-b hover:bg-gray-50">

                🏆 Highest Score : 8

              </div>

              <div className="px-5 py-4 hover:bg-gray-50">

                🚀 Keep Practicing Daily

              </div>

            </div>

          </div>

        )}

      </div>

      {/* Profile */}

      <div
        onClick={() => navigate("/profile")}
        className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition"
      >
        {user?.name?.charAt(0).toUpperCase()}
      </div>

    </div>

  );

};

export default Navbar;