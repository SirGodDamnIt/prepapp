import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('recipes');
  const [screen, setScreen] = useState('list');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [form, setForm] = useState({
    name: '',
    yield: '',
    ingredients: [{ amount: '', unit: '', name: '' }],
    instructions: ''
  });

  const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const updateIngredient = (index, field, value) => {
    const updated = [...form.ingredients];
    updated[index][field] = value;
    setForm(f => ({ ...f, ingredients: updated }));
  };

  const addIngredient = () =>
    setForm(f => ({ ...f, ingredients: [...f.ingredients, { amount: '', unit: '', name: '' }] }));

  const removeIngredient = (index) =>
    setForm(f => ({ ...f, ingredients: f.ingredients.filter((_, i) => i !== index) }));

  const saveRecipe = () => {
    if (!form.name.trim()) return;
    setRecipes(r => [...r, { ...form, id: Date.now() }]);
    setForm({ name: '', yield: '', ingredients: [{ amount: '', unit: '', name: '' }], instructions: '' });
    setScreen('list');
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setScreen('detail');
  };

  if (screen === 'add') return (
    <div className="app">
      <header className="header">
        <div className="header-row">
          <button className="back-btn" onClick={() => setScreen('list')}>← Back</button>
          <h1>New Recipe</h1>
          <button className="save-btn" onClick={saveRecipe}>Save</button>
        </div>
      </header>
      <main className="content">
        <div className="form">
          <div className="form-group">
            <label>Recipe Name</label>
            <input className="input" placeholder="e.g. Garlic Aioli" value={form.name} onChange={e => updateField('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Yield / Batch Size</label>
            <input className="input" placeholder="e.g. 2 quarts, 48 portions" value={form.yield} onChange={e => updateField('yield', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Ingredients</label>
            {form.ingredients.map((ing, i) => (
              <div className="ingredient-row" key={i}>
                <input className="input ing-amount" placeholder="Qty" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)} />
                <input className="input ing-unit" placeholder="Unit" value={ing.unit} onChange={e => updateIngredient(i, 'unit', e.target.value)} />
                <input className="input ing-name" placeholder="Ingredient" value={ing.name} onChange={e => updateIngredient(i, 'name', e.target.value)} />
                <button className="remove-btn" onClick={() => removeIngredient(i)}>×</button>
              </div>
            ))}
            <button className="add-ing-btn" onClick={addIngredient}>+ Add Ingredient</button>
          </div>
          <div className="form-group">
            <label>Instructions</label>
            <textarea className="input textarea" placeholder="Step by step instructions..." value={form.instructions} onChange={e => updateField('instructions', e.target.value)} />
          </div>
        </div>
      </main>
    </div>
  );

  if (screen === 'detail' && selectedRecipe) return (
    <div className="app">
      <header className="header">
        <div className="header-row">
          <button className="back-btn" onClick={() => setScreen('list')}>← Back</button>
          <h1>{selectedRecipe.name}</h1>
          <div style={{ width: 48 }} />
        </div>
      </header>
      <main className="content">
        <div className="detail">
          {selectedRecipe.yield ? <div className="detail-yield">Yield: {selectedRecipe.yield}</div> : null}
          <div className="section">
            <div className="section-label">Ingredients</div>
            {selectedRecipe.ingredients.filter(i => i.name).map((ing, i) => (
              <div className="detail-ingredient" key={i}>
                <span className="ing-qty">{ing.amount} {ing.unit}</span>
                <span>{ing.name}</span>
              </div>
            ))}
          </div>
          {selectedRecipe.instructions ? (
            <div className="section">
              <div className="section-label">Instructions</div>
              <div className="detail-text">{selectedRecipe.instructions}</div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Ai<span>Prep</span></h1>
      </header>
      <nav className="nav">
        {['recipes', 'prep', 'pull'].map(tab => (
          <button key={tab} className={`nav-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'prep' ? 'Prep List' : tab === 'pull' ? 'Pull List' : 'Recipes'}
          </button>
        ))}
      </nav>
      <main className="content">
        {activeTab === 'recipes' && (
          <>
            {recipes.length === 0 ? (
              <div className="placeholder">
                <h2>No recipes yet</h2>
                <p>Add your first recipe by photo or manual entry</p>
                <button className="btn" onClick={() => setScreen('add')}>+ Add Recipe</button>
              </div>
            ) : (
              <>
                <div className="recipe-list">
                  {recipes.map(r => (
                    <div className="recipe-card" key={r.id} onClick={() => openRecipe(r)}>
                      <div className="recipe-card-name">{r.name}</div>
                      {r.yield ? <div className="recipe-card-yield">Yield: {r.yield}</div> : null}
                    </div>
                  ))}
                </div>
                <button className="btn" style={{ marginTop: 16, width: '100%' }} onClick={() => setScreen('add')}>+ Add Recipe</button>
              </>
            )}
          </>
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
