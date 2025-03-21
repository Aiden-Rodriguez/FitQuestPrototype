import React, { useState, useEffect } from 'react';
import './FriendsPage.css';
import croc from './assets/croc.png';
import horse from './assets/horse.png';
import monkey from './assets/monkey.png';
import bubble from './assets/bubble.jpg';
import users from './users';
import { useNavigate } from 'react-router-dom';

const user = {
  username: 'Bubble',
  rank: 'Gold III',
  progress: '10/15',
  level: 'lvl17',
  avatar: bubble
};

const initialFriends = [
  { id: 1, name: 'Alice', avatar: croc, lvl: 10, Rank: 'Silver 2' },
  { id: 2, name: 'Bob', avatar: horse, lvl: 6, Rank: 'Bronze 1' },
  { id: 3, name: 'Charlie', avatar: monkey, lvl: 22, Rank: 'Platinum 3' }
];

export default function FriendsScreen() {
  const navigate = useNavigate();
  const [isOpenSuccessfulFriendAdd, setIsOpenSuccessfulFriendAdd] = useState(false);
  const [isOpenSuccessfulFriendRemove, setIsOpenSuccessfulFriendRemove] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
  const [isOpenViewRequests, setIsOpenViewRequests] = useState(false);
  const [isOpenViewPending, setIsOpenViewPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableUsers, setAvailableUsers] = useState(users);
  const [lastAddedFriend, setLastAddedFriend] = useState(null);
  const [lastRemovedFriend, setLastRemovedFriend] = useState(null);


  const handleFriendClick = (friend) => {
    const isFriend = friends.some((f) => f.id === friend.id);
    if (isFriend) {
      setSelectedFriend(friend); // Existing friend, no isFriend property needed
    } else {
      setSelectedFriend({ ...friend, isFriend: false }); // Potential friend
    }
  };

  const [friends, setFriends] = useState(() => {
    const savedFriends = JSON.parse(localStorage.getItem('friends'));
    return savedFriends || [];
  });

  useEffect(() => {
    if (friends.length > 0) {
      localStorage.setItem('friends', JSON.stringify(friends));
    }
  }, [friends]);

  const toggleOpenAddFriend = () => {
    setIsOpenAddFriend(!isOpenAddFriend);
    setSearchTerm('');
  };
  const toggleOpenRequests = () => {
    setIsOpenViewRequests(!isOpenViewRequests);
  };
  const toggleOpenPending = () => {
    setIsOpenViewPending(!isOpenViewPending);
  };

  const handleCloseOverlayViewFriend = () => {
    setSelectedFriend(null);
  };

  const handleAddFriend = (userToAdd) => {
    const updatedFriends = [...friends, userToAdd];
    setFriends(updatedFriends);
    setAvailableUsers(availableUsers.filter((u) => u.id !== userToAdd.id));
    setLastAddedFriend(userToAdd);
    setSelectedFriend(null);
    setIsOpenAddFriend(!isOpenAddFriend);
    setIsOpenSuccessfulFriendAdd(!isOpenSuccessfulFriendAdd);
  };
  
  const handleRemoveFriend = (userToRemove) => {
    const updatedFriends = friends.filter((u) => u.id !== userToRemove.id);
    setFriends(updatedFriends);
    setAvailableUsers([...availableUsers, userToRemove]); 
    setLastRemovedFriend(userToRemove);
    setSelectedFriend(null);
    setIsOpenSuccessfulFriendRemove(!isOpenSuccessfulFriendRemove);
  };

  const filteredUsers = availableUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAlreadyFriend = (friend) => {
    return friends.some((f) => f.id === friend.id);
  };

  return (
    <div className="friends-container" >
      <div className="top-bar">
        <div className="top-left">
          <img src={user.avatar} alt="Profile" className="profile-pic" onClick={() => navigate('/profile')}/>
        </div>
        <div className="top-middle">
          <span className="user-name">{user.username}</span>
          <span className="user-rank">{user.rank}</span>
          <span className="user-progress">{user.progress}</span>
        </div>
        <div className="top-right">
          <span className="user-level">{user.level}</span>
        </div>
      </div>

      <div className="add-friends-bar" >
        <div className="top-left" style={{ marginLeft: '20px' }}>
          <button className="regular-button" style={{width:"100px"}} onClick={() => toggleOpenAddFriend()}>
            Add New
          </button>
        </div>
        <div className="top-middle">
          <button className="regular-button" onClick={() => toggleOpenRequests()}>
            Requests
          </button>
        </div>
        <div className="top-right" style={{ marginRight: '20px' }}>
          <button className="regular-button" onClick={() => toggleOpenPending()}>
            Pending
          </button>
        </div>
      </div>

      <ul className="friends-list">
        {friends.map((friend) => (
          <li key={friend.id} className="friend-item" onClick={() => handleFriendClick(friend)}>
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <span className="friend-name">{friend.name}</span>
          </li>
        ))}
      </ul>

      {selectedFriend && (
        <div className="overlay profile-overlay">
          <div className="overlay-content">
            <h2>{selectedFriend.name}</h2>
            <img src={selectedFriend.avatar} alt={selectedFriend.name} className="overlay-avatar" />
            <p>{selectedFriend.name}'s profile.</p>
            <p>Level: {selectedFriend.lvl}</p>
            <p>Rank: {selectedFriend.Rank}</p>
            <div className='button-container'>
                {!isAlreadyFriend(selectedFriend) && (
                <button className="regular-button" onClick={() => handleAddFriend(selectedFriend)}>
                    Add Friend
                </button>
                )}
                <button className="regular-button" onClick={handleCloseOverlayViewFriend}>
                    Close
                </button>
                <button className="regular-button" onClick={ () => handleRemoveFriend(selectedFriend)}>
                    Remove Friend
                </button>
            </div>
          </div>
        </div>
      )}

      {isOpenAddFriend && (
        <div className="overlay add-friend-overlay">
          <div className="overlay-content">
            <h2>Add a Friend</h2>
            <input
              type="text"
              className="search-bar"
              placeholder="Search for a friend..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="search-results" style={{ marginRight: '40px' }}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li key={user.id} className="friend-item" onClick={() => handleFriendClick(user)}>
                    <img src={user.avatar} alt={user.name} className="friend-avatar" />
                    <span className="friend-name">{user.name}</span>
                  </li>
                ))
              ) : (
                <p>No users found</p>
              )}
            </ul>
            <button className="regular-button" onClick={toggleOpenAddFriend}>
              Close
            </button>
          </div>
        </div>
      )}

      {isOpenViewRequests && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Requests</h2>
            <p>No current requests</p>
            <button className="regular-button" onClick={toggleOpenRequests}>
              Close
            </button>
          </div>
        </div>
      )}

      {isOpenViewPending && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Pending</h2>
            <p>No pending requests</p>
            <button className="regular-button" onClick={toggleOpenPending}>
              Close
            </button>
          </div>
        </div>
      )}

      {isOpenSuccessfulFriendAdd && (
        <div className="modal-overlay" onClick={() => setIsOpenSuccessfulFriendAdd(!isOpenSuccessfulFriendAdd)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            Added {lastAddedFriend?.name} successfully!
          <button className="close-button" onClick={() => setIsOpenSuccessfulFriendAdd(!isOpenSuccessfulFriendAdd)}>
            Close
          </button>
        </div>
      </div>
    )}

    {isOpenSuccessfulFriendRemove && (
        <div className="modal-overlay" onClick={() => setIsOpenSuccessfulFriendRemove(!isOpenSuccessfulFriendRemove)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            Removed {lastRemovedFriend?.name} successfully!
          <button className="close-button" onClick={() => setIsOpenSuccessfulFriendRemove(!isOpenSuccessfulFriendRemove)}>
            Close
          </button>
        </div>
      </div>
    )}
    </div>
  );
}
