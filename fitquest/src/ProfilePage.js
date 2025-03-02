import React from 'react';
import './ProfilePage.css'; // Ensure styles are scoped to this page
import bubble from './assets/bubble.jpg'; // Profile picture of Bubble

function ProfileScreen() {
  const userProfile = {
    username: "Bubble",
    bio: "Fitness enthusiast and runner.",
    sex: "Female",
    weight: "60kg",
    goals: "Build muscle, improve endurance, and stay healthy.",
    rank: "Gold III",
    level: "lvl17",
    experience: "10/15",
    avatar: bubble
  };

  return (
    <div className="profile-page">
      {/* Profile Visual Elements (Outside of user profile section) */}
      <div className="profile-visual">
        <h1 className="profile-username">{userProfile.username}</h1>

        <div className="profile-content">
          <span className="profile-rank">{userProfile.rank}</span>
          <img src={userProfile.avatar} alt="Profile" className="profile-picture" />
          <span className="profile-level">{userProfile.level}</span>
          <span className="profile-experience">{userProfile.experience} XP</span>
        </div>
      </div>

      {/* Background Information (Inside the user profile section) */}
      <div className="profile-container">
        <h2>About You</h2>
        <div className="profile-info">
          <p><strong>Bio:</strong> {userProfile.bio}</p>
          <p><strong>Sex:</strong> {userProfile.sex}</p>
          <p><strong>Weight:</strong> {userProfile.weight}</p>
          <p><strong>Goals:</strong> {userProfile.goals}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
