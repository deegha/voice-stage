import * as Actions from '../actions/feedsActions'

const initialState = {
  loading: false,
  feeds: [],
  error: false,
  errorMessage: ''
}

export const feedsReducer = (state=initialState, action) => {
  switch(action.type) {
    case Actions.GET_FEEDS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Actions.GET_FEEDS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
      }

    case Actions.GET_FEEDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        feeds: action.feeds
      }
    default:
      return state
  }
}