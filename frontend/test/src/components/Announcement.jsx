// Announcement.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Announcement.css";

const Announcement = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !details) return;

    try {
      await axios.post("http://localhost:5000/api/announcements", {
        title,
        details,
      });
      setConfirmation("Announcement sent to alumni feed!");
      setTitle("");
      setDetails("");
      setTimeout(() => setConfirmation(""), 3000);
    } catch (err) {
      console.error("Failed to send announcement:", err);
    }
  };

  return (
    <div className="announcement-container">
      <h2>Create Announcement</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Fest Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Details about the fest"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit">Send to Alumni</button>
      </form>
      {confirmation && <div className="confirmation">{confirmation}</div>}
    </div>
  );
};

export default Announcement;
