import React, { useState } from 'react';



//https://aistudio.google.com/app/apikey?_gl=1*ho8zh9*_ga*NzYyMDExMzQ2LjE3NDUxMjczNzU.*_ga_P1DBVKWT6V*czE3NDY2NzQ1NTUkbzUkZzEkdDE3NDY2NzQ3MTMkajU4JGwwJGgyMTAxOTkwMjMw
let API_KEY = 'AIzaSyBK1gSH_zOmjsHmb3Jvbw7XimKts0F8A-A';
let API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let FilterPage = () => {
  let [includes, setIncludes] = useState([]);
  let [input, setInput] = useState('');
  let [cuisine, setCuisine] = useState('');
  let [mealType, setMealType] = useState('Dinner');
  let [recipes, setRecipes] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let addChip = () => {
    let text = input.trim();
    if (text) {
      setIncludes([...includes, text]);
      setInput('');
    }
  };

  let removeChip = index => {
    setIncludes(includes.filter((_, i) => i !== index));
  };





  // REFRENCE: https://ai.google.dev/gemini-api/docs/text-generation
  let fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    setRecipes(null);
    let promptText = `You are a helpful cooking assistant. Return ONLY a valid raw JSON array, no extra text.\nReturn 3 recipes in this format:\n[\n  {\n    \"title\": \"Recipe Name\",\n    \"ingredients\": [\"item1\", \"item2\"],\n    \"cookingTime\": \"30 minutes\",\n    \"cuisineType\": \"${cuisine}\",\n    \"mealType\": \"${mealType}\",\n    \"instructions\": [\"Step 1\", \"Step 2\"]\n  }\n]\nUse ONLY these ingredients: ${includes.join(',')}`;

    try {
      let res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.7, candidateCount: 1 }
        })
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      let payload = await res.json();
      let raw = (payload.candidates && payload.candidates[0] && payload.candidates[0].content && payload.candidates[0].content.parts && payload.candidates[0].content.parts[0].text || '').trim();
      let start = raw.indexOf('[');
      let end = raw.lastIndexOf(']') + 1;
      let data = JSON.parse(raw.slice(start, end));
      setRecipes(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="filter-page">
      <section className="filter">
            <h2 style={{color:'black'}}>Filters</h2>
            <h3 style={{color:'black'}}>Ingredients</h3>
        <div className="input-group">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add ingredient..." />
          <button onClick={addChip}>Add</button>
        </div>
        <div className="chips">
          {includes.map((item, index) => (
            <div className="chip" key={index}>
              {item} <button onClick={() => removeChip(index)}>×</button>
            </div>
          ))}
        </div>

        <h3 style={{color:'black'}}>Meal Type</h3>
        <div className="buttons-group">
          {['breakfast', 'lunch', 'dinner', 'snack', 'dessert'].map(type => (
            <button
              key={type}
              className={mealType === type ? 'active' : ''}
              onClick={() => setMealType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <h3 style={{color:'black'}}>Cuisine</h3>
        <input value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="e.g. Italian" />

        <div className="actions">
          <button onClick={fetchRecipes}>Show Recipes</button>
        </div>
      </section>

      <section className="recipe-output">
        {loading && <p>Loading recipes…</p>}
        {error && <p>Error: {error}</p>}
        {recipes && recipes.map((r, i) => (
          <div key={i} className="recipe-card">
            <h4>{r.title}</h4>
            <div><strong>Cook Time:</strong> {r.cookingTime}</div>
            <div><strong>Cuisine:</strong> {r.cuisineType}</div>
            <div><strong>Meal:</strong> {r.mealType}</div>
            <h5>Ingredients</h5>
            <ul>{r.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
            <h5>Instructions</h5>
            <ol>{Array.isArray(r.instructions) ? r.instructions.map((s, idx) => <li key={idx}>{s}</li>) : <li>{r.instructions}</li>}</ol>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FilterPage;


