// src/components/Inbox.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Inbox.css";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/inbox")
      .then(res => {
        console.log("Inbox messages fetched:", res.data);
        setMessages(res.data);
      })
      .catch(err => console.error("Failed to fetch inbox:", err));
  }, []);

  return (
    <div className="inbox-container">
      <h2>Your Messages</h2>
      {messages.length === 0 ? (
        <p>No conversations yet</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className="inbox-item"
            onClick={() => {
              console.log("Navigating to DM with ID:", msg.alumniID);
              navigate(`/dm/${msg.alumniID}`);
            }}
          >
            <img src={msg.image} alt={msg.name} className="avatar" />
            <div>
              <strong>{msg.name}</strong>
              <p>{msg.lastmessage}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Inbox;
