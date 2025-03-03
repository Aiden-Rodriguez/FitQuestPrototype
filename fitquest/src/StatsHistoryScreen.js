import React, { useState, useEffect } from 'react';
import './StatsHistory.css';
import './workoutsScreen.css';
import bubble from './assets/bubble.jpg';

function StatsHistoryScreen() {
  const [activeTab, setActiveTab] = useState('stats');
  const [workouts, setWorkouts] = useState([]);

  // Load workouts from localStorage
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    setWorkouts(savedWorkouts);
  }, []);

  return (
    <div className="stats-history-wrapper">
      <div className="profile-header">
        <img src={bubble} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2>Bubble</h2>
          <p>Rank: Gold III</p>
          <p>Lvl 17 (10/15 exp)</p>
          <div className="progress-bar"><div className="progress" style={{ width: '50%' }}></div></div>
        </div>
        <button className="edit-button">Edit</button>
      </div>

      <div className="tab-nav">
        <button className={activeTab === 'stats' ? 'tab-button active' : 'tab-button'} onClick={() => setActiveTab('stats')}>Stats</button>
        <button className={activeTab === 'history' ? 'tab-button active' : 'tab-button'} onClick={() => setActiveTab('history')}>History</button>
      </div>

      {activeTab === 'stats' && (
        <div className="stats-section">
          <div className="stat-card">
            <p><strong>Steps:</strong> 5,373 steps</p>
            <div className="stat-graph">📊</div>
          </div>
          <div className="stat-card">
            <p><strong>Bench - Flat:</strong> 200lbs for 3 reps</p>
            <div className="stat-icon">🏋️</div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-section">
          <h3>Workout History</h3>
          {workouts.length === 0 ? (
            <p>No workouts added yet.</p>
          ) : (
            <p> 
              <p>
              20 Crunches 02/28/25
              </p>
              <p>
              30 Pull-Ups 03/01/25
              </p>
            </p>
          )}
        </div>
      )}

      <nav className="bottom-nav">
        <button>🏋️</button>
        <button>🏠</button>
        <button>👥</button>
        <button>👤</button>
      </nav>
    </div>
  );
}

export default StatsHistoryScreen;
