import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing()
  }
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
          fullWidth
          label="Email" 
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue={email}
          className={classes.textField}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          id="password"
          name="password"
          autoComplete="current-password"
          defaultValue={password}
          className={classes.textField}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </fieldset>
      <Button className="submit" variant="contained" fullWidth type="submit" size="large" onClick={handleSubmit}>Log In</Button>
      <div className="signup-button-container">
        <Link to="/signup">
          <Button className="signup" variant="contained" size="large"> Create New Account </Button>
        </Link>
      </div>
    </form>
  );
}
export default Login;