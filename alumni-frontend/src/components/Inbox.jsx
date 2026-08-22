import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  alumniInboxData from "../data/inboxData"; // Import from the correct path
import "./Inbox.css";

const Inbox = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Sample Users data imported from inputData.js (already there)
  useEffect(() => {
    // Simulate API call to fetch inbox data (replace with actual API call)
    axios.get("http://localhost:5000/api/inbox") // Update this with your actual backend endpoint
      .then((res) => {
        // Handle the response from the backend (optional)
        console.log(res.data); // Placeholder for actual data
      })
      .catch((err) => console.error("Failed to fetch inbox:", err));
  }, []);

  const handleMessageClick = (user) => {
    setLoading(true); // Set loading state
    setTimeout(() => {
      // Simulate delay before navigating to the DM page for the clicked user
      navigate(`/dm/${user.userId}`); // Navigate to Direct Message page for that user
    }, 1000); // Loading delay of 1 second (can be adjusted)
  };

  return (
    <div className="inbox-container">
      <h2>Your Messages</h2>
      {loading ? (
        <div className="loading-state">
          <p>Loading...</p>
        </div>
      ) : alumniInboxData.length === 0 ? (
        <p>No conversations yet</p>
      ) : (
        alumniInboxData.map((user) => (
          <div
            key={user.userId}
            className="inbox-item"
            onClick={() => handleMessageClick(user)}
          >
            <div className="inbox-avatar">
              <img src={user.image} alt={`${user.name}'s profile`} />
            </div>
            <div className="inbox-message">
              <strong>{user.name}</strong>
              <p>{user.lastMessage}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Inbox;

