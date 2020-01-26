import { Editor } from '../actions/types'

export const editor = (
  state = { quiz: null, loading: true, error: null },
  action
) => {
  switch (action.type) {
    case Editor.CREATE_QUIZ:
    case Editor.POST_EDITED_QUIZ:
      return {
        quiz: null,
        loading: true,
        error: null
      }
    case Editor.CREATE_QUIZ_ERROR:
    case Editor.POST_EDITED_QUIZ_ERROR:
      return {
        quiz: null,
        loading: false,
        error: action.data
      }
    default:
      return state
  }
}
