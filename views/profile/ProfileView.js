import css from './styles.scss'
import { Header, Feed } from '../../components'
import { APP_NAME, APP_LOG, APP_BASE_URL, APP_DESCRIPTION } from '../../config/config'

const ProfileView = ({user, posts, auth}) => {
  console.log(posts)
  return (
    <div className={css.container}>
      <Header
          title={`${user.displayName} | ${APP_NAME}`}
          ogImage={user.photoURL}
          url={`${APP_BASE_URL}/profile?slug=${user.id}`}
          description={APP_DESCRIPTION} />
      <div className={css.wrapper}> 
        {user && user.id && (
          <div className={css.detailswrapper}>
          <div className={css.avatar}>
            <img src={user.photoURL} />
          </div>
          <div className={css.details}>
            <h1>
              {user.displayName}
            </h1>
            {posts && (
              <React.Fragment>
              <span>|</span>
              <p>{posts.feeds.length} posts</p>
              </React.Fragment>
            )}
            |
            <p> {user.reputation} reputaion</p>
          </div>
          
        </div>
        )}
      </div>
      <div className={css.feedWrapper}>
        <div className={css.feedInnerWrapper}>
        {posts && posts.hasdata && (
            posts.feeds.map(feed => (
              <Feed authUserId={auth.user.id} key={feed.id} feed={feed} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileView