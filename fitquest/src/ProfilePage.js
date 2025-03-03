import React from 'react';
import './ProfilePage.css'; 
import bubble from './assets/bubble.jpg';

function ProfileScreen() {
  const userProfile = {
    username: "Bubble",
    bio: "Fitness enthusiast and runner.",
    sex: "Female",
    weight: "60kg",
    goals: "Build muscle, improve endurance, and stay healthy.",
    rank: "Gold III",
    level: "17",
    experience: "10/15",
    avatar: bubble
  };

  return (
    <div className="profile-page">
      {/* Profile Visual Elements */}
      <div className="profile-visual">
        <h1 className="profile-username">{userProfile.username}</h1>

        <div className="profile-content">
          <img src={userProfile.avatar} alt="Profile" className="profile-picture" />
        </div>
      </div>

      <div className="profile-container">
        <h2>About You</h2>
        <div className="profile-info">
          <p><strong>Level:</strong> {userProfile.level}</p>
          <p><strong>Rank:</strong> <span className="rank">{userProfile.rank}</span></p>
          <p><strong>Experience:</strong> <span className="experience">{userProfile.experience} XP</span></p>
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
 