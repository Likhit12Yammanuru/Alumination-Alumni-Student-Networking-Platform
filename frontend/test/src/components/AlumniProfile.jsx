import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AlumniProfile.css';

const AlumniProfile = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/alumni").then((res) => {
      const found = res.data.find(a => a.id === parseInt(id));
      setAlumni(found);
    });
  }, [id]);

  if (!alumni) return <div>Loading...</div>;

  return (
    <div className="relative p-4">
      {/* Floating Message Button */}
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded shadow-md hover:bg-blue-600"
        onClick={() => navigate(`/dm/${alumni.id}`)}
      >
        Message
      </button>

      <img src={alumni.image} alt={alumni.name} className="alumni-profile-image" />
      <h2 className="text-2xl text-center font-semibold mt-4">{alumni.name}</h2>
      <p className="text-center text-gray-600">{alumni.currentJob}</p>
      <p className="text-center">{alumni.city}</p>
      <p className="text-center mt-2">Hobbies: {alumni.hobbies}</p>
      <p className="text-center mt-2">Achievements: {alumni.achievements}</p>
      <p className="text-center mt-2">
        LinkedIn: <a className="text-blue-600" href={alumni.linkedin} target="_blank" rel="noopener noreferrer">{alumni.linkedin}</a>
      </p>
    </div>
  );
};

export default AlumniProfile;
