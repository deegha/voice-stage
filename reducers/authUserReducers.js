import * as Actions from '../actions/authUserActions'

const initialState = {
  user: {
    displayName: '',
    email: '',
    emailVerified: false,
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    numberOfPosts: 0,
    reportedCount: 0,
    reputation: 0,
    location: '',
    age: null,
    favTags: []
  },
  loading: false,
  error: false,
  errorMessage: '',
  authenticated: false
}

export const authUserReducer = (state=initialState, action) => {
  switch (action.type) {
    default: 
      return state
    case Actions.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Actions.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        authenticated: false,
        errorMessage: action.error
      }
    case Actions.AUTHENTICATE:
      return {
        ...state,
        loading: false,
        error: false,
        authenticated: true,
        errorMessage: '',
        user: action.user
      }
    case Actions.UNAUTHENTICATE:
      return initialState
  }
}

