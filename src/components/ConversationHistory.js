import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ConversationHistory() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    const mockConversations = [
      { id: 1, title: "Conversation 1", messages: [
        { sender: "user", text: "Hello" },
        { sender: "bot", text: "Hi there! How can I help you?" },
      ]},
      { id: 2, title: "Conversation 2", messages: [
        { sender: "user", text: "What's the weather like?" },
        { sender: "bot", text: "I'm sorry, I don't have real-time weather data. You might want to check a weather website or app for that information." },
      ]},
    ];
    setConversations(mockConversations);
  }, []);

  const continueConversation = (conversation) => {
    navigate('/', { state: { conversation } });
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Conversations</h2>
        {conversations.map((conv) => (
          <div key={conv.id} className="mb-4">
            <div 
              className="cursor-pointer p-2 hover:bg-gray-700 rounded"
              onClick={() => setSelectedConversation(conv)}
            >
              {conv.title}
            </div>

          </div>
        ))}
      </div>
      <div className="w-2/3 bg-black p-4 overflow-y-auto">
        {selectedConversation ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-400">{selectedConversation.title}</h2>
            {selectedConversation.messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  {msg.text}
                </span>
                
              </div>
            ))}
          </>
        ) : (
          
          <p className="text-green-400">Select a conversation to view messages</p>
          
        )}
        <div>
        <button 
          onClick={() => continueConversation(selectedConversation)}
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
        >
          Continue Conversation
        </button>
        </div>
      </div>
    </div>
  );
}

export default ConversationHistory;