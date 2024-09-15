import React, { useState, useEffect } from 'react';

export const Tooltips = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setIsVisible(true);

    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div
      className={`tooltip-container ${isVisible ? 'visible' : ''}`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className="tooltip">
      {/* <span style={{cursor: 'pointer'}} onClick={handleClose} class="material-symbols-outlined">
        close
      </span> */}
      {text}
      </div>
    </div>
  );
};
