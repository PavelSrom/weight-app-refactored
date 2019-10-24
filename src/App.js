import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './containers/Register'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import Logs from './containers/Logs'
import Exercises from './containers/Exercises'
import UserDetails from './containers/UserDetails'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/me" exact component={Dashboard} />
      <Route path="/me/logs" exact component={Logs} />
      <Route path="/me/details" exact component={UserDetails} />
      <Route path="/exercises" exact component={Exercises} />
    </Switch>
  </Router>
)

export default App
