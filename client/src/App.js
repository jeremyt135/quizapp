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
import QuizResult from './components/quiz/result/QuizResult'
import QuizRoute from './components/routing/QuizRoute'

import createStore from './store/store'

import PrivateRoute from './components/routing/PrivateRoute'

import ErrorPage from './components/errors/ErrorPage'

import './styles/theme.scss'
import AlertBar from './components/common/AlertBar'

let { store, persistor } = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <AlertBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/quizzes/create' component={QuizEditor} />
            <QuizRoute exact path='/quizzes/:id' />
            <PrivateRoute
              exact
              path='/quizzes/:id/edit'
              component={QuizEditor}
            />
            <PrivateRoute path='/results' component={QuizResult} />
            <Route render={() => <ErrorPage status={404} />} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
