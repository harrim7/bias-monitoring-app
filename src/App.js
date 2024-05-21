import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bias Monitoring Service</h1>
        <p>Upload your insurance policy, coverage, or plan to analyze for biases.</p>
      </header>
      <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
