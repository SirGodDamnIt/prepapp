import React from 'react';

export function RecipeForm({
  form,
  onUpdateField,
  onUpdateIngredient,
  onAddIngredient,
  onRemoveIngredient,
  onSave,
  onCancel
}) {
  const isValid = form.name.trim().length > 0;

  return (
    <div className="app">
      <header className="header">
        <div className="header-row">
          <button className="back-btn" onClick={onCancel} aria-label="Go back">
            ← Back
          </button>
          <h1>{form.id ? 'Edit Recipe' : 'New Recipe'}</h1>
          <button
            className="save-btn"
            onClick={onSave}
            disabled={!isValid}
            aria-label="Save recipe"
          >
            Save
          </button>
        </div>
      </header>
      <main className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="recipe-name">Recipe Name *</label>
            <input
              id="recipe-name"
              className="input"
              placeholder="e.g. Garlic Aioli"
              value={form.name}
              onChange={(e) => onUpdateField('name', e.target.value)}
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipe-yield">Yield / Batch Size</label>
            <input
              id="recipe-yield"
              className="input"
              placeholder="e.g. 2 quarts, 48 portions"
              value={form.yield}
              onChange={(e) => onUpdateField('yield', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ingredients</label>
            {form.ingredients.map((ing, i) => (
              <div className="ingredient-row" key={i}>
                <input
                  className="input ing-amount"
                  placeholder="Qty"
                  value={ing.amount}
                  onChange={(e) => onUpdateIngredient(i, 'amount', e.target.value)}
                  aria-label={`Ingredient ${i + 1} quantity`}
                />
                <input
                  className="input ing-unit"
                  placeholder="Unit"
                  value={ing.unit}
                  onChange={(e) => onUpdateIngredient(i, 'unit', e.target.value)}
                  aria-label={`Ingredient ${i + 1} unit`}
                />
                <input
                  className="input ing-name"
                  placeholder="Ingredient"
                  value={ing.name}
                  onChange={(e) => onUpdateIngredient(i, 'name', e.target.value)}
                  aria-label={`Ingredient ${i + 1} name`}
                />
                <button
                  className="remove-btn"
                  onClick={() => onRemoveIngredient(i)}
                  aria-label={`Remove ingredient ${i + 1}`}
                >
                  ×
                </button>
              </div>
            ))}
            <button className="add-ing-btn" onClick={onAddIngredient}>
              + Add Ingredient
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="recipe-instructions">Instructions</label>
            <textarea
              id="recipe-instructions"
              className="input textarea"
              placeholder="Step by step instructions..."
              value={form.instructions}
              onChange={(e) => onUpdateField('instructions', e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
