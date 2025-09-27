import React from 'react';
import '../styles/AnimatedButton.css'; // Import the CSS for styles

export default function AnimatedButton({ children, onClick, type = "button" }) {
  return (
    <button className="animated-btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
