import { combineReducers } from "redux"

import { windowReducer as window } from "./windowReducer"
import { feedsReducer as feeds } from './feedsReducer'
import { authUserReducer as auth } from './authUserReducers'

export const rootReducer = combineReducers({
  window,
  feeds,
  auth
})