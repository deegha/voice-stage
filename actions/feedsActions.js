
import { fetchFeeds, createNewFeed } from '../services/backendClient' 

export const GET_FEEDS_REQUEST = 'GET_FEEDS_REQUEST'
export const GET_FEEDS_SUCCESS = 'GET_FEEDS_SUCCESS'
export const GET_FEEDS_FAIL = 'GET_FEEDS_FAIL'

export const getFeedsRequest = () => ({
  type: GET_FEEDS_REQUEST
})

export const getFeedsFail = (error) => ({
  type: GET_FEEDS_FAIL,
  error
})

export const getFeedsSuccess = (feeds) => ({
  type: GET_FEEDS_SUCCESS,
  feeds
})

export const getFeeds = () => async (dispatch) => {

  dispatch(getFeedsRequest())
  try  {
    const feeds = await fetchFeeds()
    dispatch(getFeedsSuccess(feeds))
  }catch (err) {
    console.log(err, 'error in fetching feeds')
    dispatch(getFeedsFail(err))
  }
}

export const CREAET_FEED_REQUEST = 'CREAET_FEEDS_REQUEST'
export const CREAET_FEED_SUCCESS = 'CREAET_FEEDS_SUCCESS'
export const CREAET_FEED_FAIL = 'CREAET_FEEDS_FAIL'
export const ADD_FEED_TO_STATE = 'ADD_FEED_TO_STATE'

export const createFeedRequest = () => ({
  type: CREAET_FEED_REQUEST
})

export const createFeedFail = (error) => ({
  type: CREAET_FEED_FAIL,
  error
})

export const createFeedSuccess = (feeds) => ({
  type: CREAET_FEED_SUCCESS,
  feeds
})

export const addFeedToState = (feed) => ({
  type: ADD_FEED_TO_STATE,
  feed
})

export const createFeed = (feed) => async (dispatch) => {

  console.log(feed, "create feed")

  dispatch(createFeedRequest())
  dispatch(addFeedToState(feed))

  try {
    createNewFeed(feed)
  }catch(error) {
    console.log(error)
    dispatch(createFeedFail(error))
  }  
  dispatch(createFeedSuccess())
}