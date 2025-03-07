import React, { useState } from 'react';
import './ProfilePage.css';
import bubble from './assets/bubble.jpg';
import { useNavigate } from 'react-router-dom';

function ProfileScreen() {
  const navigate = useNavigate();

  const initialProfile = {
    username: "Bubble",
    bio: "Fitness enthusiast and runner.",
    sex: "Female",
    weight: 132,  // Store the weight as a numeric value (in lbs)
    goals: "Build muscle, improve endurance, and stay healthy.",
    rank: "Gold III",
    level: "17",
    experience: "10/15",
    avatar: bubble
  };

  const [userProfile, setUserProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(initialProfile);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "weight") {
      if (!isNaN(value) && value > 0 && value <= 1000) {
        setEditData({ ...editData, [name]: value });
        setError('');
      } else if (value <= 0) {
        setError('Weight cannot be 0 or less');
      } else {
        setError('Weight cannot exceed 1000 lbs');
      }
    } else if (name === "bio" || name === "goals") {
      if (value.length <= 60) {
        setEditData({ ...editData, [name]: value });
        setError('');
      } else {
        setError('Text fields cannot exceed 60 characters');
      }
    } else {
      setEditData({ ...editData, [name]: value });
      setError('');
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      setEditData(userProfile);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Ensure no field is empty and validate the data
    if (editData.bio && editData.goals && editData.weight > 0 && editData.weight <= 1000) {
      if (editData.bio.length <= 60 && editData.goals.length <= 60) {
        setUserProfile({ ...editData, weight: parseInt(editData.weight, 10) });  // Save weight as an integer
        setIsEditing(false);
        setError('');
      } else {
        setError('Please correct the fields before saving');
      }
    } else {
      setError('Fields cannot be empty and weight must be greater than 0');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-visual">
        <h1 className="profile-username">{userProfile.username}</h1>
        <div className="profile-content">
          <img src={userProfile.avatar} alt="Profile" className="profile-picture" />
        </div>
      </div>

      <div className="custom-button" onClick={() => navigate('/stats-history')}>
        View Stats and History
      </div>

      <div className="profile-container">
        <h2>About You</h2>
        <div className="profile-info">
          <p><strong>Level:</strong> {userProfile.level}</p>
          <p><strong>Rank:</strong> <span className="rank">{userProfile.rank}</span></p>
          <p><strong>Experience:</strong> <span className="experience">{userProfile.experience} XP</span></p>

          {isEditing ? (
            <>
              <p><strong>Bio:</strong> <textarea name="bio" value={editData.bio} onChange={handleInputChange} /></p>
              <p><strong>Sex:</strong> 
                <select name="sex" value={editData.sex} onChange={handleInputChange}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </p>
              <p><strong>Weight:</strong> 
                <input 
                  type="number" 
                  name="weight" 
                  value={editData.weight} 
                  onChange={handleInputChange} 
                  min="1"  // Ensure weight is positive
                  max="1000" 
                /> lbs</p>  
              <p><strong>Goals:</strong> <textarea name="goals" value={editData.goals} onChange={handleInputChange} /></p>
            </>
          ) : (
            <>
              <p><strong>Bio:</strong> {userProfile.bio}</p>
              <p><strong>Sex:</strong> {userProfile.sex}</p>
              <p><strong>Weight:</strong> {userProfile.weight} lbs</p>  
              <p><strong>Goals:</strong> {userProfile.goals}</p>
            </>
          )}

          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="button-container">
          {isEditing ? (
            <>
              <button className="regular-button" onClick={handleSave}>Save</button>
              <button className="regular-button cancel-button" onClick={toggleEditMode}>Cancel</button>
            </>
          ) : (
            <button className="regular-button" onClick={toggleEditMode}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
