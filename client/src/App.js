import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Landing from './components/common/Landing'
import Register from './components/user/Register'
import Login from './components/user/Login'

import './styles/theme.css'
import QuizBrowser from './components/quiz/browse/QuizBrowser'
import QuizEditor from './components/quiz/editor/QuizEditor'
import Dashboard from './components/user/Dashboard'
import Quiz from './components/quiz/answer/Quiz'
import { Provider } from 'react-redux'
import store from './store/store'

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
