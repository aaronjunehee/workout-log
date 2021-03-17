import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

const newExercise = { name: '', sets: 0, reps: 0, weight: 0, unit: 'lbs' }

function AddLog(props) {
  const [exercises, setExercises] = useState([{...newExercise}])
  const [error, setError] = useState('')

  const addExerciseRow = () => {
    const exerciseToAdd = [...exercises]
    exerciseToAdd.push(Object.assign({}, newExercise))
    setExercises(exerciseToAdd)
  }

  const deleteExerciseRow = (i) => {
    const exerciseState = [...exercises]
    exerciseState.splice(i, 1)
    setExercises(exerciseState)
    setError('')
  }

  const updateExerciseField = (e, i) => {
    const exerciseState = [...exercises]
    const name = e.target.name.replace(/-\d+/g, '')
    exerciseState[i][name] = e.target.value
    setExercises(exerciseState)
    setError('')
  }

  const saveExercises = async e => {
    e.preventDefault()
    try {
      const isVerified = verifyExercises()
      if (!isVerified) {
        throw new Error('All fields must be filled in')
      }
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: props.date.toLocaleDateString(), exercises }),
      })
      if (response.ok) {
        props.onAdd()
        resetVars()
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const verifyExercises = () => {
    let isVerified = false
    exercises.forEach(ex =>
      isVerified = (ex.name !== '' && ex.weight > 0 && ex.sets > 0 && ex.reps > 0)
    )
    return isVerified
  }

  const resetVars = () => {
    setExercises([{ ...newExercise }])
    setError('')
  }

  const addRow = e => {
    e.preventDefault()
    addExerciseRow()
  }

  const deleteRow = (e, i) => {
    e.preventDefault()
    deleteExerciseRow(i)
  }

  return (
    <form className="add-log" onSubmit={saveExercises}>
      {exercises.map((ex, i) => {
        return (
          <fieldset key={i} className={exercises.length > 1 ? 'container border-bottom' : 'container'}>
            { i > 0 && <i onClick={(e) => deleteRow(e, i)} className="fas fa-times-circle"></i> }
            <div className="input-container">
              <label htmlFor={`name-${i}`}><p>Name</p></label>
              <input type="text" name={`name-${i}`} id={`name-${i}`} value={exercises[i].name} onChange={(e) => updateExerciseField(e, i)} />
            </div>
            <div className="input-container">
              <label htmlFor={`weight-${i}`}><p>Weight</p></label>
              <input type="number" name={`weight-${i}`} id={`weight-${i}`} value={exercises[i].weight} onChange={(e) => updateExerciseField(e, i)} />
              <div className="select-container">
                <label htmlFor={`unit-${i}`} className="visuallyhidden">Unit of Measurement</label>
                <select name={`unit-${i}`} id={`unit-${i}`} value={exercises[i].unit} onChange={(e) => updateExerciseField(e, i)}>
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <label htmlFor={`sets-${i}`}><p>Sets</p></label>
              <input type="number" name={`sets-${i}`} id={`sets-${i}`} value={exercises[i].sets} onChange={(e) => updateExerciseField(e, i)} />
            </div>
            <div className="input-container">
              <label htmlFor={`reps-${i}`}><p>Reps</p></label>
              <input type="number" name={`reps-${i}`} id={`reps-${i}`} value={exercises[i].reps} onChange={(e) => updateExerciseField(e, i)} />
            </div>
          </fieldset>
        )
      })}
      <div className="buttons-container">
        <Button onClick={addRow} variant="contained">Add Row</Button>
        <Button variant="contained" type="submit">Submit</Button>
      </div>
      {error !== '' && <p className="error">{error}</p>}
    </form>
  )
}
export default AddLog