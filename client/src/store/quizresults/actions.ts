import {
  CLEAR_RESULT_LIST,
  LOAD_RESULT_LIST,
  LOAD_RESULT_LIST_ERROR,
  ResultListing,
  ResultListingError
} from './types'

export function loadResultListings(listings: ResultListing) {
  return {
    type: LOAD_RESULT_LIST,
    payload: listings
  }
}

export function loadResultListingError(error: ResultListingError) {
  return {
    type: LOAD_RESULT_LIST_ERROR,
    payload: error
  }
}

export function clearResultListings() {
  return {
    type: CLEAR_RESULT_LIST
  }
}
