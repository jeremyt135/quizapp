import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/user/Register'
import Login from './components/user/Login'

import QuizBrowser from './components/quiz/browse/QuizBrowser'
import QuizEditor from './components/quiz/editor/QuizEditor'
import Dashboard from './components/user/dashboard/Dashboard'
import Quiz from './components/quiz/answer/Quiz'
import store from './store/store'

import './styles/theme.css'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/quiz/public' component={QuizBrowser} />
          <Route exact path='/quiz/create' component={QuizEditor} />
          <Route exact path='/quiz/:id' component={Quiz} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
