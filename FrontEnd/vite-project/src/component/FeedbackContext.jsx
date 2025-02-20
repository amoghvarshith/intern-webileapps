// FeedbackContext.js
import React, { createContext, useState } from "react";

export const FeedbackContext = createContext();

const FEEDBACK_EXPIRATION = 20 * 24 * 60 * 60 * 1000; // 20 days in ms

const getStoredFeedbacks = () => {
  const stored = localStorage.getItem("feedbacks");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      // Filter out expired feedbacks
      return parsed.filter((fb) => now - fb.timestamp < FEEDBACK_EXPIRATION);
    } catch (e) {
      console.error("Error parsing feedbacks from localStorage", e);
      return [];
    }
  }
  return [];
};

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState(getStoredFeedbacks());

  const saveFeedbacksToStorage = (feedbacksArray) => {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacksArray));
  };

  const addFeedback = (newFeedback) => {
    // newFeedback should be an object with { user, text }
    const feedbackObj = { ...newFeedback, timestamp: Date.now() };
    const updatedFeedbacks = [...feedbacks, feedbackObj];
    setFeedbacks(updatedFeedbacks);
    saveFeedbacksToStorage(updatedFeedbacks);
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
