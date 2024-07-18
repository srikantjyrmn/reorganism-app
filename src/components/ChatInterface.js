import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import { UserIcon, BotIcon, ToolIcon } from './MessageIcons';
import { useAgents } from '../AgentContext';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [toolCallPending, setToolCallPending] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch agents (simulated)
    setAgents([
      { id: 1, name: 'Dream Analyst' },
      { id: 2, name: 'Personal Helper' },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '' || file) {
      const newMessage = { type: 'user', content: input, file };
      setMessages([...messages, newMessage]);
      
      // Check for @AgentName mention
      const mentionMatch = input.match(/@(\w+)/);
      if (mentionMatch) {
        const mentionedAgent = agents.find(agent => agent.name.toLowerCase() === mentionMatch[1].toLowerCase());
        if (mentionedAgent) {
          setSelectedAgent(mentionedAgent.name);
        }
      }
      
      setInput('');
      setFile(null);
      
      // Check if the message contains "tool"
      if (input.toLowerCase().includes('tool')) {
        simulateToolCall(selectedAgent);
      } else {
        simulateBotResponse(selectedAgent);
      }
    }
  };

  const simulateBotResponse = (agentName) => {
    setTimeout(() => {
      const botMessage = { 
        type: 'bot', 
        content: `This is a simulated response from ${agentName || 'the default agent'}. It could be a normal message or a tool call.` 
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const simulateToolCall = (agentName) => {
    setTimeout(() => {
      const botMessage = { 
        type: 'bot', 
        content: `${agentName || 'The default agent'} is requesting to use a tool.` 
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setToolCallPending(true);
    }, 1000);
  };

  const handleToolCall = (accepted) => {
    setToolCallPending(false);
    const toolResponse = accepted 
      ? "Tool call accepted. Here's the simulated result: The tool has successfully processed your request."
      : "Tool call rejected.";
    setMessages(prevMessages => [...prevMessages, { type: 'tool', content: toolResponse }]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAgentChange = (e) => {
    setSelectedAgent(e.target.value);
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'user':
        return <UserIcon />;
      case 'bot':
        return <BotIcon />;
      case 'tool':
        return <ToolIcon />;
      default:
        return null;
    }
  };

  return (
      <div className="flex flex-col h-full glass-panel p-4">
      <div className="p-4 glass-panel mb-4">
        <select
          value={selectedAgent}
          onChange={handleAgentChange}
          className="w-full p-2 border rounded bg-transparent text-green-400"
        >
          <option value="">Select an agent</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.name}>{agent.name}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 glass-panel mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg ${
            message.type === 'user' 
              ? 'bg-blue-500 bg-opacity-30 ml-auto' 
              : message.type === 'tool' 
                ? 'bg-green-500 bg-opacity-30' 
                : 'bg-gray-500 bg-opacity-30'
          }`}>
            <div className="flex items-start">
              {getMessageIcon(message.type)}
              <div>
                <ReactMarkdown>{message.content}</ReactMarkdown>
                {message.file && <p>File: {message.file.name}</p>}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {toolCallPending && (
        <div className="p-4 bg-yellow-500 bg-opacity-30 rounded-lg mb-4">
          <p>The agent has requested a tool call. Do you accept?</p>
          <button onClick={() => handleToolCall(true)} className="bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded mr-2 hover:bg-opacity-75">Yes</button>
          <button onClick={() => handleToolCall(false)} className="bg-red-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-opacity-75">No</button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="glass-panel p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded bg-transparent text-green-400"
          placeholder="Type your message... Use @AgentName to switch agents or include 'tool' to trigger a tool call"
        />
        <input type="file" onChange={handleFileChange} className="mt-2 text-green-400" />
        <button type="submit" className="mt-2 bg-blue-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-opacity-75">Send</button>
      </form>
    </div>
  );
}

export default ChatInterface;