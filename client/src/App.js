import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
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
import createStore from './store/store'

import PrivateRoute from './components/routing/PrivateRoute'

import './styles/theme.css'

let { store, persistor } = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route exact path='/quiz/public' component={QuizBrowser} />
            <PrivateRoute exact path='/quiz/create' component={QuizEditor} />
            <Route exact path='/quiz/:id' component={Quiz} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
