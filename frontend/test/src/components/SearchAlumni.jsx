// src/components/SearchAlumni.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SearchAlumni.css";

const SearchAlumni = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/alumni");
        const all = res.data;
        const filtered = all.filter(al =>
          al.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (searchTerm.trim() === "") {
    setResults([]);
    return;
  }

  fetchAll();
}, [searchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search alumni by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {results.length > 0 && (
        <div className="search-results">
          {results.map((alumni) => (
            <Link key={alumni.id} to={`/alumni/${alumni.id}`} className="search-result-item">
              <img src={alumni.image} alt={alumni.name} className="result-img" />
              <span>{alumni.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAlumni;
