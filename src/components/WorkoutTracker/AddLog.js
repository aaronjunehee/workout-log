import React, { useState } from "react"

const newExercise = { name: '', sets: '', reps: '', weight: '' }

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
    <form onSubmit={saveExercises} className="add-log">
      {exercises.map((exercise, i) => {
        return (
          <fieldset onChange={(e) => updateExerciseField(e, i)} key={i} className={exercises.length > 1 ? "container border-bottom" : 'container'}>
            <div className="input">
              <label htmlFor="name">Exercise</label>
              <input type="text" name="name" id="name" defaultValue={exercise.name} />
            </div>
            <div className="input">
              <label htmlFor="weight">Weight</label>
              <input type="text" name="weight" id="weight" defaultValue={exercise.weight} />
            </div>
            <div className="input">
              <label htmlFor="reps">Sets</label>
              <input type="text" name="reps" id="reps" defaultValue={exercise.reps}/>
            </div>
            <div className="input">
              <label htmlFor="sets">Reps</label>
              <input type="text" name="sets" id="sets" defaultValue={exercise.sets}/>
            </div>
          </fieldset>
        )
      })}
      <div className="buttons">
        <button onClick={addRow}>Add Row</button>
        <input type="submit" value="Save" />
      </div>
    </form>
  )
}
export default AddLog;