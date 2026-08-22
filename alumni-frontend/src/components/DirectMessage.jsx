import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DirectMessage.css";

const DirectMessage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState("");

  const alumniName = localStorage.getItem("alumniName") || "Alumni";

  useEffect(() => {
    // Fetch user info
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error("User fetch error", err));

    // Static sample messages
    setMessages([
      { from: alumniName, text: "Hi, I'm happy to help!", timestamp: "10:00 AM" },
      { from: "User One", text: "Can I know more about UX roles?", timestamp: "10:01 AM" },
    ]);
  }, [id, alumniName]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/alumni/messages", {
        from: alumniName,
        to: id,
        message: newMessage,
      });

      setMessages(prev => [...prev, { from: alumniName, text: newMessage, timestamp: "Just now" }]);
      setNewMessage("");
      setStatus("Message sent!");
      setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      console.error(err);
      setStatus("Failed to send.");
    }
  };

  if (!user) return <div>Loading conversation...</div>;

  return (
    <div className="dm-container">
      <div className="dm-header">
        <img src={user.image} alt={user.name} />
        <h3>{user.name}</h3>
      </div>

      <div className="dm-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`dm-msg ${msg.from === alumniName ? "sent" : "received"}`}>
            <p>{msg.text}</p>
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="dm-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>

      {status && <p className="dm-status">{status}</p>}
    </div>
  );
};

export default DirectMessage;
