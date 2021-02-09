import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing(2)
  }
}))

function SignUp(props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')

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
      const params = { firstName, lastName, email, password }
      const response = await fetch('/api/users', createHeader(params))
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      logInUser()
    } catch(err) {
      setError(err.message)
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
      {error !== '' && <p>{error}</p>}
      <fieldset className={classes.root}>
        <TextField
          variant="outlined"
          fullWidth
          label="First Name"
          id="firstName"
          name="firstName"
          autoFocus
          defaultValue={firstName}
          className={classes.textField}
          onChange={(e) => setFirstName(e.target.value)}
          error={error.toLowerCase().includes('first name')}
          helperText={error.toLowerCase().includes('first name') ? error : ''}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Last Name"
          id="lastName"
          name="lastName"
          defaultValue={lastName}
          className={classes.textField}
          onChange={(e) => setLastName(e.target.value)}
          error={error.toLowerCase().includes('last name')}
          helperText={error.toLowerCase().includes('last name') ? error : ''}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Email"
          id="email"
          name="email"
          defaultValue={email}
          className={classes.textField}
          onChange={(e) => setEmail(e.target.value)}
          error={error.toLowerCase().includes('email')}
          helperText={error.toLowerCase().includes('email') ? error : ''}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Password"
          id="password"
          name="password"
          defaultValue={password}
          className={classes.textField}
          onChange={(e) => setPassword(e.target.value)}
          error={error.toLowerCase().includes('password')}
          helperText={error.toLowerCase().includes('password') ? error : ''}
        />
      </fieldset>
      <Button className="signup" variant="contained" fullWidth type="submit" size="large" onClick={handleSubmit}>Sign Up</Button>
    </form>
  );
}
export default SignUp;