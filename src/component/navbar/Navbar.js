import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()


  return (
    <div className="flex-grow">
        <div className="sticky top-0 w-full bg-gray-700 shadow-lg shadow-gray-700 z-10">
          <div className="flex flex-row items-center justify-between px-4 py-2 w-full">
            <button
              onClick={() => navigate("/")}
              className="flex flex-row items-center space-x-1.5"
            >
              <div className="text-red-500 text-3xl font-bold">Bridge</div>
              <div className="text-white text-3xl font-semibold">Nations</div>
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("associated-country")}
                className={`font-semibold hover:text-lg w-[120px] md:w-fit lg:w-fit text-white px-4 py-1 rounded transition duration-300 ${
                  location.pathname === "/associated-country" ? "font-bold text-orange-600 text-lg" : "font-semibold"
                }`}
              >
                Associated Country
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-500 min-h-screen">{children}</div>
      </div>
  );
};

export default Navbar;
