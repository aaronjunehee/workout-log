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
    <form className="login">
      <fieldset>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      </fieldset>
      <button onClick={handleSubmit}>Log In</button>
      <div className="signup-button">
        <Link to="/signup">
          Create New Account
        </Link>
      </div>
    </form>
  );
}
export default Login;