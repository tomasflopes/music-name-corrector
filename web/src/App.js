import React, { useState } from 'react';
import './App.css';
import './global.css';
import api from './services/api';

function App() {
  const [dir, setDir] = useState('');
  const [data, setData] = useState([]);

  async function handleSubmit() {
    const response = await api.post('/main', {
      dir
    });

    setData(response.data);
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
      {
        data.map((info, index) => (
          <h2 key={index}>{info}</h2>
        ))
      }
    </div>
  );
}

export default App;
