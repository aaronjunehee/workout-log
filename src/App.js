import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import WorkoutLog from './components/WorkoutLog';
import Login from './components/Login'
import SignUp from './components/SignUp'
import './styles/App.scss';

function App() {
  const [user, setUser] = useState(undefined)
  const getUser = useCallback(async () => {
    try {
      const response = await fetch('/api/users/me')
      const json = await response.json()
      if (!response.ok) {
        throw new Error(json.message)
      }
      setUser(json)
    } catch (err) {
      setUser(undefined)
      console.log(err)
    }
  }, [])
  useEffect(() => {
    getUser()
  }, [getUser])

  const logOut = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/logout')
      if (!response.ok) {
        throw new Error(response.message)
      }
      setUser(undefined)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>🏋️‍♂️ Workout Journal</h1>
        <p>A simple app that helps you keep track of your training</p>
      </header>
      <main>
        <Router>
          <Switch>
              <Route
                exact
                path='/login'
                render={props => user ? <Redirect to='/' /> : <Login getUser={getUser} {...props} />}
              />
              <Route
                exact
                path='/signup'
                render={props => user ? <Redirect to='/' /> : <SignUp getUser={getUser} updateUser={setUser} {...props} />}
              />
              <Route
                path='/'
                render={props => !user ? <Redirect to='/login' /> : <WorkoutLog logOut={logOut} {...props} />}
              />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
