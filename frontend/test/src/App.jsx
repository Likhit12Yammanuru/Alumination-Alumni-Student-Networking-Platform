import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SwipeAlumni from "./components/SwipeAlumni";
import SearchAlumni from "./components/SearchAlumni";
import AlumniProfile from "./components/AlumniProfile";
import BottomNav from "./components/BottomNav";
import Inbox from "./components/Inbox";
import DmChat from "./components/DmChat";
import Announcement from "./components/Announcement";

const App = () => {
  return (
    <Router>
      <div style={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<SwipeAlumni />} />
          <Route path="/search" element={<SearchAlumni />} />
          <Route path="/alumni/:id" element={<AlumniProfile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/dm/:alumniId" element={<DmChat/>} />
          <Route path="/announcement" element={<Announcement />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
