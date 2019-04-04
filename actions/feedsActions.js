
import { fetchFeeds } from '../services/backendClient' 

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