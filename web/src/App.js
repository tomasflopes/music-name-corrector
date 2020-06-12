import React, { useState } from 'react';
import './App.css';
import './global.css';
import api from './services/api';

function App() {
  const [dir, setDir] = useState('');

  async function handleSubmit() {
    const response = await api.post('/main', {
      dir
    });

    console.log(response);
  }

  return (
    <div className="App">
      <h1>
        Hello, let's fix your files!
      </h1>
      <input
        type="text"
        name="dir"
        value={dir.toString()}
        onChange={(value) => setDir(value.target.value)}
        placeholder="Directory"
        className="dirInput"
      />
      <input className="submitBtn" type="submit" onClick={handleSubmit} value="Submit" />
    </div>
  );
}

export default App;
