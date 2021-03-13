import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button'
import { useEffect, useState, useCallback } from 'react';
import AddLog from './AddLog';
const uuid = require('uuid');

function WorkoutLog(props) {
  const [logs, setLogs] = useState([])
  const [date, setDate] = useState(new Date())

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

  const handleChange = (date) => {
    setDate(date)
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
      <section className="user-logs">
        {logs.length <= 0 ? <div className="no-logs"><p>zzzzzzzz</p><i className="fas fa-bed"></i></div> : logs.map((log) => {
          return (
            <ul className="user-logs-wrapper">
              {log.exercises.map((exercise) => {
                return (
                  <li key={uuid.v4()} className="user-log">
                    <ul className="user-log-container">
                      <li className="name"><h3>{exercise.name}</h3></li>
                      <li className="reps-and-sets">{`${exercise.reps} reps x ${exercise.sets} sets`}</li>
                      <li className="weight"><div>{`${exercise.weight} ${exercise.unit}`}</div></li>
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