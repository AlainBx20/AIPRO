import React, { useState, useEffect } from 'react';
import '../styles/History.css';

interface ChatSession {
  id: string;
  title: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  lastUpdated: Date;
}

const History: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    // Load chat history from localStorage
    const loadHistory = () => {
      const storedHistory = localStorage.getItem('chatHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory).map((session: any) => ({
          ...session,
          lastUpdated: new Date(session.lastUpdated),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setSessions(parsedHistory);
      }
    };

    loadHistory();
    // Set up listener for storage changes
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const now = new Date();
    const sessionDate = new Date(session.lastUpdated);
    
    switch (filter) {
      case 'today':
        return matchesSearch && sessionDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return matchesSearch && sessionDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return matchesSearch && sessionDate >= monthAgo;
      default:
        return matchesSearch;
    }
  });

  const deleteSession = (sessionId: string) => {
    const updatedSessions = sessions.filter(session => session.id !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem('chatHistory', JSON.stringify(updatedSessions));
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="history-container">
      <div className="history-sidebar">
        <div className="history-header">
          <h2>Chat History</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'today' ? 'active' : ''}
              onClick={() => setFilter('today')}
            >
              Today
            </button>
            <button 
              className={filter === 'week' ? 'active' : ''}
              onClick={() => setFilter('week')}
            >
              This Week
            </button>
            <button 
              className={filter === 'month' ? 'active' : ''}
              onClick={() => setFilter('month')}
            >
              This Month
            </button>
          </div>
        </div>
        <div className="sessions-list">
          {filteredSessions.map(session => (
            <div 
              key={session.id}
              className={`session-item ${selectedSession?.id === session.id ? 'active' : ''}`}
              onClick={() => setSelectedSession(session)}
            >
              <div className="session-title">
                {session.title || 'Untitled Conversation'}
              </div>
              <div className="session-meta">
                <span className="message-count">
                  {session.messages.length} messages
                </span>
                <span className="session-date">
                  {formatDate(session.lastUpdated)}
                </span>
              </div>
              <button 
                className="delete-session"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(session.id);
                }}
              >
                🗑️
              </button>
            </div>
          ))}
          {filteredSessions.length === 0 && (
            <div className="no-sessions">
              No conversations found
            </div>
          )}
        </div>
      </div>
      <div className="history-content">
        {selectedSession ? (
          <div className="session-details">
            <div className="session-header">
              <h3>{selectedSession.title || 'Untitled Conversation'}</h3>
              <span className="session-date">
                {formatDate(selectedSession.lastUpdated)}
              </span>
            </div>
            <div className="messages-container">
              {selectedSession.messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-header">
                    <span className="message-role">
                      {message.role === 'user' ? 'You' : 'AI'}
                    </span>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-session-selected">
            <h3>Select a conversation to view details</h3>
            <p>Your chat history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History; 