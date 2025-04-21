import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Loading.css';

const Loading: React.FC = () => {
  const navigate = useNavigate();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    "Did you know? Regular breaks can improve your productivity by up to 20%",
    "Pro tip: Use the Pomodoro technique for better time management",
    "Fun fact: The average person spends 3 hours on their phone daily",
    "Quick tip: Stay hydrated! Water helps maintain focus and energy",
    "Remember: Small consistent actions lead to big results",
    "Pro tip: Organize your tasks by priority using the Eisenhower Matrix",
    "Did you know? Exercise can boost your brain function by 20%",
    "Quick tip: Use the 2-minute rule for small tasks",
    "Remember: Quality sleep is essential for optimal performance",
    "Pro tip: Batch similar tasks together to maintain focus",
    "Did you know? Natural light exposure improves alertness and mood",
    "Pro tip: Start your day with the most important task first",
    "Quick tip: Take a 5-minute walk every hour to refresh your mind",
    "Remember: Deep work sessions are more effective than multitasking",
    "Pro tip: Use the 80/20 rule to focus on high-impact activities",
    "Did you know? Meditation can reduce stress and improve focus",
    "Quick tip: Keep a notepad nearby to capture random thoughts",
    "Remember: Regular exercise improves both physical and mental health",
    "Pro tip: Set specific, measurable goals for better progress tracking",
    "Did you know? Blue light filters can improve sleep quality",
    "Quick tip: Practice gratitude daily for better mental well-being",
    "Remember: Learning new skills keeps your brain active and healthy",
    "Pro tip: Use the '5 Whys' technique to solve problems effectively",
    "Did you know? Social connections are vital for mental health",
    "Quick tip: Take deep breaths when feeling stressed or overwhelmed"
  ];

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000);

    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(tipInterval);
    };
  }, [navigate, tips.length]);

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="ground">
          <div></div>
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`box box${i}`}>
            <div></div>
          </div>
        ))}
      </div>
      <div className="tips-container">
        <span className="tip-text">{tips[currentTipIndex]}</span>
      </div>
      <small className="chrome-bug">
   
      </small>
    </div>
  );
};

export default Loading; 