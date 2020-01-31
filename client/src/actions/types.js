// Types for actions done with authorization & auth reducer
export const Auth = {
  // User has successfully registered, action data contains JWT
  REGISTER_USER: 'REGISTER_USER',
  REGISTER_ERROR: 'REGISTER_ERROR',
  // User has logged in, action data contains JWT
  LOGIN_USER: 'LOGIN_USER',
  LOGIN_ERROR: 'LOGIN_ERROR',
  // Catch-all clear current auth data (usually after user logout/delete)
  CLEAR_AUTH: 'CLEAR_AUTH'
}
export const Dashboard = {
  LOAD_DASHBOARD: 'LOAD_DASHBOARD',
  LOAD_DASHBOARD_ERROR: 'LOAD_DASHBOARD_ERROR',
  CLEAR_DASHBOARD: 'CLEAR_DASHBOARD'
}
// Types for actions that are done through a user (not necessarily related to the reducer)
export const User = {
  // User data received from server, contained in action data
  LOAD_USER: 'LOAD_USER',
  LOAD_USER_ERROR: 'LOAD_USER_ERROR',
  // User has changed their email or password
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  CHANGE_USER_INFO_ERROR: 'CHANGE_USER_INFO_ERROR',
  // User deleted
  DELETE_USER: 'DELETE_USER',
  DELETE_USER_ERROR: 'DELETE_USER_ERROR',
  // User deletes one of their quizzes
  DELETE_QUIZ: 'DELETE_QUIZ',
  DELETE_QUIZ_ERROR: 'DELETE_QUIZ_ERROR',
  // Log the user out
  LOGOUT: 'LOGOUT'
}
// Types for actions done in quiz editor
export const Editor = {
  // User posting a quiz to server
  CREATE_QUIZ: 'CREATE_QUIZ',
  CREATE_QUIZ_ERROR: 'CREATE_QUIZ_ERROR',
  // User sends edited quiz to server
  POST_EDITED_QUIZ: 'POST_EDITED_QUIZ',
  POST_EDITED_QUIZ_ERROR: 'POST_EDITED_QUIZ_ERROR',
  // Opening quiz editor
  EDIT_QUIZ: 'EDIT_QUIZ',
  EDIT_QUIZ_ERROR: 'EDIT_QUIZ_ERROR'
}
export const Quiz = {
  // User getting the quiz form to answer
  LOAD_QUIZ: 'LOAD_QUIZ',
  LOAD_QUIZ_ERROR: 'LOAD_QUIZ_ERROR',
  // User submits answers to a quiz
  POST_ANSWERS: 'POST_ANSWERS',
  POST_ANSWERS_ERROR: 'POST_ANSWERS_ERROR',
  CLEAR_QUIZ: 'CLEAR_QUIZ'
}
export const Result = {
  // User loads quiz results
  LOAD_RESULT: 'LOAD_RESULT',
  LOAD_RESULT_ERROR: 'LOAD_RESULT_ERROR',
  CLEAR_RESULT: 'CLEAR_RESULT'
}
export const QuizResults = {
  LOAD_RESULT_LIST: 'LOAD_RESULT_LIST',
  LOAD_RESULT_LIST_ERROR: 'LOAD_RESULT_LIST_ERROR',
  CLEAR_RESULT_LIST: 'CLEAR_RESULT_LIST'
}
export const Alerts = {
  SET_ALERT: 'SET_ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT'
}

export default {
  Alerts,
  Auth,
  Dashboard,
  User,
  Editor,
  Quiz,
  Result,
  QuizResults
}
