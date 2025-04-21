import React from 'react'; // Add React import
import { useAuth } from '../context/AuthContext'; // Fix path

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Welcome to your Dashboard</h1>
      <button onClick={logout} className="logout-button">
        Logout
      </button>
      <div className="chat-interface">
        {/* We'll add the OpenRouter chat components here later */}
        <p>Chat interface coming soon...</p>
      </div>
    </div>
  );
}