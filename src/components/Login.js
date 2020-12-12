import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    logInUser()
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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form>
      <fieldset>
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
      <Link to="/signup">
        Don't have an account? Sign Up
      </Link>
    </form>
  );
}
export default Login;