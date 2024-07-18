import React, { createContext, useState, useContext } from 'react';

const AgentContext = createContext();

export function AgentProvider({ children }) {
  const [agents, setAgents] = useState([]);

  return (
    <AgentContext.Provider value={{ agents, setAgents }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  return useContext(AgentContext);
}