import React, { useState } from 'react';
import './FriendsPage.css';
import croc from './assets/croc.png';
import horse from './assets/horse.png';
import monkey from './assets/monkey.png';
import bubble from './assets/bubble.jpg';

const user = {
  username: "Bubble",
  rank: "Gold III",
  progress: "10/15",
  level: "lvl17",
  avatar: bubble
};

const friends = [
  { id: 1, name: "Alice", avatar: croc },
  { id: 2, name: "Bob", avatar: horse },
  { id: 3, name: "Charlie", avatar: monkey }
];

export default function FriendsScreen() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseOverlay = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="friends-container">
      <div className="top-bar">
        <div className="top-left">
          <img src={user.avatar} alt="Profile" className="profile-pic" />
        </div>
        <div className='top-middle'>
          <span className="user-name">{user.username}</span>
          <span className="user-rank">{user.rank}</span>
          <span className="user-progress">{user.progress}</span>
        </div>
        <div className="top-right">
          <span className="user-level">{user.level}</span>
        </div>
      </div>

      <ul className="friends-list">
        {friends.map(friend => (
          <li key={friend.id} className="friend-item" onClick={() => handleFriendClick(friend)}>
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <span className="friend-name">{friend.name}</span>
          </li>
        ))}
      </ul>

      {selectedFriend && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>{selectedFriend.name}</h2>
            <img src={selectedFriend.avatar} alt={selectedFriend.name} className="overlay-avatar" />
            <p>{selectedFriend.name}'s profile.</p>
            <button className="close-overlay" onClick={handleCloseOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
