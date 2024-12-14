import React from 'react';

const AdminPage = ({ users }) => {
  return (
    <div>
      <h1>Scoreboard</h1>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users have taken the quiz yet.</p>
      )}
    </div>
  );
};

export default AdminPage;