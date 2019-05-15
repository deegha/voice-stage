import React from 'react'
import { connect } from 'react-redux'
import { getFeeds, createFeedAction, deleteFeed } from '../actions/feedsActions'
import { loadLatestComments } from '../actions/comentsActions'
import  {LandingPageView}  from '../views/landingPageView/landingPageView'
import { signUp } from '../actions/authUserActions'

class LandingPage extends React.Component {

  componentDidMount() {
    if(this.props.feeds.feeds.length < 1) {
      this.props.getFeeds()
    }
    this.props.loadComments()
  }

  render() {

    const { deleteFeed, window, comments, signUp, auth, feeds:{feeds, loading, error, errorMessage}, createFeed } = this.props

    return (
      <LandingPageView 
        deleteFeed={deleteFeed}
        window={window}
        comments={comments} 
        signUp={signUp} 
        feeds={feeds}
        auth={auth} 
        createFeed={createFeed}/> 
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFeeds: () => dispatch(getFeeds()),
  createFeed:(feed) => dispatch(createFeedAction(feed)),
  signUp: (user, provider) => dispatch(signUp(user, provider)),
  loadComments: () => dispatch(loadLatestComments()),
  deleteFeed: (id) => dispatch(deleteFeed(id))
})

const mapStateToProps = ({feeds, auth, comments, window}) => ({
  feeds,
  auth,
  comments,
  window
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
