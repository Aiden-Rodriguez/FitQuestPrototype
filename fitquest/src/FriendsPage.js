import React, { useState } from 'react';
import './FriendsPage.css';
import croc from './assets/croc.png';
import horse from './assets/horse.png';
import monkey from './assets/monkey.png';
import bubble from './assets/bubble.jpg';
import users from "./users";

const user = {
  username: "Bubble",
  rank: "Gold III",
  progress: "10/15",
  level: "lvl17",
  avatar: bubble
};

const friends = [
  { id: 1, name: "Alice", avatar: croc, lvl: 10, Rank: "Silver 2"},
  { id: 2, name: "Bob", avatar: horse, lvl: 6, Rank: "Bronze 1" },
  { id: 3, name: "Charlie", avatar: monkey, lvl: 22, Rank: "Platinum 3" }
];

export default function FriendsScreen() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
  const [isOpenViewRequests, setIsOpenViewRequests] = useState(false);
  const [isOpenViewPending, setIsOpenViewPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const toggleOpenAddFriend = () => {
    setIsOpenAddFriend(!isOpenAddFriend);
    setSearchTerm("");
  };
  const toggleOpenRequests = () => {
    setIsOpenViewRequests(!isOpenViewRequests)
  }
  const toggleOpenPending = () => {
    setIsOpenViewPending(!isOpenViewPending)
  }

  const handleCloseOverlayViewFriend = () => {
    setSelectedFriend(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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

      <div className='add-friends-bar'>
        <div className='top-left' style={{ marginLeft: '40px' }}>
          <button className='regular-button' onClick={() => toggleOpenAddFriend()}>
            Add New
          </button>
        </div>
        <div className='top-middle'>
          <button className='regular-button' onClick={() => toggleOpenRequests()}>
            Requests
          </button>
        </div>
        <div className='top-right' style={{ marginRight: '40px' }}>
          <button className='regular-button' onClick={() => toggleOpenPending()}>
            Pending
          </button>
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
            <p>Level: {selectedFriend.lvl}</p>
            <p>Rank: {selectedFriend.Rank}</p>
            <button className="regular-button" onClick={handleCloseOverlayViewFriend}>Close</button>
          </div>
        </div>
      )}

      {isOpenAddFriend && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Add a Friend</h2>
            <input
              type="text"
              className="search-bar"
              placeholder="Search for a friend..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="search-results">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <li key={user.id} className="friend-item">
                    <img src={user.avatar} alt={user.name} className="friend-avatar" />
                    <span className="friend-name">{user.name}</span>
                  </li>
                ))
              ) : (
                <p>No users found</p>
              )}
            </ul>
            <button className="regular-button" onClick={toggleOpenAddFriend}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}