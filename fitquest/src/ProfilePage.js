import React from 'react';
import './ProfilePage.css'; // Import the updated styles

function ProfileScreen() {
  const userProfile = {
    username: "Bubble",
    bio: "Fitness enthusiast and runner.",
    sex: "Female",
    weight: "60kg",
    goals: "Build muscle, improve endurance, and stay healthy."
  };

  return (
    <div className="profile-wrapper"> {/* This ensures centering */}
      <div className="profile-container">
        <h1>Your Profile</h1>
        <div className="profile-info">
          <p><strong>Username:</strong> {userProfile.username}</p>
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
