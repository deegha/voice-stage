import * as Actions from '../actions/comentsActions'

const initialState = {
  loading: false,
  error: false,
  hasContent: false,
  comments: []
}

export const commentReducer = (state=initialState, action) => {

  switch(action.type) {
    case Actions.LOAD_LATEST_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Actions.LOAD_LATEST_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        hasContent: false
      }
    case Actions.LOAD_LATEST_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasContent: true,
        error: false,
        comments: action.comments
      }
    default:
      return state
  }
} 