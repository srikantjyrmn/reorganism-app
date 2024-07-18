import React, { useState, useEffect } from 'react';

function ToolsPage() {
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState('');

  useEffect(() => {
    // In a real app, you would fetch the tools from your backend or file system
    setTools(['Sample Tool 1', 'Sample Tool 2']);
  }, []);

  const addTool = () => {
    if (newTool.trim() !== '') {
      setTools([...tools, newTool]);
      setNewTool('');
      // In a real app, you would save the new tool to your backend or file system
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-400">Tools</h2>
      <div className="glass-panel p-4 rounded">
        <h3 className="text-xl font-semibold mb-2 text-green-400">Available Tools</h3>
        <ul className="list-disc pl-5 text-green-400">
          {tools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </div>
      <div className="glass-panel p-4 rounded">
        <h3 className="text-xl font-semibold mb-2 text-green-400">Add New Tool</h3>
        <textarea
          value={newTool}
          onChange={(e) => setNewTool(e.target.value)}
          className="w-full p-2 border rounded bg-transparent text-green-400"
          rows="4"
          placeholder="Enter tool code here..."
        />
        <button 
          onClick={addTool} 
          className="mt-2 bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-opacity-75"
        >
          Add Tool
        </button>
      </div>
    </div>
  );
}

export default ToolsPage;