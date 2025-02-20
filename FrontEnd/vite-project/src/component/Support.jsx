// Support.js
import React, { useState, useContext } from "react";
import "../Images/Support.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FeedbackContext } from "./FeedbackContext";

const Support = () => {
  const [review, setReview] = useState("");
  const { addFeedback } = useContext(FeedbackContext);

  const handlePost = () => {
    if (review.trim().length === 0) return;
    // Get logged-in user name from localStorage (or default to Anonymous)
    const user = localStorage.getItem("userEmail") || "Anonymous";
    addFeedback({ user, text: review.trim() });
    setReview("");
  };

  return (
    <div>
      {/* Image Container */}
      <div className="image-container">
        <p className="centered-text">Contact</p>
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: "flex",
          gap: "60px",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          padding: "20px",
        }}
      >
        {/* Card 1 - Location */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "250px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            <CiLocationOn /> Location
          </p>
          <p>Vijayawada, Andhra Pradesh</p>
        </div>

        {/* Card 2 - Telephone */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "250px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            <BsFillTelephoneFill /> Telephone
          </p>
          <p>+91-8367330297</p>
        </div>

        {/* Card 3 - Email */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "250px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            <MdOutlineMarkEmailUnread /> Email
          </p>
          <p>2100031388cseh@gmail.com</p>
        </div>
      </div>

      {/* Review Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          marginTop: "20px",
          borderTop: "1px solid #ddd",
        }}
      >
        <label
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginRight: "10px",
            color: "#333",
          }}
        >
          Write a Review Here:
        </label>

        <input
          type="text"
          maxLength={10}
          placeholder="Write your review (max 10 characters)"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          style={{
            padding: "10px",
            width: "50%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            color: "#555",
            marginRight: "10px",
          }}
        />

        <button
          onClick={handlePost}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Support;
