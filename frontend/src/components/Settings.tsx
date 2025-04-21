import React, { useState } from 'react';
import '../styles/Settings.css';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  soundEffects: boolean;
  messageHistory: boolean;
  autoSave: boolean;
  language: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'dark',
    notifications: true,
    soundEffects: true,
    messageHistory: true,
    autoSave: true,
    language: 'en'
  });

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <p className="settings-subtitle">Customize your chat experience</p>
      </div>

      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Theme</label>
            <p>Choose your preferred theme</p>
          </div>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            className="theme-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Enable Notifications</label>
            <p>Receive notifications for new messages</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label>Sound Effects</label>
            <p>Play sounds for new messages</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.soundEffects}
              onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Chat Settings</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Save Message History</label>
            <p>Store your chat history locally</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.messageHistory}
              onChange={(e) => handleSettingChange('messageHistory', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <label>Auto-save Drafts</label>
            <p>Automatically save message drafts</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Language</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Interface Language</label>
            <p>Choose your preferred language</p>
          </div>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-button">Save Changes</button>
        <button className="reset-button">Reset to Defaults</button>
      </div>
    </div>
  );
};

export default Settings; 