import { connect } from 'react-redux'
import Router from 'next/router'
import ProfileView from '../views/profile/ProfileView'
import { getUser, getUserPosts } from '../services/backendClient'

class Profile extends React.Component {

  static async getInitialProps({query}) {
    const profile = query.slug
    const user = await getUser(profile)
    return {profile, user}
  }

  state = {
    posts: {
      hasdata: false,
      loading: false,
      feeds: []
    }
  }

  async componentDidMount() {
    this.setState({posts: {
      loading: true,
      hasdata: false,
      feeds: []
    }})
    try {
      const feeds = await getUserPosts(this.props.profile)
      this.setState({posts: {
        loading: false,
        hasdata: true,
        feeds
      }})
    }catch(err) {
      this.setState({posts: {
        loading: false,
        hasdata: false,
        feeds: []
      }})
      console.log("Error in fetching user posts")
    }
  }

  state = {
    user: {}
  }

  render() {
    const { user, auth } = this.props
    const { posts} = this.state

    return (
      <ProfileView user={user} posts={posts} auth={auth} />
    )
  }
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(Profile)