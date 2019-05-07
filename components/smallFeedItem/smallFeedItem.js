
import css from './styles.scss'
import ReactPlayer from 'react-player'
import IntersectionVisible    from 'react-intersection-visible'
import Link from 'next/link'

export class SmallFeedItem extends React.PureComponent{

  state = {
    playing: false
  }

  onHide = ( entries ) => this.setState({playing: false}) 

  onShow = ( entries ) => this.setState({playing: true})

  render() {
    const {feed, ismobile} = this.props

    const styles = {
      width: ismobile?'100%':'300px'
    }

    return (
      <div className={css.container} style={styles}>
        <div className={css.imageArea}>
          {feed.media && feed.media.url !== '' && feed.media.type == 1 && (
              <Link href={`feed?slug=${feed.id}`}>
                <a>
                  <div className={css.containerMedia} style={{backgroundImage: `url(${feed.media.url})`}}>
                    {/* <img src={feed.media.url} /> */}
                  </div>
                </a>
              </Link>
            )}
             {feed.media &&  feed.media.url !== '' && feed.media.type == 2 && (
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

            
        </div>
        <div className={css.detailArea}>
        
        {feed.title && (
          <Link href={`feed?slug=${feed.id}`}>
          <a>
            <h1>{feed.title}</h1>
          </a>
        </Link>
        )}
        </div>
      </div>
    )
  }
}