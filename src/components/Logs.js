import React from 'react';
import AddLog from './AddLog';
const uuid = require('uuid');

function Logs({ logs }) {
  return (
    <div className="logs">
      {logs.length > 0 && logs.map((log) => {
        return (
          <div key={uuid.v4()}>
            <h2>{log.date}</h2>
            {log.exercises.map((exercise) => {
              return (
                <ul key={uuid.v4()}>
                  <li>{exercise.name}</li>
                  <li>Sets: {exercise.reps}</li>
                  <li>Reps: {exercise.sets}</li>
                </ul>
              )
            })}
          </div>
        )
      })}
      <AddLog />
    </div>
  );
}
export default Logs;