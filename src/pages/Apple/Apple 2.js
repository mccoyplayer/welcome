import React, { useState, useEffect } from 'react';
import { FaApple } from 'react-icons/fa';
import './Apple.css';

const Apple = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="apple-container">
      <FaApple className="apple-logo" />
      <div className="loader-container">
        <div className="loader" style={{ width: `${loadingProgress}%` }}></div>
      </div>
      <div className="loader-text">{loadingProgress}%</div>
    </div>
  );
};

export default Apple;
