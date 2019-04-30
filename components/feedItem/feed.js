import css from './styles.scss'
import { IoMdShare, IoIosHeart, IoIosHeartEmpty,  } from 'react-icons/io'
import { MdComment } from 'react-icons/md'
import { FilterTab, LikeBtn } from '../../components'
import { APP_BASE_URL } from '../../config/config'
import Link from 'next/link'
import moment from 'moment'

import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, } from 'react-share'
export class Feed extends React.PureComponent {

  render() {

    const { feed, authUserId } = this.props
    
    const liked = feed.likes.filter(like =>  like.id === authUserId)
    console.log( liked !== undefined && liked.length > 0 && liked[0].likeId, "feed")
    return (
      <div className={css.container} key={feed.id}>
       
        
        <div className={css.containerDetails}>
          {/* <div className={css.imageWrapper} >
            <div className={css.proImage} 
              style={{background: `url(${feed.auther.photoURL})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}} />
          </div> */}
          <div className={css.detailWrapper}>
           
              <div className={css.auther}>
              
                by  
                <h2>
                  <Link href={`/profile?slug=${feed.auther.id}`}>
                    <a>{feed.auther.displayName} </a>
                  </Link>
                </h2> 
                <Link href={`/profile?slug=${feed.auther.id}`}>
                  <a>
                  <img src={feed.auther.photoURL} className={css.proImage} /> 
                  </a>
                </Link>
                
                <span className={css.sepereator}>|</span> 
                {moment.unix(feed.createdAt).fromNow()}
              
              </div>
           
            {feed.title && (
              <Link href={`feed?slug=${feed.id}`}>
              <a>
                <h1>{feed.title}</h1>
              </a>
            </Link>
            )}
            {feed.media.url !== '' && (
              <Link href={`feed?slug=${feed.id}`}>
                <a>
                  <div className={css.containerMedia}>
                    <img src={feed.media.url} />
                  </div>
                </a>
              </Link>
            )}
            {feed.tags && feed.tags.length > 0 && (
              <div className={css.tags}>
                {feed.tags.map(tag => (
                  <div className={css.tag} key={tag}>
                    <FilterTab title={tag} readOnly={true} />
                  </div>)
                )}
              </div>
            )}  
            {feed.text !== '' && (
              <Link href={`feed?slug=${feed.id}`}>
                <a>  
                  <p className={css.feedText}>{feed.text}</p>
                </a>
              </Link>
            )}
            
            <div className={css.iconArea}>
             
              <div className={css.icon}>
                <LikeBtn 
                  likeCount={feed.likes.length} 
                  liked={liked.length>0}
                  likeId={liked !== undefined && liked.length > 0 && liked[0].likeId} 
                  feedId={feed.id} />
              </div>
              <div className={css.icon}>
                <MdComment  style={{color:'#0984e3'}}  />
                <span className={css.amount}>123</span>
              </div>
              <div className={css.icon}>
                <FacebookShareButton url={`${APP_BASE_URL}/feed?slug=${feed.id}`}>
                  <FacebookIcon size={20}  round={true}/>
                </FacebookShareButton>
              </div>
              <div className={css.icon}>
                <TwitterShareButton url={`${APP_BASE_URL}/feed?slug=${feed.id}`}>
                  <TwitterIcon size={20}  round={true}/>
                </TwitterShareButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
