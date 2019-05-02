import * as Actions from '../actions/windowActions'

const initialState = {
  width: 800,
  height: 0,
  isMobile: false
}

export const windowReducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state
    case Actions.SET_WINDOW_DIM:
      return {
        ...state,
        width: action.width,
        height: action.height,
        isMobile: action.width<900?true:false,
      }
  }
}
