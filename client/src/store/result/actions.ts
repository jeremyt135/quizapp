import {
  CLEAR_RESULT,
  LOAD_RESULT,
  LOAD_RESULT_ERROR,
  Result,
  ResultActionTypes,
  ResultError
} from './types'

export function loadResult(result: Result): ResultActionTypes {
  return {
    type: LOAD_RESULT,
    payload: result
  }
}

export function loadResultError(error: ResultError): ResultActionTypes {
  return {
    type: LOAD_RESULT_ERROR,
    payload: error
  }
}

export function clearResult(): ResultActionTypes {
  return {
    type: CLEAR_RESULT
  }
}
