import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

const UserProfileForAlumni = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handleMessageClick = () => {
    navigate(`/dm/${id}`);
  };

  if (!user) return <div>Loading user profile...</div>;

  return (
    <div className="user-profile">
      <img
        src={user.image}
        alt={user.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/100";
        }}
      />
      <h2>{user.name}</h2>
      <p><strong>Registration Number:</strong> {user.regNo}</p>
      <p><strong>Semester:</strong> {user.semester}</p>
      <button onClick={handleMessageClick}>Message</button>
    </div>
  );
};

export default UserProfileForAlumni;
