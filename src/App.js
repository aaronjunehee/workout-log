import React from 'react';
import { useEffect, useState } from 'react';
import Logs from './components/Logs';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogs(data)
    }
    fetchLogs();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Workout Log</h1>
      </header>
      <main>
        <Logs logs={logs} />
      </main>
    </div>
  );
}

export default App;
