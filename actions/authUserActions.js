import { userObj } from '../modals/userModal'
import { createUser } from '../services/backendClient'  
export const AUTHENTICATE = 'AUTHENTICATE'
export const UNAUTHENTICATE = 'UNAUTHENTICATE'

export const login = (user) => ({
  type: AUTHENTICATE,
  user
})

export const logOut = () => ({
  type: UNAUTHENTICATE
})

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'

const signUpRequest = () => ({
  type: SIGNUP_REQUEST
})

const signUpFail = (error) => ({
  type: SIGNUP_FAIL,
  error
})

export const signUp = (user, provider) => async (dispatch) => {
  dispatch(signUpRequest(provider))

  userObj.displayName= user.displayName
  userObj.email= user.email
  userObj.emailVerified = user.emailVerified
  userObj.phoneNumber = user.phoneNumber
  userObj.photoURL = user.photoURL
  userObj.providerId = user.providerId

  try {
    const createdUser = await createUser(userObj)
    dispatch(login(createdUser))
  }catch(err) {
    dispatch(signUpFail(error))
  }
} 