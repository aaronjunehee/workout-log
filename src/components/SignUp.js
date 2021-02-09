import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  loader: {
    color: 'white'
  }
}))

function SignUp(props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
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
      setLoading(false)
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
      setLoading(false)
    } catch(err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <form className="signup">
      {/* {error !== '' && <p>{error}</p>} */}
      <fieldset className={classes.root}>
        <TextField
          variant="outlined"
          fullWidth
          label="First Name"
          id="firstName"
          name="firstName"
          autoFocus
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
          className={classes.textField}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          error={error.toLowerCase().includes('password')}
          helperText={error.toLowerCase().includes('password') ? error : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </fieldset>
      <Button className="signup primary" variant="contained" fullWidth type="submit" size="large" onClick={handleSubmit}>
        {!loading && 'Sign Up'}
        {loading && <CircularProgress size={30} className={classes.loader} />}
      </Button>
      <div className="login-button-container">
        <p>Have an account? <Link to="/login">Log in</Link></p>
      </div>
    </form>
  );
}
export default SignUp;