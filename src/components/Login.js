import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

function Login(props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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
      if (!response.ok) {
        throw new Error(data.message)
      }
      props.getUser()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="login">
      {error !== '' && <p>{error}</p>}
      <fieldset className={classes.root}>
        <TextField 
          variant="outlined" 
          label="Email Address" 
          id="email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          id="password"
          name="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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