import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { IoHome, IoHomeOutline, IoBarbell, IoBarbellOutline, IoPerson, IoPersonOutline, IoPeople, IoPeopleOutline } from 'react-icons/io5';
import './App.css';
import ProfileScreen from './ProfilePage';
import FriendsScreen from './FriendsPage';

// Individual screen components
function HomeScreen() {
  return (
    <div className="container">
      <h1>Welcome to the FitQuest Home Page!</h1>
    </div>
  );
}

function WorkoutsScreen() {
  return (
    <div className="container">
      <h1>Your Workouts</h1>
    </div>
  );
}

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
