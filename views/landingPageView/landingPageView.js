
import { Header, Feed  } from '../../components'
import { APP_NAME, APP_LOG, APP_DESCRIPTION, APP_BASE_URL } from '../../config/config'
import css  from './styles.scss'
 
export const LandingPageView = ({feeds}) => {

  return (
    <div className={css.container}>
      <Header
        title={APP_NAME}
        ogImage={APP_LOG}
        url={APP_BASE_URL}
        description={APP_DESCRIPTION} />
      <div className={css.wrapper}>
        <div className={css.wrapperInner}>
          {feeds.map(feed => <Feed key={feed.id} feed={feed} />)}
        </div>
      </div>
    </div>
  )
}