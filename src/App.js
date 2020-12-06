import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import WorkoutLog from './components/WorkoutLog';
import SignUp from './components/SignUp'
import './styles/App.scss';

function App() {
  const [user, setUser] = useState(undefined)
  const getUser = useCallback( function () {
  setUser(undefined)
  }, [])
  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Workout Log</h1>
      </header>
      <main>
        <Router>
          <Switch>
              <Route
                exact
                path='/signup'
                render={() => user ? <Redirect to='/' /> : <SignUp />}
              />
              <Route
                path='/'
                render={() => !user ? <Redirect to='/signup' /> : <WorkoutLog />}
              />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
