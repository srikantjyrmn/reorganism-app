import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import FrontPage from './components/FrontPage';
import ChatInterface from './components/ChatInterface';
import ConfigPage from './components/ConfigPage';
import ToolsPage from './components/ToolsPage';
import AgentsPage from './components/AgentsPage';
import ConversationHistory from './components/ConversationHistory';
import { AgentProvider } from './AgentContext';
import { firebaseConfig } from './firebase-config';
import { initializeFirebase } from './firebaseFunctions';
import { initializeApp } from 'firebase/app';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [matrixSpeed, setMatrixSpeed] = useState(1);

  
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    console.log('Firebase initialized:', app);
    initializeFirebase(firebaseConfig);
    
    const createMatrixBackground = () => {
      const matrixBg = document.getElementById('matrix-bg');
      if (!matrixBg) return;

      matrixBg.innerHTML = ''; // Clear existing content

      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|;:,.<>?';
      const columnsCount = Math.floor(window.innerWidth / 20);

      for (let i = 0; i < columnsCount; i++) {
        const column = document.createElement('div');
        column.style.left = `${i * 20}px`;
        matrixBg.appendChild(column);

        let y = 0;
        const fallInterval = setInterval(() => {
          const char = document.createElement('div');
          char.className = 'matrix-character';
          char.style.left = `${i * 20}px`;
          char.style.top = `${y}px`;
          char.style.animationDuration = `${(Math.random() * 2 + 1) * matrixSpeed}s`;
          char.textContent = characters[Math.floor(Math.random() * characters.length)];
          matrixBg.appendChild(char);

          y += 20;
          if (y > window.innerHeight) {
            clearInterval(fallInterval);
          }
        }, Math.random() * 100 * matrixSpeed + 50 * matrixSpeed);
      }
    };

    createMatrixBackground();

    // Recreate matrix background when window is resized
    window.addEventListener('resize', createMatrixBackground);

    return () => {
      window.removeEventListener('resize', createMatrixBackground);
    };
  }, [matrixSpeed]);

  const handleSpeedChange = (newSpeed) => {
    setMatrixSpeed(newSpeed);
  };

  return (
    <AgentProvider>
      <Router>
        <div className="flex h-screen relative z-10">
          <div id="matrix-bg" className="fixed inset-0 z-0 pointer-events-none"></div>
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            matrixSpeed={matrixSpeed}
            onSpeedChange={handleSpeedChange}
          />
          <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<FrontPage />} />
                  <Route path="/chat" element={<ChatInterface />} />
                  <Route path="/config" element={<ConfigPage />} />
                  <Route path="/tools" element={<ToolsPage />} />
                  <Route path="/agents" element={<AgentsPage />} />
                  <Route path="/history" element={<ConversationHistory />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </AgentProvider>
  );
}

export default App;