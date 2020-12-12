import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, useCallback } from 'react';
import AddLog from './AddLog';
const uuid = require('uuid');

function WorkoutLog(props) {
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date());

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/logs?' + new URLSearchParams({
        date: date.toLocaleDateString()
      }))
      const data = await response.json();
      setLogs(data)
    } catch (e) {
      console.log(e)
    }
  }, [date])

  const createDateHeader = () => {
    const month = date.toLocaleString("default", { month: "long" })
    const dayOfMonth = date.getDate()
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" })

    return `${dayOfWeek}, ${month} ${dayOfMonth}`
  }

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div className="workout-log">
      <section className="calendar">
        <Calendar onChange={setDate} value={date} />
      </section>
      <section className="logs">
        <header>
          <h2>{ createDateHeader() }</h2>
        </header>
        {logs.length > 0 && logs.map((log) => {
          return (
            <ul>
              {log.exercises.map((exercise) => {
                return (
                  <li key={uuid.v4()} className="log">
                    <ul class="exercise">
                      <li className="name"><h3>{exercise.name}</h3></li>
                      <li className="reps">{`${exercise.reps} reps`}</li>
                      <li className="sets">{`${exercise.sets} sets`}</li>
                      <li className="weight"><div>{`${exercise.weight} lbs`}</div></li>
                    </ul>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </section>
      <section className="addLog">
        <button onClick={(e) => { props.logOut(e) }}>Log Out</button>
        <AddLog onAdd={refresh} date={date} />
      </section>
    </div>
  );
}
export default WorkoutLog;