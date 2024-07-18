import React, { useState } from 'react';

function ConfigPage() {
  const [models, setModels] = useState([
    { id: 1, name: 'GPT-3', address: '', key: '' },
    { id: 2, name: 'GPT-4', address: '', key: '' },
  ]);

  const handleInputChange = (id, field, value) => {
    setModels(models.map(model => 
      model.id === id ? { ...model, [field]: value } : model
    ));
  };

  const addModel = () => {
    const newId = Math.max(...models.map(m => m.id)) + 1;
    setModels([...models, { id: newId, name: '', address: '', key: '' }]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-400">Model Configurations</h2>
      {models.map(model => (
        <div key={model.id} className="glass-panel p-4 rounded">
          <input
            type="text"
            value={model.name}
            onChange={(e) => handleInputChange(model.id, 'name', e.target.value)}
            placeholder="Model Name"
            className="w-full p-2 mb-2 border rounded bg-transparent text-green-400"
          />
          <input
            type="text"
            value={model.address}
            onChange={(e) => handleInputChange(model.id, 'address', e.target.value)}
            placeholder="Model Address"
            className="w-full p-2 mb-2 border rounded bg-transparent text-green-400"
          />
          <input
            type="text"
            value={model.key}
            onChange={(e) => handleInputChange(model.id, 'key', e.target.value)}
            placeholder="Model Key"
            className="w-full p-2 border rounded bg-transparent text-green-400"
          />
        </div>
      ))}
      <button onClick={addModel} className="bg-green-500 bg-opacity-50 text-white px-4 py-2 rounded hover:bg-opacity-75">
        Add Model
      </button>
    </div>
  );
}

export default ConfigPage;