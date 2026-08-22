import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchUsers.css";

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // <-- You were missing this line

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log("Fetched user data:", res.data);  // For debugging
        setUsers(res.data);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-users-container">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="user-list">
        {searchTerm && filteredUsers.map(user => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => navigate(`/user/${user.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={user.image}
              alt={user.name}
              className="user-img"
              onError={(e) => { e.target.src = "https://via.placeholder.com/60"; }}
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;
