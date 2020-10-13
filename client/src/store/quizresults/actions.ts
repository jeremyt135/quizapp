import {
  CLEAR_RESULT_LIST,
  LOAD_RESULT_LIST,
  LOAD_RESULT_LIST_ERROR,
  ResultListing,
  ResultListingError,
  ResultListActionTypes
} from './types'

export function loadResultListings(
  listings: ResultListing[]
): ResultListActionTypes {
  return {
    type: LOAD_RESULT_LIST,
    payload: listings
  }
}

export function loadResultListingError(
  error: ResultListingError
): ResultListActionTypes {
  return {
    type: LOAD_RESULT_LIST_ERROR,
    payload: error
  }
}

export function clearResultListings(): ResultListActionTypes {
  return {
    type: CLEAR_RESULT_LIST
  }
}
