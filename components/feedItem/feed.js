import css from './styles.scss'
import { IoMdShare, IoIosHeart, IoIosHeartEmpty,  } from 'react-icons/io'
import { MdComment } from 'react-icons/md'

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
              style={{background: `url(${feed.auther.image})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}} />
          </div>
          <div className={css.detailWrapper}>
            <h1>{feed.title}</h1>
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
