import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button'
import { useEffect, useState, useCallback } from 'react';
import AddLog from './AddLog';

function WorkoutLog(props) {
  const [log, setLog] = useState({})
  const [date, setDate] = useState(new Date())

  const getLog = useCallback(async () => {
    try {
      const response = await fetch('/api/logs?' + new URLSearchParams({
        date: date.toLocaleDateString()
      }))
      const data = await response.json()
      setLog(data || {})
    } catch (e) {
      console.log(e)
    }
  }, [date])

  const handleChange = (date) => {
    setDate(date)
  }

  useEffect(() => {
    getLog()
  }, [getLog])

  const deleteExercise = async (e, deleteID, i) => {
    e.preventDefault()
    try {
      const params = { deleteID, date: date.toLocaleDateString() }
      const response = await fetch('/api/logs?' + new URLSearchParams(params), {
        method: 'DELETE',
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      const logState = {...log}
      logState.exercises.splice(i, 1)
      setLog(logState)
    } catch (error) {

    }
  }

  const checkLog = () => {
    const isEmpty = Object.keys(log).length === 0 || log.exercises.length === 0
    return isEmpty
  }

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
          <AddLog onAdd={getLog} date={date} />
        </div>
      </section>
      <section className="user-logs">
        { checkLog() ? <div className="no-logs"><p>zzzzzzzz</p><i className="fas fa-bed"></i></div> :
          <ul className="user-logs-wrapper">
            { log.exercises.map((exercise, i) => {
              return (
                <li key={`exercise-${i}`} className="user-log">
                  <ul className="user-log-container">
                    <li className="name"><h3>{exercise.name}</h3></li>
                    <li className="reps-and-sets">{`${exercise.reps} reps x ${exercise.sets} sets`}</li>
                    <li className="weight"><div>{`${exercise.weight} ${exercise.unit}`}</div></li>
                    <li><i onClick={(e) => deleteExercise(e, exercise._id, i)} className="fas fa-times-circle delete-exercise"></i></li>
                  </ul>
                </li>
              )
            })}
          </ul> 
        }
      </section>
    </div>
  );
}
export default WorkoutLog;