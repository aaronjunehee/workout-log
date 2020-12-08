import React, { useState } from 'react'

function SignUp(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    signUpUser()
  }

  const createHeader = (params) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    }
  }

  const signUpUser = async () => {
    try {
      const params = { email, password, firstName, lastName}
      const response = await fetch('/api/users', createHeader(params))
      const data = await response.json()
      // what are we using data.id for?
      if (!response.ok) {
        throw new Error(data.message)
      }
      logInUser()
    } catch(err) {
      console.log(err)
    }
  }

  const logInUser = async () => {
    try {
      const params = { email, password }
      const response = await fetch('/api/users/login', createHeader(params))
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message)
      }
      props.getUser()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <form>
      <fieldset>
        <label htmlFor="firstName">
          First Name
        <input type="text" name="firstName" id="firstName" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label htmlFor="lastName">
          Last Name
        <input type="text" name="lastName" id="lastName" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label htmlFor="email">
          Email
        <input type="text" name="email" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          Password
        <input type="text" name="password" id="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
export default SignUp;