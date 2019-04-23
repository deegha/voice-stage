import css from './styles.scss'
import { Header } from '../../components'
import { APP_NAME, APP_LOG, APP_BASE_URL, APP_DESCRIPTION } from '../../config/config'

const ProfileView = ({auth: {user}}) => {
  console.log(user)
  return (
    <div className={css.container}>
      <Header
          title={APP_NAME}
          ogImage={APP_LOG}
          url={APP_BASE_URL}
          description={APP_DESCRIPTION} />
      <div className={css.wrapper}> 
        <div className={css.detailswrapper}>
          <div className={css.avatar}>
            <img src={user.photoURL} />
          </div>
          <div className={css.details}>
            <h1>
              {user.displayName}
            </h1>
            |
            <p> 100 follower</p>
            |
            <p> 40 reputaion</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProfileView