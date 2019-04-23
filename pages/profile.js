import { connect } from 'react-redux'
import Router from 'next/router'
import ProfileView from '../views/profile/ProfileView'


class Profile extends React.Component {

  componentDidMount() {
    if(!this.props.auth.authenticated) {
      Router.push("/login")
    }
  }

  render() {
    const { auth } = this.props
    return (
      <ProfileView auth={auth} />
    )
  }
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(Profile)