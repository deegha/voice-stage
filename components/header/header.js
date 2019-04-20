/**
 * Created by Deegha on 19/03/2019
 */
import { connect } from 'react-redux'
import { setWindowDimentions } from '../../actions/windowActions'
import { signUp } from '../../actions/authUserActions'
import { userObj } from '../../modals/userModal'
import css from './styles.scss'
import Link from 'next/link'
import propTypes from 'prop-types'
import {APP_NAME, APP_LOG} from '../../config/config'
import { Head, Nav } from '../'
import {Fire} from '../../services/firebase'

const logo = '../../static/logo.png'

class Header extends React.PureComponent {

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    Fire().then(firebase => {
      firebase.auth().onAuthStateChanged(user => {
   
        if(user) {
          userObj.displayName= user.displayName
          userObj.email= user.email
          userObj.emailVerified = user.emailVerified
          userObj.phoneNumber = user.phoneNumber
          userObj.photoURL = user.photoURL
          userObj.providerId = user.providerId

          this.props.login(userObj)
        }
     

        
      })
    })
    
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions = () => {
    this.props.setDim({ width: window.innerWidth, height: window.innerHeight })
  }

  render () {

    const { auth, title, description, url, ogImage, rightBtn, window:{isMobile} } = this.props
    
    return(
      <div>
        <Head 
        rightBtn={rightBtn}
        ogImage={ogImage}
        url={url}
        description={description}
        title={title} />
        <div className={css.container}>
          <div className={css.wrapper}>
            <div className={css.headerLeft}>
              <Link prefetch href="/">
                <a>
                  <img src={APP_LOG} className={css.logo}/>
                  <h1 className={css.siteName}>
                    {APP_NAME}
                  </h1>
                </a>
              </Link>
            </div>
            <div className={css.headerRight}>
              <Nav isMobile={isMobile} auth={auth} />
              {this.props.rightBtn}
            </div>
          </div>
        </div>
        <div className={css.space} />
      </div>
    )
  }
}

Header.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  url: propTypes.string,
  ogImage: propTypes.string,
  rightBtn: propTypes.any
}

const mapStateToProps = ({window, auth}) => ({
  window,
  auth
})

const mapDispatchToProps = (dispatch) => ({
  setDim: (dim) => dispatch(setWindowDimentions(dim)),
  login:(user) => dispatch(signUp(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(Header) 