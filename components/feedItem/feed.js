import { ReactDOM } from 'react'
import css from './styles.scss'
import { IoMdShare, IoIosHeart, IoIosHeartEmpty,  } from 'react-icons/io'
import { MdComment } from 'react-icons/md'
import { FilterTab, LikeBtn } from '../../components'
import { APP_BASE_URL } from '../../config/config'
import Link from 'next/link'
import moment from 'moment'
import ReactPlayer from 'react-player'
import IntersectionVisible    from 'react-intersection-visible'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, } from 'react-share'
export class Feed extends React.PureComponent {

  state = {
    menuOpen: false,
    playing: false
  }

  onHide = ( entries ) => this.setState({playing: false}) 

  onShow = ( entries ) => this.setState({playing: true})

  delelteThisFeed = (id) => () => {
    this.props.deleteFeed(id)
  }

  toggleMenu = () => this.setState(pre => ({menuOpen: !pre.menuOpen}))

  render() {
    const { feed, authUserId } = this.props
    const { menuOpen, playing } = this.state
    const liked = feed.likes.filter(like =>  like.id === authUserId)
    const isPostOwner = authUserId == feed.auther.id
    const menu = menuOpen? css.openMenu: css.closeMenu

    return (
      <div className={css.container} key={feed.id} id={feed.id} ref={(el) => this.yourElement = el}>
       
        
        <div className={css.containerDetails}>
          {/* <div className={css.imageWrapper} >
            <div className={css.proImage} 
              style={{background: `url(${feed.auther.photoURL})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}} />
          </div> */}
          <div className={css.detailWrapper}>
              <div className={css.feedHeader}>
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
                <div className={css.menuArea} onClick={this.toggleMenu}>
                  <div className={css.menuDot} />
                  <div className={css.menuDot} />
                  <div className={css.menuDot} />
                </div>
            
                  <div className={menu}>
                    <ul>
                      <li >report</li>
                      {isPostOwner && (<li onClick={this.delelteThisFeed(feed.id)} >delete</li>)}
                    </ul>
                  </div>

              </div>
              
           
            {feed.title && (
              <Link href={`feed?slug=${feed.id}`}>
              <a>
                <h1>{feed.title}</h1>
              </a>
            </Link>
            )}
            {feed.media.url !== '' && feed.media.type == 1 && (
              <Link href={`feed?slug=${feed.id}`}>
                <a>
                  <div className={css.containerMedia} style={{backgroundImage: `url(${feed.media.url})`}}>
                    {/* <img src={feed.media.url} /> */}
                  </div>
                </a>
              </Link>
            )}
             {feed.media.url !== '' && feed.media.type == 2 && (
              <Link href={`feed?slug=${feed.id}`}>
                <a>
                <span className={css.videoPostHandler}>watch</span>
                <IntersectionVisible 
                    onHide={ e => this.onHide( e ) }
                    onShow={ e => this.onShow( e ) }>
                    <div className={css.containerMediaVideo}>
                      <ReactPlayer 
                        muted
                        playing={playing}
                        controls={true} 
                        url={feed.media.url} 
                        width={'100%'} />
                    </div>
                  </IntersectionVisible>
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
