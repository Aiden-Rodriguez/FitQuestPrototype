import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { IoHome, IoHomeOutline, IoBarbell, IoBarbellOutline, IoPerson, IoPersonOutline, IoPeople, IoPeopleOutline } from 'react-icons/io5';
import './App.css';
import ProfileScreen from './ProfilePage';
import FriendsScreen from './FriendsPage';
import StatsHistoryScreen from './StatsHistoryScreen';
import WorkoutsScreen from './workouts';
import "./HomeScreen.css";
import bellIcon from "./assets/bellicon.png";

// Individual screen components
function HomeScreen() {
  const navigate = useNavigate();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const closeOverlay = (event) => {
    if (event.target.classList.contains("overlay")) {
      setIsOverlayOpen(false);
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="header">
        <h1 className="title">FitQuest</h1>
        <img 
          src={bellIcon} 
          alt="Notifications" 
          className="bell-icon" 
          onClick={toggleOverlay} 
        />
      </div>

      {/* Notification Overlay */}
      {isOverlayOpen && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content">
            <p>No notifications</p>
          </div>
        </div>
      )}

      {/* Level Display */}
      <div className="level-display">
        <span className="rank-text">Gold Rank</span>
        <button className="level-circle" onClick={() => navigate('/stats-history')}>
          <span className="level-text">LEVEL</span>
          <span className="level-number">17</span>
          <span className="xp-progress">10/15</span>
        </button>
      </div>

      {/* Ongoing Quest Section */}
      <div className="quest-section">
        <h3>Ongoing Quests:</h3>
        <div className="quest-box">15 Crunches</div>
        <div className="quest-box">29 Pull-Ups</div>
      </div>
    </div>
  );
}


// function StatsHistoryScreen() { ... } has been removed because it is already declared

// Main App component with bottom navigation
function App() {
  return (
    <Router>
      <div className="app">
        {/* Content Area */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/workouts" element={<WorkoutsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/friends" element={<FriendsScreen />} />
          <Route path="/stats-history" element={<StatsHistoryScreen />} />
        </Routes>

        {/* Bottom Navigation Bar */}
        <nav className="tab-bar">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>
            {({ isActive }) => (
              <>
                {isActive ? <IoHome size={24} /> : <IoHomeOutline size={24} />}
                <span>Home</span>
              </>
            )}
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>
            {({ isActive }) => (
              <>
                {isActive ? <IoBarbell size={24} /> : <IoBarbellOutline size={24} />}
                <span>Workouts</span>
              </>
            )}
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>
            {({ isActive }) => (
              <>
                {isActive ? <IoPerson size={24} /> : <IoPersonOutline size={24} />}
                <span>Profile</span>
              </>
            )}
          </NavLink>
          <NavLink to="/friends" className={({ isActive }) => (isActive ? 'tab-item active' : 'tab-item')}>
            {({ isActive }) => (
              <>
                {isActive ? <IoPeople size={24} /> : <IoPeopleOutline size={24} />}
                <span>Friends</span>
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;
