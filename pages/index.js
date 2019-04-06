import React from 'react'
import { connect } from 'react-redux'
import { getFeeds, createFeed } from '../actions/feedsActions'
import  {LandingPageView}  from '../views/landingPageView/landingPageView'

class LandingPage extends React.Component {

  componentDidMount() {
    this.props.getFeeds()
  }

  render() {

    const { auth, feeds:{feeds, loading, error, errorMessage}, createFeed } = this.props
    return (
      <LandingPageView feeds={feeds} auth={auth} createFeed={createFeed}/> 
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFeeds: () => dispatch(getFeeds()),
  createFeed:(feed) => dispatch(createFeed(feed))
})

const mapStateToProps = ({feeds, auth}) => ({
  feeds,
  auth
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
