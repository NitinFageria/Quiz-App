import React, { useState } from 'react';
import QuizPage from './QuizPage';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]); // List of users and scores
  const [isAdmin, setIsAdmin] = useState(false); // Admin login state
  const [userName, setUserName] = useState(''); // User's name input state
  const [isQuizStarted, setIsQuizStarted] = useState(false); // Whether quiz has started

  const [adminLogin, setAdminLogin] = useState({ username: '', password: '' }); // Admin username and password

  // Admin login function
  const handleAdminLogin = () => {
    if (adminLogin.username === 'admin' && adminLogin.password === 'admin123') {
      setIsAdmin(true);
    } else {
      alert('Invalid admin credentials!');
    }
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <h1 className="welcome-message">Welcome to the Quiz!</h1>

        {/* User Name Input Section */}
        {!isQuizStarted && !isAdmin && (
          <div className="start-quiz">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              onClick={() => {
                if (userName.trim() === '') {
                  alert('Please enter your name!');
                  return;
                }
                setIsQuizStarted(true);
              }}
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Show Quiz Section */}
        {isQuizStarted && !isAdmin && (
          <QuizPage
            users={users}
            setUsers={setUsers}
            userName={userName}
          />
        )}
      </div>

      {/* Admin Login Section */}
      {!isAdmin && (
        <div className="admin-login">
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Admin Username"
            value={adminLogin.username}
            onChange={(e) => setAdminLogin({ ...adminLogin, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={adminLogin.password}
            onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
          />
          <button onClick={handleAdminLogin}>Login</button>
        </div>
      )}

      {/* Show Admin Page */}
      {isAdmin && (
        <div className="admin-dashboard">
          <h2>Scoreboard</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="2">No users have taken the quiz yet.</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;