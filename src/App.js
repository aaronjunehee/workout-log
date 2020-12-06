import React from 'react';
import WorkoutLog from './components/WorkoutLog';
import './styles/App.scss';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Workout Log</h1>
      </header>
      <main>
        <WorkoutLog />
      </main>
    </div>
  );
}

export default App;
