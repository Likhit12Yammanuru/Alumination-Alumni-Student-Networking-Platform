import React, { useState } from "react";
import './GetAnnouncement.css'; // Importing a new CSS for styling

const GetAnnouncement = () => {
  // State to toggle between Announcements and Advertisements
  const [activeTab, setActiveTab] = useState("announcements");

  // Sample data for announcements and advertisements
  const announcements = [
    { id: 1, title: "Alumni Meet - 2025", content: "Join us for the annual alumni meet on 20th June. Don't miss it!" },
    { id: 2, title: "Guest Lecture on AI", content: "Attend the guest lecture on Artificial Intelligence by Prof. X on 25th May." },
  ];

  const advertisements = [
    { id: 1, title: "Tech Fest 2025", content: "Exciting tech festival with hands-on workshops. Register now!" },
    { id: 2, title: "Startup Pitch Competition", content: "Pitch your startup idea and win exciting prizes. Apply before 30th May!" },
  ];

  // Render announcements or advertisements based on the active tab
  const renderContent = () => {
    const data = activeTab === "announcements" ? announcements : advertisements;
    return data.map((item) => (
      <div key={item.id} className="content-card">
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        <div className="card-actions">
          {activeTab === "announcements" ? (
            <button className="mark-read-btn">Mark as Read</button>
          ) : (
            <button className="interested-btn">I'm Interested</button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="page">
      <div className="header">
        <h1>📢 Announcements & Advertisements</h1>
        <div className="tabs">
          <button
            className={activeTab === "announcements" ? "active-tab" : ""}
            onClick={() => setActiveTab("announcements")}
          >
            Announcements
          </button>
          <button
            className={activeTab === "advertisements" ? "active-tab" : ""}
            onClick={() => setActiveTab("advertisements")}
          >
            Advertisements
          </button>
        </div>
      </div>

      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default GetAnnouncement;
