import React from 'react';
import Dropzone from "./dropzone/Dropzone";
import './App.css';
import './global.css';
import api from './services/api';

function App() {
  async function handleSelect(files) {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('file', file);
    });

    await api.get('/main', formData);
  }

  return (
    <div className="App">
      <h1>
        Hello, let's fix your files!
      </h1>
      <Dropzone onFilesAdded={handleSelect} />
    </div>
  );
}

export default App;
