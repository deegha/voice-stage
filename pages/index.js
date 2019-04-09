import React from 'react'
import { connect } from 'react-redux'
import { getFeeds, createFeed } from '../actions/feedsActions'
import  {LandingPageView}  from '../views/landingPageView/landingPageView'
import { signUp } from '../actions/authUserActions'

class LandingPage extends React.Component {

  // componentDidMount() {
  //   this.props.getFeeds()
  // }

  render() {

    const { signUp, auth, feeds:{feeds, loading, error, errorMessage}, createFeed } = this.props
    return (
      <LandingPageView signUp={signUp} feeds={feeds} auth={auth} createFeed={createFeed}/> 
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFeeds: () => dispatch(getFeeds()),
  createFeed:(feed) => dispatch(createFeed(feed)),
  signUp: (user, provider) => dispatch(signUp(user, provider))
})

const mapStateToProps = ({feeds, auth}) => ({
  feeds,
  auth
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
