import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Register from 'components/user/Register'
import Login from 'components/user/Login'

import QuizEditor from 'components/quiz/editor/QuizEditor'
import Dashboard from 'components/user/dashboard/Dashboard'
import QuizResult from 'components/quiz/result/QuizResult'
import QuizRoute from 'components/routing/QuizRoute'
import PrivateRoute from 'components/routing/PrivateRoute'
import QuizCreator from 'components/quiz/editor/QuizCreator'
import ErrorPage from 'components/errors/ErrorPage'

import AlertBar from './AlertBar'
import Navbar from './Navbar'
import Landing from './Landing'

const App = () => {
  return (
    <>
      <Navbar />
      <AlertBar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/quizzes/create" component={QuizCreator} />
        <PrivateRoute exact path="/quizzes/:id/edit" component={QuizEditor} />
        <QuizRoute exact path="/quizzes/:id" />
        <PrivateRoute path="/results" component={QuizResult} />
        <Route render={() => <ErrorPage status={404} />} />
      </Switch>
    </>
  )
}

export default App
