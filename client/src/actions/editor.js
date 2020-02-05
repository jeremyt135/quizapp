import { Editor } from './types'
import { loadUser } from './user'
import { parseError } from './parse-error'
import { setAlert } from './alerts'

export const postQuiz = (quiz, onSuccess) => async dispatch => {
  try {
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz)
    })
    if (response.ok) {
      // load the updated user data
      dispatch(loadUser()).then(() => {
        onSuccess()
        dispatch({
          type: Editor.CREATE_QUIZ
        })
        dispatch(
          setAlert({
            msg: 'Quiz created successfully',
            type: 'success'
          })
        )
      })
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.CREATE_QUIZ_ERROR,
        data: error
      })
      dispatch(
        setAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger'
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export const postEditedQuiz = (quiz, onSuccess) => async dispatch => {
  try {
    const response = await fetch(`/api/quizzes/${quiz._id}/edit`, {
      method: 'PUT',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quiz)
    })
    if (response.ok) {
      // load the updated user data
      dispatch(loadUser()).then(() => {
        onSuccess()
        dispatch({
          type: Editor.POST_EDITED_QUIZ
        })
        dispatch(
          setAlert({
            msg: 'Quiz edited successfully',
            type: 'success'
          })
        )
      })
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.POST_EDITED_QUIZ_ERROR,
        data: error
      })
      dispatch(
        setAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger'
        })
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export const goToQuizEditor = (quizId, browserHistory) => dispatch => {
  dispatch({
    type: Editor.EDIT_QUIZ
  })
  dispatch(getQuiz(quizId))
  browserHistory.push(`/quizzes/${quizId}/edit`)
}

export const getQuiz = quizId => async dispatch => {
  try {
    // get the corresponding quiz
    const response = await fetch(`/api/quizzes/${quizId}`, {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    })
    let quiz = null
    if (response.ok) {
      quiz = await response.json()
      dispatch({
        type: Editor.LOAD_QUIZ,
        data: quiz
      })
    } else {
      const error = await parseError(response)
      dispatch({
        type: Editor.LOAD_QUIZ_ERROR,
        data: error
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const addQuestion = () => dispatch => {
  dispatch({
    type: Editor.ADD_QUESTION
  })
}

export const removeQuestion = index => dispatch => {
  dispatch({
    type: Editor.REMOVE_QUESTION,
    data: index
  })
}

export const addAnswer = questionIndex => dispatch => {
  dispatch({
    type: Editor.ADD_ANSWER,
    data: questionIndex
  })
}

export const removeAnswer = (questionIndex, answerIndex) => dispatch => {
  dispatch({
    type: Editor.REMOVE_ANSWER,
    data: { questionIndex, answerIndex }
  })
}

export const changeIsPublic = isPublic => dispatch => {
  dispatch({
    type: Editor.CHANGE_PUBLIC,
    data: isPublic
  })
}

export const changeExpiration = expiration => dispatch => {
  dispatch({
    type: Editor.CHANGE_EXPIRATION,
    data: expiration
  })
}

export const changeAllowedUsers = users => dispatch => {
  dispatch({
    type: Editor.CHANGE_ALLOWED_USERS,
    data: users
  })
}

export const changeTitle = title => dispatch => {
  dispatch({
    type: Editor.CHANGE_TITLE,
    data: title
  })
}

export const changeQuestion = (questionIndex, questionData) => dispatch => {
  dispatch({
    type: Editor.CHANGE_QUESTION,
    data: { questionIndex, questionData }
  })
}

export const clearEditor = () => dispatch => {
  dispatch({
    type: Editor.CLEAR_EDITOR
  })
}
