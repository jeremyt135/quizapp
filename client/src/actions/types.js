const ActionTypes = {
  Auth: {
    // User has successfully registered, action data contains JWT
    REGISTER_USER: 'REGISTER_USER',
    // Error registering user
    REGISTER_ERROR: 'REGISTER_ERROR',
    // User has logged in, action data contains JWT
    LOGIN_USER: 'LOGIN_USER',
    // UError logging user in
    LOGIN_ERROR: 'LOGIN_ERROR'
  },
  User: {
    // User data received from server, contained in action data
    LOAD_USER: 'LOAD_USER',
    // Error loading user
    LOAD_USER_ERROR: 'LOAD_USER_ERROR',
    // User has changed their email or password
    CHANGE_USER_INFO: 'CHANGE_USER_INFO',
    // Error changing user info
    CHANGE_USER_INFO_ERROR: 'CHANGE_USER_INFO_ERROR'
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
