import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Header from './Header'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
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

function Login(props) {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
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
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <section className="login-wrapper">
      <Header />
      <form className="login-form">
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
            error={error.toLowerCase().includes('email')}
            helperText={error.toLowerCase().includes('email') ? error : ''}
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
        <Button className="login primary" variant="contained" fullWidth type="submit" size="large" onClick={handleSubmit}>
          {!loading && 'Log In'}
          {loading && <CircularProgress size={30} className={classes.loader} />}
        </Button>
        {/* {error.includes('information') && <p className="error">{error}</p>} */}
        <div className="signup-button-container">
          <Link to="/signup">
            <Button className="signup secondary" variant="contained" size="large">
              Create New Account
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
export default Login;