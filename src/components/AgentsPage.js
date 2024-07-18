import React, { useState, useEffect } from 'react';
import { useAgents } from '../AgentContext';

function AgentsPage() {
  const { agents, setAgents } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [models, setModels] = useState([]);
  const [tools, setTools] = useState([]);
  const [newAgent, setNewAgent] = useState({ name: '', modelName: '', tools: [], prompt: '' });

  useEffect(() => {
    // Fetch models and tools from your backend if needed
    setModels(['GPT-3', 'GPT-4']);
    setTools(['Tool1', 'Tool2', 'Tool3']);
  }, []);

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent);
  };

  const handleAgentChange = (field, value) => {
    setSelectedAgent({ ...selectedAgent, [field]: value });
  };

  const handleNewAgentChange = (field, value) => {
    setNewAgent({ ...newAgent, [field]: value });
  };

  const saveAgent = () => {
    if (selectedAgent) {
      setAgents(agents.map(agent => 
        agent.id === selectedAgent.id ? selectedAgent : agent
      ));
      // In a real app, you would save this to your backend
      alert('Agent updated successfully!');
    }
  };

  const createAgent = () => {
    if (newAgent.name && newAgent.modelName) {
      const newId = Math.max(...agents.map(a => a.id), 0) + 1;
      const createdAgent = { ...newAgent, id: newId };
      setAgents([...agents, createdAgent]);
      setNewAgent({ name: '', modelName: '', tools: [], prompt: '' });
      // In a real app, you would save this to your backend
      alert('New agent created successfully!');
    } else {
      alert('Please fill in at least the name and model for the new agent.');
    }
  };

  const deleteAgent = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
    if (selectedAgent && selectedAgent.id === id) {
      setSelectedAgent(null);
    }
    // In a real app, you would delete this from your backend
    alert('Agent deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Agents</h2>
      
      {/* Existing Agents */}
      <div className="glass-panel p4 rounded">
        <h3 className="text-xl font-semibold mb-2">Existing Agents</h3>
        <ul className="space-y-2">
          {agents.map(agent => (
            <li key={agent.id} className="flex items-center justify-between">
              <span>{agent.name} ({agent.modelName})</span>
              <div>
                <button onClick={() => handleAgentSelect(agent)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button onClick={() => deleteAgent(agent.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Edit Agent */}
      {selectedAgent && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Edit Agent: {selectedAgent.name}</h3>
          <input
            type="text"
            value={selectedAgent.name}
            onChange={(e) => handleAgentChange('name', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Agent Name"
          />
          <select
            value={selectedAgent.modelName}
            onChange={(e) => handleAgentChange('modelName', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          <div className="mb-2">
            <p className="mb-1">Tools:</p>
            {tools.map(tool => (
              <label key={tool} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAgent.tools.includes(tool)}
                  onChange={(e) => {
                    const updatedTools = e.target.checked
                      ? [...selectedAgent.tools, tool]
                      : selectedAgent.tools.filter(t => t !== tool);
                    handleAgentChange('tools', updatedTools);
                  }}
                  className="mr-2"
                />
                {tool}
              </label>
            ))}
          </div>
          <textarea
            value={selectedAgent.prompt}
            onChange={(e) => handleAgentChange('prompt', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            rows="4"
            placeholder="Agent Prompt"
          />
          <button onClick={saveAgent} className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
        </div>
      )}
      
      {/* Create New Agent */}
      <div className="glass-panel p-4 rounded">
        <h3 className="text-xl font-semibold mb-2">Create New Agent</h3>
        <input
          type="text"
          value={newAgent.name}
          onChange={(e) => handleNewAgentChange('name', e.target.value)}
          className="glass-panel p-4 rounded"
          placeholder="Agent Name"
        />
        <select
          value={newAgent.modelName}
          onChange={(e) => handleNewAgentChange('modelName', e.target.value)}
          className="glass-panel p4 border rounded"
        >
          <option value="">Select a model</option>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
        <div className="mb-2">
          <p className="mb-1">Tools:</p>
          {tools.map(tool => (
            <label key={tool} className="flex items-center">
              <input
                type="checkbox"
                checked={newAgent.tools.includes(tool)}
                onChange={(e) => {
                  const updatedTools = e.target.checked
                    ? [...newAgent.tools, tool]
                    : newAgent.tools.filter(t => t !== tool);
                  handleNewAgentChange('tools', updatedTools);
                }}
                className="mr-2"
              />
              {tool}
            </label>
          ))}
        </div>
        <textarea
          value={newAgent.prompt}
          onChange={(e) => handleNewAgentChange('prompt', e.target.value)}
          className="w-full p-2 border rounded bg-transparent text-green-400"
          rows="4"
          placeholder="Agent Prompt"
        />
        <button onClick={createAgent} className="bg-blue-500 text-white px-4 py-2 rounded">Create Agent</button>
      </div>
    </div>
  );
}

export default AgentsPage;