import React from 'react'
import { connect } from 'react-redux'
import { getFeeds } from '../actions/feedsActions'
import  {LandingPageView}  from '../views/landingPageView/landingPageView'

class LandingPage extends React.Component {

  componentDidMount() {
    this.props.getFeeds()
  }

  render() {

    const { feeds:{feeds, loading, error, errorMessage} } = this.props
    console.log(feeds)
    return (
      <LandingPageView feeds={feeds} /> 
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFeeds: () => dispatch(getFeeds())
})

const mapStateToProps = ({feeds}) => ({
  feeds
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
