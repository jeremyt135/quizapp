import { QuizId } from '../quiz/types'

export type EditorError = { status: number; errors: any[] }

export interface QuestionAnswer {
  text: string
}

export interface QuizQuestion {
  text: string
  correctAnswer: number
  answers: QuestionAnswer[]
}

export interface Quiz {
  _id?: QuizId
  title: string
  isPublic: boolean
  allowedUsers: string[]
  expiration: string
  questions: QuizQuestion[]
}

export interface EditorState {
  loading: boolean
  editing: boolean
  error: EditorError | null
  quiz: Quiz
}

// User posting a quiz to server
export const CREATE_QUIZ = 'CREATE_QUIZ'
export const CREATE_QUIZ_ERROR = 'CREATE_QUIZ_ERROR'
// User sends edited quiz to server
export const POST_EDITED_QUIZ = 'POST_EDITED_QUIZ'
export const POST_EDITED_QUIZ_ERROR = 'POST_EDITED_QUIZ_ERROR'
// Loaded quiz to edit
export const LOAD_QUIZ = 'LOAD_EDITED_QUIZ'
export const LOAD_QUIZ_ERROR = 'LOAD_EDITED_QUIZ_ERROR'
// Opening quiz editor in edit mode
export const EDIT_QUIZ = 'EDIT_QUIZ'
// Add question to current quiz
export const ADD_QUESTION = 'ADD_QUESTION'
// Removes question from quiz
export const REMOVE_QUESTION = 'REMOVE_QUESTION'
// Add answer to a question
export const ADD_ANSWER = 'ADD_ANSWER'
// Remove answer from question
export const REMOVE_ANSWER = 'REMOVE_ANSWER'
// Change answer
export const CHANGE_ANSWER_TEXT = 'CHANGE_ANSWER_TEXT'
// Change non-answer part of question
export const CHANGE_QUESTION = 'CHANGE_QUESTION'
// Change quiz settings
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_PUBLIC = 'CHANGE_PUBLIC'
export const CHANGE_EXPIRATION = 'CHANGE_EXPIRATION'
export const CHANGE_ALLOWED_USERS = 'CHANGE_ALLOWED_USERS'
// Clear all edited quiz data (usually at the moment when user leaves editor)
export const CLEAR_EDITOR = 'CLEAR_EDITOR'

interface CreateQuizAction {
  type: typeof CREATE_QUIZ
}

interface CreateQuizErrorAction {
  type: typeof CREATE_QUIZ_ERROR
  payload: EditorError
}

interface PostEditedQuizAction {
  type: typeof POST_EDITED_QUIZ
}

interface PostEditedQuizErrorAction {
  type: typeof POST_EDITED_QUIZ_ERROR
  payload: EditorError
}

interface EditQuizAction {
  type: typeof EDIT_QUIZ
}

interface LoadQuizAction {
  type: typeof LOAD_QUIZ
  payload: Quiz
}

interface LoadQuizErrorAction {
  type: typeof LOAD_QUIZ_ERROR
  payload: EditorError
}

interface AddQuestionAction {
  type: typeof ADD_QUESTION
}

interface RemoveQuestionAction {
  type: typeof REMOVE_QUESTION
  payload: number
}

interface AddAnswerAction {
  type: typeof ADD_ANSWER
  payload: number
}

interface RemoveAnswerAction {
  type: typeof REMOVE_ANSWER
  payload: { questionIndex: number; answerIndex: number }
}

interface ChangeIsPublicAction {
  type: typeof CHANGE_PUBLIC
  payload: boolean
}

interface ChangeExpirationAction {
  type: typeof CHANGE_EXPIRATION
  payload: string
}

interface ChangeAllowedUsersAction {
  type: typeof CHANGE_ALLOWED_USERS
  payload: string[]
}

interface ChangeTitleAction {
  type: typeof CHANGE_TITLE
  payload: string
}

interface ChangeQuestionAction {
  type: typeof CHANGE_QUESTION
  payload: {
    questionIndex: number
    questionData: {
      text?: string
      correctAnswer?: number
      answers?: QuestionAnswer[]
    }
  }
}

interface ClearEditorAction {
  type: typeof CLEAR_EDITOR
}

export type EditorActionTypes =
  | CreateQuizAction
  | CreateQuizErrorAction
  | PostEditedQuizAction
  | PostEditedQuizErrorAction
  | EditQuizAction
  | LoadQuizAction
  | LoadQuizErrorAction
  | AddQuestionAction
  | RemoveQuestionAction
  | RemoveAnswerAction
  | AddAnswerAction
  | ChangeIsPublicAction
  | ChangeExpirationAction
  | ChangeAllowedUsersAction
  | ChangeTitleAction
  | ChangeQuestionAction
  | ClearEditorAction
