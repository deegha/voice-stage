
import {  Feed, Header, TopComments  } from '../../components'
import { APP_NAME, APP_LOG, APP_DESCRIPTION, APP_BASE_URL } from '../../config/config'
import css  from './styles.scss'

import { CreateFeedForm } from './createFeedForm'
export class LandingPageView extends React.Component {

  render () {
    const { window, feeds, auth, createFeed, signUp, comments:{comments, error} } = this.props

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
            window={window}
            signUp={signUp} 
            auth={auth} 
            createFeed={createFeed}/>
          <div className={ics}>
            <div className={css.wrapperInner}>
              {feeds.map(feed => <Feed authUserId={auth.user.id} key={feed.id} feed={feed} />)}
            </div>
            <div className={css.wrapperInnerRght}>
              <div className={css.topCommentSection}>
                {comments.map(comment => <TopComments comment={comment} key={comment.id} />)}
              </div>
              
            </div>
          </div>  
        </div>
      </div>
    )
  }
}