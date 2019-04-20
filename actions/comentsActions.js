import { getLatestComments } from '../services/backendClient'

export const LOAD_LATEST_COMMENTS_REQUEST = 'LOAD_LATEST_COMMENTS_REQUEST'
export const LOAD_LATEST_COMMENTS_FAIL = 'LOAD_LATEST_COMMENTS_FAIL'
export const LOAD_LATEST_COMMENTS_SUCCESS = 'LOAD_LATEST_COMMENTS_SUCCESS'

const loadLatestCommentsRequest = () => ({
  type: LOAD_LATEST_COMMENTS_REQUEST
})

const loadLatestCommentsFail = () => ({
  type: LOAD_LATEST_COMMENTS_FAIL
})

const loadLatestCommentsSuccess = (comments) => ({
  type: LOAD_LATEST_COMMENTS_SUCCESS,
  comments
})

export const loadLatestComments = () => async (dispatch) => {
  dispatch(loadLatestCommentsRequest())

  try {
    const comments = await getLatestComments()
    dispatch(loadLatestCommentsSuccess(comments))
    
  }catch(err ){
    console.log(err )
    dispatch(loadLatestCommentsFail())
  }
}