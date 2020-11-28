import React from 'react';
const uuid = require('uuid');

const logInputs = [
  { label: 'Exercise', type: 'text', ref: 'exercise' },
  { label: 'Reps', type: 'text', ref: 'reps' },
  { label: 'Sets', type: 'text', ref: 'sets' }
]

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
      <form>
        {logInputs.map((input) => {
          return (
            <label htmlFor={input.ref} key={uuid.v4()}>
              {input.label}
              <input id={input.ref} type={input.type} name={input.ref} />
            </label>
          )
        })}
      </form>
    </div>
  );
}
export default Logs;