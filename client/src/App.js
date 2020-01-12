import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Landing from './components/common/Landing'
import Register from './components/common/Register'
import Login from './components/common/Login'

import './styles/theme.css'
import QuizBrowser from './components/quiz/browse/QuizBrowser'
import QuizEditor from './components/quiz/editor/QuizEditor'
import Dashboard from './components/user/Dashboard'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/quiz/public' component={QuizBrowser} />
        <Route exact path='/quiz/create' component={QuizEditor} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
