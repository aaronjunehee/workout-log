import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import WorkoutLog from './components/WorkoutLog';
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
    <div className='App'>
      <header className='App-header'>
        <h1>Workout Log</h1>
      </header>
      <main>
        <button onClick={logOut}>Log Out</button>
        <Router>
          <Switch>
              <Route
                exact
                path='/signup'
                render={props => user ? <Redirect to='/' /> : <SignUp getUser={getUser} updateUser={setUser} {...props} />}
              />
              <Route
                path='/'
                render={props => !user ? <Redirect to='/signup' /> : <WorkoutLog {...props} />}
              />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
