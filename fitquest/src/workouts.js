import React, { useState, useEffect } from 'react';
import './workoutsScreen.css';
import bubble from './assets/bubble.jpg';
import { useNavigate } from 'react-router-dom';

function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState([]);
  const [deletedWorkouts, setDeletedWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUndoModal, setShowUndoModal] = useState(false);
  const [showGainedExp, setShowGainedExp] = useState(false);
  const [progress, setprogress] = useState('10');
  const [expGain, setExpGain] = useState(1);
  const [currentWorkout, setCurrentWorkout] = useState({
    id: null,
    name: '',
    split: '',
    details: '',
    difficulty: '',
    customSplit: '',
    timesCompleted: 0  
  });

  const user = {
    username: 'Bubble',
    rank: 'Gold III',
    progress: progress + '/15',
    level: 'lvl17',
    avatar: bubble
  };

  // Open modal for a new workout
  const openNewWorkoutModal = () => {
    setCurrentWorkout({ 
      id: null, 
      name: '', 
      split: '', 
      details: '', 
      difficulty: '', 
      customSplit: '',
      timesCompleted: 0
    });
    setShowModal(true);
  };

   useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
    setWorkouts(savedWorkouts);
  }, []);

  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem('workouts', JSON.stringify(workouts));
    }
  }, [workouts]);

  const handleCardClick = (workout) => {
    setCurrentWorkout(workout);
    setShowModal(true);
  };

  // Update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkout((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update the workout on form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedWorkouts;
    if (currentWorkout.id === null) {
      // Add new workout with a unique id
      const newWorkout = { ...currentWorkout, id: Date.now() };
      updatedWorkouts = [...workouts, newWorkout];
      setWorkouts(updatedWorkouts);
    } else {
      // Update existing workout
      updatedWorkouts = workouts.map((w) =>
        w.id === currentWorkout.id ? currentWorkout : w
      );
    }
    setWorkouts(updatedWorkouts);
    setShowModal(false);
  };

  // Delete workout functionality from modal
  const handleDelete = () => {
    if (currentWorkout.id !== null) {
      setDeletedWorkouts((prev) => [currentWorkout, ...prev]);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== currentWorkout.id));
      setShowModal(false);
    }
  };

  // Show undo modal regardless of whether there are deleted workouts
  const openUndoModal = () => {
    setShowUndoModal(true);
  };

  // Perform the actual undo action when confirmed in the modal
  const handleUndo = () => {
    if (deletedWorkouts.length > 0) {
      const lastDeleted = deletedWorkouts[0];
      setWorkouts((prev) => [lastDeleted, ...prev]);
      setDeletedWorkouts((prev) => prev.slice(1));
    }
    setShowUndoModal(false);
  };

  const handleComplete = () => {
    if (currentWorkout.id !== null) {
      let gainedExp = 1;
      if (currentWorkout.difficulty === 'Medium') {
        gainedExp = 2;
      } else if (currentWorkout.difficulty === 'Hard') {
        gainedExp = 3;
      }

      const updatedWorkouts = workouts.map((workout) =>
        workout.id === currentWorkout.id
          ? { ...workout, timesCompleted: workout.timesCompleted + 1 }
          : workout
      );
      setWorkouts(updatedWorkouts);

      setExpGain(gainedExp);
      setprogress((prev) => String(parseInt(prev) + gainedExp));

      setShowModal(false);
      setShowGainedExp(true);
    }
  };

  // Delete workout directly from card
  const handleDeleteFromCard = (id) => {
    const workoutToDelete = workouts.find((workout) => workout.id === id);
    if (workoutToDelete) {
      setDeletedWorkouts((prev) => [workoutToDelete, ...prev]);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
    }
  };
  
  const navigate = useNavigate();
  return (
    <div className="workouts-container">
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
      <h1>Your Workouts</h1>
      <div className="workouts-list">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="workout-card"
            onClick={() => handleCardClick(workout)}
          >
            <button
              className="delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFromCard(workout.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#e74c3c"
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z" />
              </svg>
            </button>
            <h2>{workout.name || "Unnamed Workout"}</h2>
            <p className="workout-split">Split: {workout.split}</p>
            {workout.split === "Custom" && workout.customSplit && (
              <p className="workout-custom-split">Custom: {workout.customSplit}</p>
            )}
            <p className="workout-difficulty">Difficulty: {workout.difficulty}</p>
            <p>{workout.details}</p>
            <p className="workout-times-completed">
              Completed: {workout.timesCompleted} {workout.timesCompleted === 1 ? 'time' : 'times'}
            </p>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={openNewWorkoutModal}>
        <span className="plus-icon">+</span>
      </button>
      <button className="undo-button" onClick={openUndoModal}>
        <div className="undo-content">
          <span className="undo-icon">⟲</span>
          <span className="undo-text">Undo</span>
        </div>
      </button>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{currentWorkout.id ? "Edit Workout" : "Add Workout"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Workout Name:
                <input
                  type="text"
                  name="name"
                  value={currentWorkout.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Split:
                <select
                  name="split"
                  value={currentWorkout.split}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a split</option>
                  <option value="Push/Pull/Legs">Push/Pull/Legs</option>
                  <option value="Upper/Lower">Upper/Lower</option>
                  <option value="Full Body">Full Body</option>
                  <option value="Custom">Custom</option>
                </select>
              </label>
              {currentWorkout.split === 'Custom' && (
                <label>
                  Custom Split:
                  <input
                    type="text"
                    name="customSplit"
                    value={currentWorkout.customSplit}
                    onChange={handleInputChange}
                    placeholder="Enter custom split details"
                    required
                  />
                </label>
              )}
              <label>
                Difficulty:
                <select
                  name="difficulty"
                  value={currentWorkout.difficulty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
              <label>
                Details:
                <textarea
                  name="details"
                  value={currentWorkout.details}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <button type="submit" className="confirm-button">
                Confirm
              </button>
            </form>
            {currentWorkout.id !== null && (
              <button className="complete-workout-button" onClick={handleComplete}>
                Complete Workout
              </button>
            )}
            {currentWorkout.id !== null && (
              <button className="delete-button" onClick={handleDelete}>
                Delete Workout
              </button>
            )}
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {showGainedExp && (
        <div className="modal-overlay" onClick={() => setShowGainedExp(!showGainedExp)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            Gained {expGain} exp!
            <button className="close-button" onClick={() => setShowGainedExp(!showGainedExp)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showUndoModal && (
        <div className="modal-overlay" onClick={() => setShowUndoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {deletedWorkouts.length > 0 ? (
              <>
                <p>Undo last deleted workout?</p>
                <button className="confirm-button" onClick={handleUndo}>
                  Undo
                </button>
              </>
            ) : (
              <p>No deleted workouts to restore.</p>
            )}
            <button className="close-button" onClick={() => setShowUndoModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutsScreen;