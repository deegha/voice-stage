import * as Actions from '../actions/feedsActions'

const initialState = {
  loading: false,
  creating: false,
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
        feeds: action.feeds.reverse()
      }
    case Actions.CREAET_FEED_REQUEST:
      return {
        ...state,
        creating: true,
       
      }
    case Actions.ADD_FEED_TO_STATE: console.log(state.feeds)
      return {
        ...state,
        feeds: [action.feed, ...state.feeds]
      }
    case Actions.CREAET_FEED_SUCCESS:
      return {
        ...state,
        creating: false
      }
    case Actions.DELETE_FEED_SUCCESS:
      return {
        ...state,
        feeds: state.feeds.filter(feed => feed.id !== action.id)
      }
    default:
      return state
  }
}