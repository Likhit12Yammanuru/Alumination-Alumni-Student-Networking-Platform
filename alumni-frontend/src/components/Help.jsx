import React, { useState } from "react";
import './Help.css';

const Help = () => {
  // State to track which DM chat is active
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");

  // Predefined chat data with roles
  const chats = [
    { id: 1, title: "Principal" },
    { id: 2, title: "Vice Principal" },
    { id: 3, title: "Alumni Coordinator" },
    { id: 4, title: "HoD (Head of Department)" },
    { id: 5, title: "Chairman" }
  ];

  // Handle selection of a chat
  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeChat]: [...(prevMessages[activeChat] || []), { sender: "Alumni", text: newMessage }]
      }));
      setNewMessage(""); // Clear input field after sending
    }
  };

  // Render the selected chat with messages and input
  const renderMessages = () => {
    const chatMessages = messages[activeChat] || [];
    return (
      <div className="chat-window">
        <div className="message-history">
          {chatMessages.map((msg, index) => (
            <div key={index} className={msg.sender === "Alumni" ? "alumni-message" : "role-message"}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  };

  return (
    <div className="help-page">
      <div className="chat-list">
        <h1>💬 Help Chats</h1>
        <div className="chat-options">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
              onClick={() => handleChatSelect(chat.id)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-details">
        {activeChat ? (
          <div className="chat-container">
            <h2>{chats.find((chat) => chat.id === activeChat)?.title}</h2>
            {renderMessages()}
          </div>
        ) : (
          <p>Select a chat to view messages.</p>
        )}
      </div>
    </div>
  );
};

export default Help;
