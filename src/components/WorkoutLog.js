import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import AddLog from './AddLog';
const uuid = require('uuid');

function WorkoutLog() {
  const [logs, setLogs] = useState([]);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/logs');
      const data = await response.json();
      setLogs(data)
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])
  return (
    <div className="logs">
      {logs.length > 0 && logs.map((log) => {
        console.log(log)
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
      <AddLog onAdd={refresh} />
    </div>
  );
}
export default WorkoutLog;