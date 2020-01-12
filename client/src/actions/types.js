const ActionTypes = {
  Auth: {
    // User has successfully registered, action data contains JWT
    REGISTER_USER: 'REGISTER_USER',
    // Error registering user
    REGISTER_ERROR: 'REGISTER_ERROR',
    // User data received from server, contained in action data
    AUTH_USER: 'AUTH_USER',
    // Error authenticaing user
    AUTH_ERROR: 'AUTH_ERROR',
    // User has logged in, action data contains JWT
    LOGIN_USER: 'LOGIN_USER',
    // UError logging user in
    LOGIN_ERROR: 'LOGIN_ERROR'
  }
  // Edit: {
  //   EDIT_TITLE: 'EDIT_TITLE',
  //   ADD_QUESTION: 'ADD_QUESTION',
  //   REMOVE_QUESTION: 'REMOVE_QUESTION',
  //   ADD_ANSWER: 'ADD_ANSWER',
  //   REMOVE_ANSWER: 'REMOVE_ANSWER',
  //   SELECT_CORRECT_ANSWER: 'SELECT_CORRECT_ANSWER',
  //   SAVE_QUIZ: 'SAVE_QUIZ'
  // },
  // Answer: {
  //   CHANGE_ANSWER: 'CHANGE_ANSWER',
  //   SUBMIT_QUIZ: 'SUBMIT_QUIZ'
  // }
}

export default ActionTypes
