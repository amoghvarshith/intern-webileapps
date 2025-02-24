// AdminDashboard.js
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { FiUsers, FiSettings, FiFileText, FiUpload } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { FeedbackContext } from "./FeedbackContext";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState(null);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);

  const navigate = useNavigate();
  const { feedbacks } = useContext(FeedbackContext);
  const feedbackSectionRef = useRef(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get("https://intern-webileapps.onrender.com");
        setUserCount(response.data.count);
      } catch (err) {
        setError("Failed to fetch user count");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  const inactiveUsers = userCount - activeUsers;

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!movieTitle || !genre || !file) {
      alert("Please fill in all fields and upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", movieTitle);
    formData.append("genre", genre);
    formData.append("movieFile", file);

    try {
      await axios.post("https://intern-webileapps.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Movie uploaded successfully");
    } catch (err) {
      alert("Failed to upload movie");
      console.error(err);
    }
  };

  // Data for Pie Chart
  const data = [
    { name: "Active Users", value: activeUsers },
    { name: "Inactive Users", value: inactiveUsers },
  ];

  const COLORS = ["#4CAF50", "#FF5733"];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const scrollToFeedbacks = () => {
    if (feedbackSectionRef.current) {
      feedbackSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  
  const handleUploadClick = () => {
    setShowUploadAnimation(true);
    setTimeout(() => setShowUploadAnimation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white relative">
     
      {showUploadAnimation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader color="#fff" size={50} />
          <p className="mt-4 text-white text-xl">Feature coming soon!</p>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-gray-900">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Adminhome
        </button>
        <div className="text-center text-lg mb-6">Welcome, Admin! Manage your application here.</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         
          <div className="bg-blue-500 p-6 rounded-lg shadow-md hover:scale-105 transition">
            <FiUsers className="text-white text-4xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-white text-center">View Users</h2>
            {loading ? (
              <div className="flex justify-center mt-2">
                <ClipLoader color="#fff" size={20} />
              </div>
            ) : error ? (
              <p className="text-red-300 text-center mt-2">{error}</p>
            ) : (
              <p className="text-center text-lg mt-2">Total Users: {userCount}</p>
            )}
          </div>

          {/* Feedback Card */}
          <div
            className="bg-green-500 p-6 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
            onClick={scrollToFeedbacks}
          >
            <FiFileText className="text-white text-4xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-white text-center">FeedBacks</h2>
          </div>

         
          <div className="bg-red-500 p-6 rounded-lg shadow-md hover:scale-105 transition">
            <FiSettings className="text-white text-4xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-white text-center">Settings</h2>
          </div>

          
          <div
            className="bg-purple-500 p-6 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
            onClick={handleUploadClick}
          >
            <FiUpload className="text-white text-4xl mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-white text-center">Upload/Create Movie</h2>
          </div>
        </div>

       
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Movie Upload Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload/Create Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Movie Title"
              className="w-full p-2 border rounded mb-3"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Genre"
              className="w-full p-2 border rounded mb-3"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <input
              type="file"
              className="w-full p-2 border rounded mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Upload
            </button>
          </form>
        </div>


        <div ref={feedbackSectionRef} className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Feedbacks</h2>
          {feedbacks.length > 0 ? (
            <ul>
              {feedbacks.map((feedback, index) => (
                <li
                  key={index}
                  className="flex items-center border p-3 mb-2 rounded shadow-sm"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full mr-4">
                    {feedback.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{feedback.user}</p>
                    <p>{feedback.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No feedbacks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
