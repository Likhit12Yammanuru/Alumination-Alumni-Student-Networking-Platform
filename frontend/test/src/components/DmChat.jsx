import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DmChat.css";

const DmChat = () => {
  const { alumniId } = useParams(); // ✅ Correct route param
  const [alumni, setAlumni] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
  console.log("Alumni ID from route:", alumniId);

  axios.get("http://localhost:5000/api/alumni")
    .then(res => {
      console.log("All alumni fetched:", res.data);

      const found = res.data.find(a =>
      String(a.id) === String(alumniId) || String(a._id) === String(alumniId)
    );

      console.log("Found alumni:", found);

      setAlumni(found);
    })
    .catch(err => {
      console.error("Error fetching alumni:", err);
    });
}, [alumniId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "You", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { from: alumni.name, text: "Thanks for reaching out!" }]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!alumni) return <div>Loading...</div>;

  return (
    <div className="dm-chat-wrapper">
      <div className="dm-chat-header">
        <img src={alumni.image} alt={alumni.name} className="header-avatar" />
        <span>{alumni.name}</span>
      </div>

      <div className="dm-chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`dm-chat-bubble ${msg.from === "You" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="dm-chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${alumni.name}`}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DmChat;
