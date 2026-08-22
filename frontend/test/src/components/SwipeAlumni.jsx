// src/components/SwipeAlumni.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SwipeAlumni.css";

const SwipeAlumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/alumni")
      .then((res) => setAlumniList(res.data))
      .catch((err) => console.error("Error fetching alumni:", err));
  }, []);

  const handleChange = () => {
    if (alumniList.length > 1) {
      const nextIndex = (currentIndex + 1) % alumniList.length;
      setCurrentIndex(nextIndex);
    }
  };

  const handleAhead = () => {
    const selectedAlumni = alumniList[currentIndex];
    if (selectedAlumni) {
      navigate(`/alumni/${selectedAlumni.id}`);
    }
  };

  if (alumniList.length === 0) return <div>Loading...</div>;

  const currentAlumni = alumniList[currentIndex];

  return (
    <div className="swipe-container">
      <div className="alumni-card">
        <img
          src={currentAlumni.image}
          alt={currentAlumni.name}
          className="alumni-img"
        />
        <div className="alumni-info">
          <h2>{currentAlumni.name}, {currentAlumni.age || "22"}</h2>
          <p><strong>Job:</strong> {currentAlumni.currentJob}</p>
          <p><strong>Hobbies:</strong> {currentAlumni.hobbies}</p>
        </div>
      </div>

      <div className="button-container">
        <button className="swipe-button" onClick={handleChange}>Change</button>
        <button className="swipe-button" onClick={handleAhead}>Ahead</button>
      </div>
    </div>
  );
};

export default SwipeAlumni;
