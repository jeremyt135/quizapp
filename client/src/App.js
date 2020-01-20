import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/user/Register'
import Login from './components/user/Login'

import QuizEditor from './components/quiz/editor/QuizEditor'
import Dashboard from './components/user/dashboard/Dashboard'
import QuizAnswerForm from './components/quiz/answer/QuizAnswerForm'
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
            <PrivateRoute exact path='/quiz/create' component={QuizEditor} />
            <PrivateRoute exact path='/quiz/:id' component={QuizAnswerForm} />
            <PrivateRoute exact path='/quiz/:id/edit' component={QuizEditor} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
