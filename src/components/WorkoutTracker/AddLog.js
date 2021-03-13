import React, { useState } from "react"
import Button from '@material-ui/core/Button'

const newExercise = { name: '', sets: 0, reps: 0, weight: 0 }

function AddLog(props) {
  const [exercises, setExercises] = useState([{...newExercise}])

  const addExerciseRow = (e) => {
    const exerciseToAdd = [...exercises]
    exerciseToAdd.push(Object.assign({}, newExercise))
    setExercises(exerciseToAdd)
  }
  const updateExerciseField = (e, i) => {
    const exerciseState = [...exercises]
    exerciseState[i][e.target.name] = e.target.value
    setExercises(exerciseState)
  }

  const saveExercises = async e => {
    e.preventDefault()
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: props.date.toLocaleDateString(), exercises }),
      })
      if (response.ok) {
        props.onAdd()
      }
    } catch {
      console.log('dksjdhfks')
    }
  };
  const addRow = e => {
    e.preventDefault()
    addExerciseRow()
  };

  return (
    <form className="add-log">
      {exercises.map((exercise, i) => {
        return (
          <fieldset onChange={(e) => updateExerciseField(e, i)} key={i} className={exercises.length > 1 ? "container border-bottom" : 'container'}>
            <div className="input-container">
              <label htmlFor="name"><p>Name</p></label>
              <input type="text" name="name" id="name" defaultValue={exercise.name} />
            </div>
            <div className="input-container">
              <label htmlFor="weight"><p>Weight</p></label>
              <input type="number" name="weight" id="weight" defaultValue={exercise.weight} />
              <div className="select-container">
                <select>
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="sets"><p>Sets</p></label>
              <input type="number" name="sets" id="sets" defaultValue={exercise.sets}/>
            </div>
            <div className="input-container">
              <label htmlFor="reps"><p>Reps</p></label>
              <input type="number" name="reps" id="reps" defaultValue={exercise.reps}/>
            </div>
          </fieldset>
        )
      })}
      <div className="buttons-container">
        <Button onClick={addRow} variant="contained">Add Row</Button>
        <Button onSubmit={saveExercises} variant="contained">Submit</Button>
      </div>
    </form>
  )
}
export default AddLog;