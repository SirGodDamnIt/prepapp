import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('recipes');

  return (
    <div className="app">
      <header className="header">
        <h1>Ai<span>Prep</span></h1>
      </header>

      <nav className="nav">
        {['recipes', 'prep', 'pull'].map(tab => (
          <button
            key={tab}
            className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'prep' ? 'Prep List' : tab === 'pull' ? 'Pull List' : 'Recipes'}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === 'recipes' && (
          <div className="placeholder">
            <h2>No recipes yet</h2>
            <p>Add your first recipe by photo or manual entry</p>
            <button className="btn">+ Add Recipe</button>
          </div>
        )}
        {activeTab === 'prep' && (
          <div className="placeholder">
            <h2>Prep List</h2>
            <p>Your active prep tasks will show here</p>
          </div>
        )}
        {activeTab === 'pull' && (
          <div className="placeholder">
            <h2>Pull List</h2>
            <p>Ingredients grouped by storage location</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
