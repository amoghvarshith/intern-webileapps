import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faRightFromBracket,
  faUser,
  faUserCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setSearchQuery, onLogout ,userEmail}) => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user data (replace with actual data if needed)
  const userName = userEmail && userEmail.length > 0 ? userEmail.substring(0, 5) : "Guest";
  const nameNow = userEmail||"Guest";


  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for:", query);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    navigate("/"); // Redirect to login page
  };

  return (
    <div>
      {/* Navbar */}
      <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-gray-800 z-50" style={{position:"sticky"}}>

        {/* Logo and Navigation Links */}
        <div className="flex space-x-8 items-center">
          <img
            className="w-[70px] h-[40px]"
            src="https://static1.bigstockphoto.com/6/1/2/large2/216975640.jpg"
            alt="Logo"
          />
          <Link to="/" className="text-white text-2xl">
            Movies
          </Link>
          <Link to="/Watchlist" className="text-white text-2xl">
            Watchlist
          </Link>
          <Link to="/History" className="text-white text-2xl">
            History
          </Link>
          <Link to="/Support" className="text-white text-2xl">
            Support
          </Link>
        </div>

        {/* Search and User Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex items-center w-72">
            {/* Search Icon */}
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 text-white text-lg"
            />
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-10 py-2 rounded-full bg-[#1e1e1e] text-white text-center shadow-[0px_0px_10px_rgba(128,0,128,0.5),_0px_0px_20px_rgba(128,0,128,0.6)] focus:shadow-[0px_0px_15px_rgba(128,0,128,0.7),_0px_0px_30px_rgba(128,0,128,0.8)] focus:bg-[#2b2b2b] outline-none transition duration-300 ease-in-out"
              value={query}
              onChange={handleSearchChange}
            />
            {/* Search Submit Button */}
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 text-white text-lg"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-3xl text-white cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 bg-[#222] text-white rounded-md shadow-lg w-60"
                style={{ zIndex: 10 }}
              >
                <ul className="list-none p-2">
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-bold">{userName}</p>
                      <p className="text-sm text-gray-400">{nameNow}</p>
                    </div>
                  </li>
                  {/* <li
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => console.log("Profile Settings")}
                  >
                    <FontAwesomeIcon icon={faCog} className="mr-3" />
                    Profile Settings
                  </li> */}
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-400"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="mr-3"
                    />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
