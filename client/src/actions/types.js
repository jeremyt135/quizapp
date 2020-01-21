const ActionTypes = {
  Auth: {
    // User has successfully registered, action data contains JWT
    REGISTER_USER: 'REGISTER_USER',
    REGISTER_ERROR: 'REGISTER_ERROR',
    // User has logged in, action data contains JWT
    LOGIN_USER: 'LOGIN_USER',
    LOGIN_ERROR: 'LOGIN_ERROR',
    // Catch-all clear current auth data (usually after user logout/delete)
    CLEAR_AUTH: 'CLEAR_AUTH'
  },
  User: {
    // User data received from server, contained in action data
    LOAD_USER: 'LOAD_USER',
    LOAD_USER_ERROR: 'LOAD_USER_ERROR',
    // User has changed their email or password
    CHANGE_USER_INFO: 'CHANGE_USER_INFO',
    CHANGE_USER_INFO_ERROR: 'CHANGE_USER_INFO_ERROR',
    // User deleted
    DELETE_USER: 'DELETE_USER',
    DELETE_USER_ERROR: 'DELETE_USER_ERROR',
    // Log the user out
    LOGOUT: 'LOGOUT'
  },
  Quiz: {
    // User posting a quiz to server
    CREATE_QUIZ: 'CREATE_QUIZ',
    CREATE_QUIZ_ERROR: 'CREATE_QUIZ_ERROR',
    // User sends edited quiz to server
    POST_EDITED_QUIZ: 'POST_EDITED_QUIZ',
    POST_EDITED_QUIZ_ERROR: 'POST_EDITED_QUIZ_ERROR',
    // User getting the full quiz info from server
    LOAD_QUIZ: 'LOAD_QUIZ',
    LOAD_QUIZ_ERROR: 'LOAD_QUIZ_ERROR',
    // User getting a list of quiz info from server
    LOAD_QUIZ_LIST: 'LOAD_QUIZ_LIST',
    LOAD_QUIZ_LIST_ERROR: 'LOAD_QUIZ_LIST_ERROR',
    // User deletes one of their quizzes
    DELETE_QUIZ: 'DELETE_QUIZ',
    DELETE_QUIZ_ERROR: 'DELETE_QUIZ_ERROR',
    // User opening quiz editor
    EDIT_QUIZ: 'EDIT_QUIZ',
    EDIT_QUIZ_ERROR: 'EDIT_QUIZ_ERROR',
    // User submits answers to a quiz
    POST_ANSWERS: 'POST_ANSWERS',
    POST_ANSWERS_ERROR: 'POST_ANSWERS_ERROR',
    // Load results listing for dashboard
    LOAD_RESULT_LIST: 'LOAD_RESULT_LIST',
    LOAD_RESULT_LIST_ERROR: 'LOAD_RESULT_LIST_ERROR',
    CLEAR_QUIZLIST: 'CLEAR_QUIZLIST',
    CLEAR_RESULT_LIST: 'CLEAR_RESULT_LIST',
    CLEAR_QUIZ: 'CLEAR_QUIZ'
  },
  Result: {
    // User loads quiz results
    LOAD_RESULT: 'LOAD_RESULT',
    LOAD_RESULT_ERROR: 'LOAD_RESULT_ERROR',
    CLEAR_RESULT: 'CLEAR_RESULT'
  }
}

export default ActionTypes
