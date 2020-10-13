import {
  ADD_ANSWER,
  ADD_QUESTION,
  CHANGE_ALLOWED_USERS,
  CHANGE_EXPIRATION,
  CHANGE_PUBLIC,
  CHANGE_QUESTION,
  CHANGE_TITLE,
  CLEAR_EDITOR,
  CREATE_QUIZ,
  CREATE_QUIZ_ERROR,
  EditorActionTypes,
  EditorError,
  EDIT_QUIZ,
  LOAD_QUIZ,
  LOAD_QUIZ_ERROR,
  POST_EDITED_QUIZ,
  POST_EDITED_QUIZ_ERROR,
  QuestionAnswer,
  Quiz,
  REMOVE_ANSWER,
  REMOVE_QUESTION
} from './types'

export function createQuiz(): EditorActionTypes {
  return {
    type: CREATE_QUIZ
  }
}

export function createQuizError(error: EditorError): EditorActionTypes {
  return {
    type: CREATE_QUIZ_ERROR,
    payload: error
  }
}

export function postEditedQuiz(): EditorActionTypes {
  return {
    type: POST_EDITED_QUIZ
  }
}

export function postEditedQuizError(error: EditorError): EditorActionTypes {
  return {
    type: POST_EDITED_QUIZ_ERROR,
    payload: error
  }
}

export function editQuiz(): EditorActionTypes {
  return {
    type: EDIT_QUIZ
  }
}

export function loadQuiz(quiz: Quiz): EditorActionTypes {
  return {
    type: LOAD_QUIZ,
    payload: quiz
  }
}

export function loadQuizError(error: EditorError): EditorActionTypes {
  return {
    type: LOAD_QUIZ_ERROR,
    payload: error
  }
}

export function addQuestion(): EditorActionTypes {
  return {
    type: ADD_QUESTION
  }
}

export function removeQuestion(index: number): EditorActionTypes {
  return {
    type: REMOVE_QUESTION,
    payload: index
  }
}

export function addAnswer(questionIndex: number): EditorActionTypes {
  return {
    type: ADD_ANSWER,
    payload: questionIndex
  }
}

export function removeAnswer(
  questionIndex: number,
  answerIndex: number
): EditorActionTypes {
  return {
    type: REMOVE_ANSWER,
    payload: { questionIndex, answerIndex }
  }
}

export function changeIsPublic(isPublic: boolean): EditorActionTypes {
  return {
    type: CHANGE_PUBLIC,
    payload: isPublic
  }
}

export function changeExpiration(expiration: string): EditorActionTypes {
  return {
    type: CHANGE_EXPIRATION,
    payload: expiration
  }
}

export function changeAllowedUsers(users: string[]): EditorActionTypes {
  return {
    type: CHANGE_ALLOWED_USERS,
    payload: users
  }
}

export function changeTitle(title: string): EditorActionTypes {
  return {
    type: CHANGE_TITLE,
    payload: title
  }
}

export function changeQuestion(
  questionIndex: number,
  questionData: {
    text?: string
    correctAnswer?: number
    answers?: QuestionAnswer[]
  }
): EditorActionTypes {
  return {
    type: CHANGE_QUESTION,
    payload: { questionIndex, questionData }
  }
}

export function clearEditor(): EditorActionTypes {
  return {
    type: CLEAR_EDITOR
  }
}
