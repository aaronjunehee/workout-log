import React, { useState } from "react";

const newExercise = { name: '', sets: '', reps: '', weight: '' }

function AddLog(props) {
  const [exercises, setExercises] = useState([{...newExercise}]);

  const addExerciseRow = (e) => {
    const exerciseToAdd = [...exercises];
    exerciseToAdd.push(Object.assign({}, newExercise));
    setExercises(exerciseToAdd);
  }
  const updateExerciseField = (e, i) => {
    const exerciseState = [...exercises];
    exerciseState[i][e.target.name] = e.target.value;
    setExercises(exerciseState);
  }

  const saveExercises = async e => {
    e.preventDefault();
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
    e.preventDefault();
    addExerciseRow();
  };

  return (
    <form onSubmit={saveExercises}>
      {exercises.map((exercise, i) => {
        return (
          <fieldset onChange={(e) => updateExerciseField(e, i)} key={i}>
            <label htmlFor="name">
              Name:
              <input type="text" name="name" id="name" defaultValue={exercise.name}/>
            </label>
            <label htmlFor="reps">
              Sets:
              <input type="text" name="reps" id="reps" defaultValue={exercise.reps}/>
            </label>
            <label htmlFor="sets">
              Reps:
              <input type="text" name="sets" id="sets" defaultValue={exercise.sets}/>
            </label>
            <label htmlFor="weight">
              Weight:
              <input type="text" name="weight" id="weight" defaultValue={exercise.weight} />
            </label>
          </fieldset>
        )
      })}
      <button onClick={addRow}>Add Row</button>
      <input type="submit" value="Save" />
    </form>
  )
}
export default AddLog;