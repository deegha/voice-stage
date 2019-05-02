
import {  Feed, Header, TopComments, Modal, GoogleBtn, FacebookBtn  } from '../../components'
import { APP_NAME, APP_LOG, APP_DESCRIPTION, APP_BASE_URL } from '../../config/config'
import css  from './styles.scss'

import { CreateFeedForm } from './createFeedForm'
export class LandingPageView extends React.Component {

  state = {
    showLogin: false,
  }

  componentDidUpdate (preState) {
    const { authenticated } = this.props.auth
    if( authenticated && this.state.showLogin ) {
      this.setState({showLogin: false})
    }
  }

  openLoginModal = () => {
    this.setState({showLogin: true})
  } 

  closeLoginModal = () => {
    this.setState({showLogin: false})
  } 

  render () {
    const { deleteFeed, window, feeds, auth, createFeed, signUp, comments:{comments, error} } = this.props

    let ics = css.containerInner

    if(window.width < 1150) {
      ics = css.containerInnerSS
    }

    if(window.isMobile) {
      ics = css.containerInnerMobile
    }

    return (
      <div className={css.container}>
        <Header
          title={APP_NAME}
          ogImage={APP_LOG}
          url={APP_BASE_URL}
          description={APP_DESCRIPTION} />
        <div className={css.wrapper}>
          <CreateFeedForm 
            openLoginModal={this.openLoginModal}
            window={window}
            signUp={signUp} 
            auth={auth} 
            createFeed={createFeed}/>
          <div className={ics}>
            <div className={css.wrapperInner}>
              {feeds.map(feed => <Feed openLoginModal={this.openLoginModal} deleteFeed={deleteFeed} authUserId={auth.user.id} auth={auth} key={feed.id} feed={feed} />)}
            </div>
            <div className={css.wrapperInnerRght}>
              <div className={css.topCommentSection}>
                {comments.map(comment => <TopComments comment={comment} key={comment.id} />)}
              </div>
              
            </div>
          </div>  
        </div>

         <Modal visible={this.state.showLogin}>
          <div className={css.loginContainer}>
            <h3>Login in to continue</h3>
            <FacebookBtn signUp={this.props.signUp} />
            <GoogleBtn signUp={this.props.signUp}/>
            <div className={css.closeBtn} onClick={this.closeLoginModal}>Close</div>
          </div>
        </Modal>
      </div>
    )
  }
}