import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
      if (!response.ok) {
        throw new Error(data.message)
      }
      logInUser()
    } catch(err) {
      console.log(err)
      props.updateUser(undefined)
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
    <form className="signup">
      <div className="close-button">
        <Link to="/login"><i className="fas fa-times"></i></Link>
      </div>
      <fieldset>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      </fieldset>
      <button onClick={handleSubmit}>Sign Up</button>
    </form>
  );
}
export default SignUp;