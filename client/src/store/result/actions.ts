import {
  CLEAR_RESULT,
  LOAD_RESULT,
  LOAD_RESULT_ERROR,
  Result,
  ResultError
} from './types'

export function loadResult(result: Result) {
  return {
    type: LOAD_RESULT,
    payload: result
  }
}

export function loadResultError(error: ResultError) {
  return {
    type: LOAD_RESULT_ERROR,
    payload: error
  }
}

export function clearResult() {
  return {
    type: CLEAR_RESULT
  }
}
