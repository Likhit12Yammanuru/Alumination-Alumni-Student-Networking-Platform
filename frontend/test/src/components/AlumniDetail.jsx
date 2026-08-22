import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlumniDetail = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/alumni")
      .then((res) => {
        const found = res.data.find((a) => a.id === parseInt(id));
        setAlumni(found);
      });
  }, [id]);

  if (!alumni) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <img src={alumni.image} alt={alumni.name} style={{ width: "250px", borderRadius: "12px" }} />
      <h2>{alumni.name}</h2>
      <p><strong>Age:</strong> {alumni.age || "22"}</p>
      <p><strong>Current Job:</strong> {alumni.currentJob}</p>
      <p><strong>Hobbies:</strong> {alumni.hobbies}</p>
    </div>
  );
};

export default AlumniDetail;
