import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar, matrixSpeed, onSpeedChange }) {
  return (
    <>
      <div 
        className={`glass-panel text-green-400 w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition duration-200 ease-in-out z-30`}
      >
        <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:bg-opacity-25">Home</Link>
          <Link to="/chat" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:bg-opacity-25">Chat Interface</Link>
          <Link to="/history" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:bg-opacity-25">Conversation History</Link>
          <Link to="/config" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:bg-opacity-25">Config</Link>
          <Link to="/tools" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:bg-opacity-25">Tools</Link>
          <Link to="/agents" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500 hover:bg-opacity-25">Agents</Link>
        </nav>
        <div className="px-4">
          <label htmlFor="speed-control" className="block text-sm font-medium text-green-400">
            Matrix Speed: {matrixSpeed.toFixed(1)}
          </label>
          <input
            type="range"
            id="speed-control"
            min="0.1"
            max="3"
            step="0.1"
            value={matrixSpeed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <button 
        onClick={toggleSidebar}
        className={`glass-panel fixed top-4 z-40 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${
          isOpen ? 'left-64' : 'left-4'
        }`}
      >
        <svg 
          className="w-6 h-6 text-green-400" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M15 19l-7-7 7-7" />
          ) : (
            <path d="M9 5l7 7-7 7" />
          )}
        </svg>
      </button>
    </>
  );
}

export default Sidebar;