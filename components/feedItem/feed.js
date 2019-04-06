import css from './styles.scss'
import { IoMdShare, IoIosHeart, IoIosHeartEmpty,  } from 'react-icons/io'
import { MdComment } from 'react-icons/md'
import { FilterTab } from '../../components'
export class Feed extends React.PureComponent {

  render() {

    const { feed } = this.props

    return (
      <div className={css.container} key={feed.id}>
        {feed.media.url !== '' && (
          <div className={css.containerMedia}>
            <img src={feed.media.url} />
          </div>
        )}
        
        <div className={css.containerDetails}>
          <div className={css.imageWrapper} >
            <div className={css.proImage} 
              style={{background: `url(${feed.auther.photoURL})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}} />
          </div>
          <div className={css.detailWrapper}>
            <h1>{feed.title}</h1>
            {feed.tags && feed.tags.length > 0 && (
              <div className={css.tags}>
                {feed.tags.map(tag => (
                  <div className={css.tag} key={tag}>
                    <FilterTab title={tag} readOnly={true} />
                  </div>)
                )}
              </div>
            )}    
            <p>{feed.text}</p>
            <div className={css.iconArea}>
             
              <div className={css.icon}>
                <IoIosHeart style={{color:'#d63031'}}/>
                <span className={css.amount}>250</span>
              </div>
              <div className={css.icon}>
                <MdComment  style={{color:'#0984e3'}}  />
                <span className={css.amount}>123</span>
              </div>
              <div className={css.icon}>
                <IoMdShare style={{color:'#0984e3'}} />
                <span className={css.amount}>12</span>
              </div>
          
            </div>
          </div>

        </div>
      </div>
    )
  }
}
