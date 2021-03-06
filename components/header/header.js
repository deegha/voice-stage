/**
 * Created by Deegha on 19/03/2019
 */
import { connect } from 'react-redux'
import { setWindowDimentions } from '../../actions/windowActions'
import { signUp, logOut } from '../../actions/authUserActions'
import { userObj } from '../../modals/userModal'
import css from './styles.scss'
import Link from 'next/link'
import propTypes from 'prop-types'
import {APP_NAME, APP_LOG} from '../../config/config'
import { Head, Nav } from '../'
import {Fire} from '../../services/firebase'
import { MdCreate, MdPlayArrow } from 'react-icons/md'
import Tooltip from 'react-tooltip-lite'
class Header extends React.PureComponent {

  state={
    isOpen: false
  }

  componentDidMount() { 
   
    if(this.props.tooltip) {
      setTimeout( this.openToolTip, 500)
    }

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
        }else {
          this.props.logOut()
        }
      })
    })
  }

  openToolTip = () => {
    this.setState({isOpen: true})
  } 
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions = () => {
    this.props.setDim({ width: window.screen.width, height: window.innerHeight })
  }

  signOut = () => {
    Fire().then(firebase => firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    }))
  }

  render () {

    const { auth, title, description, url, ogImage, rightBtn, window:{isMobile} } = this.props
    const clsLogo = isMobile? css.logoMobile :css.logo
    const { isOpen } = this.state
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
                  <img src={APP_LOG} alt={"statedee logo"} className={clsLogo}/>
                  {!isMobile && (
                  <h1 className={css.siteName}>
                    {APP_NAME}
                  </h1>
                  )}
                </a>
              </Link>
            </div>
            <div className={css.headerRight}>
              {isOpen && (
                <div className={css.createPostLable}>
                  <div className={css.createPostLableTxt}>
                    Click here to create a post
                  </div>
                  
                  <MdPlayArrow style={{
                      position:'relative',
                      left: '-13px',
                      fontSize: 40, color: '#f9ca24'}} />
                </div>
              )}
           
              <div className={css.createPost}>
                {/* <Link prefetch href="/create-feed">
                  <a>
                    <MdCreate style={{fontSize: 18}} />
                  </a>
                </Link> */}
                
                <Link prefetch href="/create-feed">
                  <a>
                    <MdCreate style={{fontSize: 18}} />
                  </a>
                </Link>
              </div>
              <Nav isMobile={isMobile} auth={auth} signOut={this.signOut} />
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
  rightBtn: propTypes.any,
  tooltip: propTypes.bool
}

const mapStateToProps = ({window, auth}) => ({
  window,
  auth
})

const mapDispatchToProps = (dispatch) => ({
  setDim: (dim) => dispatch(setWindowDimentions(dim)),
  login:(user) => dispatch(signUp(user)),
  logOut: ()=> dispatch(logOut())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header) 