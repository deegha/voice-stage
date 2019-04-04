export const SET_WINDOW_DIM = 'SET_WINDOW_DIM'
export const REMOVE_WINDWO_DIM = 'REMOVE_WINDWO_DIM'

export const setWindowDimentions = ({width, height}) =>({
  type: SET_WINDOW_DIM,
  width,
  height
})