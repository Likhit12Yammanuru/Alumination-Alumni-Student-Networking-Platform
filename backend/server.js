const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Client } = require('pg');
const inboxData = require('./inboxData'); // For User Interface Inbox data

const app = express();
const PORT = 5000;

// PostgreSQL setup
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'alumination',
  password: 'Likhit12102003',
  port: 5432,
});
client.connect();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// ------------------ MOCK DATA ------------------

// Alumni mock data
const alumniData = [
  {
    id: 1,
    name: "Alumni One",
    hobbies: "Painting, Hiking",
    currentJob: "Software Engineer at XYZ",
    image: "http://localhost:5000/uploads/Sarah_Jane_Smith_2006.jpg",
    city: "Bangalore",
    linkedin: "https://linkedin.com/in/alumni-one",
    achievements: "Published 2 research papers, Hackathon Winner"
  },
  {
    id: 2,
    name: "Alumni Two",
    hobbies: "Music, Reading",
    currentJob: "Data Scientist at ABC",
    image: "http://localhost:5000/uploads/hhfguk3rEQi3oH9qk48NyUMqzVvGfwqtnI6PtK1O.jpg",
    city: "Chennai",
    linkedin: "https://linkedin.com/in/alumni-two",
    achievements: "TEDx Speaker, Built ML Product"
  },
  {
    id: 3,
    name: "Alumni Three",
    hobbies: "Photography, Gaming",
    currentJob: "UX Designer at DEF",
    image: "http://localhost:5000/uploads/photo-1438761681033-6461ffad8d80.jpg",
    city: "Hyderabad",
    linkedin: "https://linkedin.com/in/alumni-three",
    achievements: "Designed award-winning UI for DEF"
  },
  {
    id: 4,
    name: "Alumni Four",
    hobbies: "Writing, Traveling",
    currentJob: "Product Manager at GHI",
    image: "http://localhost:5000/uploads/photo-1507003211169-0a1dd7228f2d.jpg",
    city: "Mumbai",
    linkedin: "https://linkedin.com/in/alumni-four",
    achievements: "Launched 3 successful products"
  }
];

// Users mock data
const userData = [
  {
    id: 1,
    name: "User One",
    image: "http://localhost:5000/uploads/istockphoto-2172370243-2048x2048.jpg"
  },
  {
    id: 2,
    name: "User Two",
    image: "http://localhost:5000/uploads/istockphoto-1482996923-2048x2048.jpg"
  },
  {
    id: 3,
    name: "User Three",
    image: "http://localhost:5000/uploads/istockphoto-1466995518-612x612.jpg"
  }
];

// ------------------ ROUTES ------------------

// Fetch all alumni
app.get("/api/alumni", (req, res) => {
  res.json(alumniData);
});

// Fetch all users (for searching)
app.get("/api/users", (req, res) => {
  res.json(userData);
});

// Fetch full user details (for Alumni to view)
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userData.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const fullUser = {
    ...user,
    regNo: `BL.EN.U4CSE${2200 + userId}`, // Example regNo
    semester: 4 + userId // Sample semester
  };

  res.json(fullUser);
});


// ------------------ INBOXES ------------------

// Inbox for alumni (messages from users)
const alumniInboxData = [
  {
    from: "User One",
    to: "Alumni One",
    message: "Hi Alumni, I would love to connect!",
    timestamp: new Date(Date.now() - 5000000).toISOString()
  },
  {
    from: "User Two",
    to: "Alumni Two",
    message: "Can you help me with career advice?",
    timestamp: new Date(Date.now() - 10000000).toISOString()
  },
  {
    from: "User Three",
    to: "Alumni Three",
    message: "Hey Alumni, let's connect!",
    timestamp: new Date(Date.now() - 15000000).toISOString()
  }
];

// Alumni inbox API
app.get('/api/alumni/inbox', (req, res) => {
  const formattedMessages = alumniInboxData.map(msg => {
    const user = userData.find(u => u.name === msg.from);
    return {
      from: msg.from,
      message: msg.message,
      userImage: user ? user.image : null,
      timestamp: msg.timestamp
    };
  });
  
  res.json(formattedMessages);
});

// Inbox for users (messages from alumni)
app.get('/api/inbox', (req, res) => {
  res.json(inboxData);
});

// Post message from alumni to user
app.post("/api/alumni/messages", (req, res) => {
  const { from, to, message } = req.body;
  console.log(`Message from ${from} to user ID ${to}: ${message}`);
  // Optional: Save to DB or memory
  res.status(200).json({ message: "Message sent successfully!" });
});

// ------------------ ANNOUNCEMENTS ------------------

let announcements = [];

app.post("/api/announcement", (req, res) => {
  const { title, details } = req.body;
  const newAnnouncement = {
    id: announcements.length + 1,
    title,
    details,
    timestamp: new Date()
  };
  announcements.push(newAnnouncement);
  console.log("New announcement sent:", newAnnouncement);
  res.status(200).json({ message: "Announcement posted!" });
});

app.get("/api/announcement", (req, res) => {
  res.json(announcements);
});

// ------------------ START SERVER ------------------

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
