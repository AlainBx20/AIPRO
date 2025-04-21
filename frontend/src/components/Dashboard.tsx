import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import History from './History';
import Settings from './Settings';
import '../styles/Dashboard.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type View = 'chat' | 'history' | 'settings';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<View>('chat');
  const [user, setUser] = useState({ 
    name: 'User', 
    email: localStorage.getItem('userEmail') || 'user@example.com' 
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }
    setUser(prev => ({ ...prev, email: userEmail }));
  }, [navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const saveChatSession = (messages: Message[]) => {
    const sessionId = Date.now().toString();
    const sessionTitle = messages[0]?.content.slice(0, 30) + (messages[0]?.content.length > 30 ? '...' : '');
    
    const newSession = {
      id: sessionId,
      title: sessionTitle,
      messages: messages,
      lastUpdated: new Date()
    };

    const existingSessions = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    const updatedSessions = [newSession, ...existingSessions];
    localStorage.setItem('chatHistory', JSON.stringify(updatedSessions));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveChatSession(finalMessages);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'history':
        return <History />;
      case 'settings':
        return <Settings />;
      case 'chat':
      default:
        return (
          <div className="chat-container">
            <div className="chat-header">
              <h2>AI Assistant</h2>
              <div className="model-info">
                <span className="model-tag">GPT-3.5</span>
                <span className="status-indicator online"></span>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-header">
                    <span className="message-role">{message.role === 'user' ? 'You' : 'AI'}</span>
                    <span className="message-time">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>
                <i className="icon">📤</i>
              </button>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="user-info">
          <div className="avatar">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="sidebar-menu">
          <button 
            className={`menu-item ${currentView === 'chat' ? 'active' : ''}`}
            onClick={() => setCurrentView('chat')}
          >
            <i className="icon">💬</i>
            <span>Chat</span>
          </button>
          <button 
            className={`menu-item ${currentView === 'history' ? 'active' : ''}`}
            onClick={() => setCurrentView('history')}
          >
            <i className="icon">📝</i>
            <span>History</span>
          </button>
          <button 
            className={`menu-item ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            <i className="icon">⚙️</i>
            <span>Settings</span>
          </button>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <i className="icon">🚪</i>
          <span>Logout</span>
        </button>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 