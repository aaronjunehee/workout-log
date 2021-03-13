import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button'
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
    <div className="dashboard">
      <nav className="navigation">
        <div className="logo">
          <h1>FitTack</h1>
        </div>
        <Button onClick={(e) => { props.logOut(e) }} className="logout-button" variant="contained">Log Out</Button>
      </nav>
      <section className="controller">
        <div className="box">
          <h2>Select the date you want to track</h2>
          <Calendar onChange={(date) => {handleChange(date)}} value={date} />
        </div>
        <div className="box">
          <h2>Add exercise</h2>
          <AddLog onAdd={refresh} date={date} />
        </div>
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
    </div>
  );
}
export default WorkoutLog;