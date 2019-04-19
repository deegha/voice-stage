
import {  Feed, Header  } from '../../components'
import { APP_NAME, APP_LOG, APP_DESCRIPTION, APP_BASE_URL } from '../../config/config'
import css  from './styles.scss'

import { CreateFeedForm } from './createFeedForm'
export class LandingPageView extends React.Component {

  

  render () {
    const { feeds, auth, createFeed, signUp } = this.props
    return (
      <div className={css.container}>
        <Header
          title={APP_NAME}
          ogImage={APP_LOG}
          url={APP_BASE_URL}
          description={APP_DESCRIPTION} />
        <div className={css.wrapper}>
          <CreateFeedForm 
            signUp={signUp} 
            auth={auth} 
            createFeed={createFeed}/>
          <div className={css.wrapperInner}>
            {feeds.map(feed => <Feed authUserId={auth.user.id} key={feed.id} feed={feed} />)}
          </div>
        </div>
      </div>
    )
  }
}