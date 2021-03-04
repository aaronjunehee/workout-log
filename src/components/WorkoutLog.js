import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState, useCallback } from 'react';
import AddLog from './AddLog';
const uuid = require('uuid');

function WorkoutLog(props) {
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isLogging, setIsLogging] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/logs?' + new URLSearchParams({
        date: date.toLocaleDateString()
      }))
      const data = await response.json();
      setLogs(data)
      setIsLogging(false)
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

  const getNumOfExercises = () => {
    if (logs.length === 0) {
      return ''
    }
    return `(${logs[0].exercises.length})`
  }

  const handleChange = (date) => {
    setDate(date)
    setIsLogging(false)
  }

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div className="workout-log">
      <header>
        <nav></nav>
      </header>
      <section className="calendar">
        <Calendar onChange={(date) => {handleChange(date)}} value={date} />
      </section>
      <section className={isLogging ? "logs height-auto" : "logs"}>
        <header>
          <h2>{ `${createDateHeader()} ${getNumOfExercises()}` }</h2>
        </header>
        {logs.length <= 0 ? <div className="asleep"><p>zzzzzzzz</p><i className="fas fa-bed"></i></div> : logs.map((log) => {
          return (
            <ul>
              {log.exercises.map((exercise) => {
                return (
                  <li key={uuid.v4()} className="log">
                    <ul className="exercise">
                      <li className="name"><h3>{exercise.name}</h3></li>
                      <li className="reps">{`${exercise.reps} reps`}</li>
                      <li className="sets">{`${exercise.sets} sets`}</li>
                      <li className="weight"><div>{`${exercise.weight}`}</div></li>
                    </ul>
                  </li>
                )
              })}
            </ul>
          )
        })}
      </section>
      <section className="addLog">
        {isLogging ? <AddLog onAdd={refresh} date={date} /> : <button onClick={() => { setIsLogging(!isLogging) }} className="log-workout-button">Log Workout</button>}
      </section>
      <button onClick={(e) => { props.logOut(e) }} className="logout-button"><i className="fas fa-sign-out-alt"></i></button>
    </div>
  );
}
export default WorkoutLog;