import { CreateFeedForm } from '../views/createFeedView/createFeedView'
import { createFeedAction, getFeeds } from '../actions/feedsActions'
import { connect } from 'react-redux'
import { signUp } from '../actions/authUserActions'

class CreateFeed extends React.Component {

  componentDidMount() {
    if(this.props.feeds.feeds.length < 1) {
      this.props.getFeeds()
    }
  }

  render() {

    const { window, auth, createFeed } = this.props
    return (
      <CreateFeedForm 
        window={window} 
        auth={auth} 
        createFeed={createFeed} />
    )
  }
}

const mapStateToProps = ({window, auth, feeds}) => ({window, auth, feeds})
const mapDispatchToProps = (dispatch) => ({
  createFeed: (feed) => dispatch(createFeedAction(feed)),
  signUp: (user, provider) => dispatch(signUp(user, provider)),
  getFeeds: () => dispatch(getFeeds())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeed)  
