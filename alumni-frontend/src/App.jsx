import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetAnnouncement from './components/GetAnnouncement';
import SearchUsers from './components/SearchUsers';
import Inbox from './components/Inbox';
import Help from './components/Help';
import BottomNav from './components/BottomNav';
import UserProfileForAlumni from "./components/UserProfileForAlumni";
import AlumniLogin from "./components/AlumniLogin";
import './App.css';
import DirectMessage from './components/DirectMessage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GetAnnouncement />} />
          <Route path="/search" element={<SearchUsers />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/help" element={<Help />} />
          <Route path="/user/:id" element={<UserProfileForAlumni />} />
          <Route path="/login" element={<AlumniLogin />} />
          <Route path="/dm/:id" element={<DirectMessage />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;

