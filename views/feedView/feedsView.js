import { Header, FilterTab, CommentBox, Modal, GoogleBtn, FacebookBtn, SmallFeedItem  } from '../../components'
import { APP_BASE_URL, APP_NAME, APP_LOG } from '../../config/config'
import { makeid, uploadImage } from '../../services/helper'
import moment from 'moment'
import { FiImage } from 'react-icons/fi'
import css from './styles.scss'


import ReactPlayer from 'react-player'
import IntersectionVisible    from 'react-intersection-visible'

export default class FeedsView extends React.PureComponent {

  state = {
    commentText: '',
    showLogin: false,
    textAreaHeight: 20,
    media: {
      url: '',
      type: null,
      file: ''
    }
  }

  componentDidUpdate (preState) {
    const { authenticated } = this.props.auth
    if( authenticated && this.state.showLogin ) {
      this.setState({showLogin: false})
    }
  }

  handleTitleChange = (e) => {
    this.setState({commentText: e.target.value})
  }

  
  handleFileChange = (event) => {
    const file = event.target.files[0]
    const url = event.target.files.length > 0 ?URL.createObjectURL(event.target.files[0]): ""
    this.setState(preState=> ({
      ...preState,
      media: {
        url,
        type: 1,
        file
      }
    }))
  }

  addComment = async () => {
    const { auth:{user, authenticated}, feed } = this.props

    if(!authenticated) {
      this.openLoginModal() 
    }else {
      const id = makeid(10)

      const newComment = {
        feedId: feed.id,
        id: id ,
        parent: null,
        superParent: id,
        comment: this.state.commentText,
        comments: [],
        media: {
          url: this.state.media.file !== '' ? await uploadImage(this.state.media.file): '',
          type: this.state.media.file !== '' ?this.state.media.type:''
        },
        createdAt: moment().unix(),
        auther: {
          email: user.email,
          displayName: user.displayName,
          id: user.id,
          photoURL: user.photoURL
        }
      }
  
      this.setState({replyBox:false, 
        commentText: '', media: {}})
      
      this.props.addComment(newComment)
    }  
  }

  openLoginModal = () => {
    this.setState({showLogin: true})
  } 

  closeLoginModal = () => {
    this.setState({showLogin: false})
  } 

  render() {
    const { feed, auth, comments, reply, window:{width}, feeds } = this.props
    const { commentText, textAreaHeight, media} = this.state
    console.log(width)
    const clWrapper = width<700?css.wrapperMobile:css.wrapper
    const sideCls = width<700?css.sideMobile:css.side
    const clWriteComment = width<700?css.writeCommentMobile:css.writeComment
    const ismobile=width<700
    const styles = {
      flexDirection: width<700?'column':'row'
    }

    return (
      <div className={css.container}>
        <Header 
          ogImage={feed.media && feed.media.url !== '' ? feed.media.url:APP_LOG}
          url={`${APP_BASE_URL}/feed?slug=${feed.id}`}
          description={`find more fun content on ${APP_NAME}`}
          title={feed.title !==''?`${feed.title} - ${APP_NAME}`:APP_NAME} />
        <div className={css.containerInner} style={styles} >
          <div className={clWrapper}>
            {feed.media && feed.media.url !== '' && feed.media.type == 1 && (
            <div className={css.featuredImage}>
              <img src={feed.media.url} />
            </div>  
            )}
            {feed.media.url !== '' && feed.media.type == 2 && (
              <div className={css.containerMediaVideo}>
                <ReactPlayer 
                  playing
                  controls={true} 
                  url={feed.media.url} 
                  width={'100%'} />
              </div>
            )}
            <h1>{feed.title}</h1>
            {feed.text !== '' && (
              <p>{feed.text}</p>
            )}
          
            { feed.tags && feed.tags.length > 0 && (
              <div className={css.tagContainer}>
               {feed.tags.map(tag => (
                  <div className={css.tag} key={tag}>
                    <FilterTab title={tag} readOnly={true}/>
                    <div  className={css.hasTag}> {`#${tag}`}</div>
                  </div>
                ))}   
              </div>
            )}


            <div className={clWriteComment}>
              <div className={css.textAreaWrapper}>
                <textarea 
                  value={commentText}
                  onChange={this.handleTitleChange}
                  style={{height: textAreaHeight}} 
                  placeholder={'how do you feel about it'} />
      
                <div className={css.optionsArea}>
                  <input type="file" onChange={this.handleFileChange} />
                  <FiImage style={{color: '#636e72', fontSize: '26px'}} />
                </div>
              </div>

              <div className={css.replyBtn} onClick={this.addComment}>Comment</div>
            </div>    
            {media && media.url !== '' && (
              <div className={css.commentImage}>
                <img src={media.url}  />
              </div>
            )}
             
            {comments.map(comment => <CommentBox 
                                      width={width}
                                      reply={reply} 
                                      auth={auth} 
                                      key={comment.id} 
                                      comment={comment}/>)}
            
          </div>
          <div className={sideCls}>

          </div>

        </div>
        <div className={css.footer}>
          {feeds.map(feed => <SmallFeedItem key={feed.id} feed={feed} ismobile={ismobile} />)}
        </div>       
         <Modal visible={this.state.showLogin}>
          <div className={css.loginContainer}>
            <h3>Login in to continue</h3>
            <FacebookBtn signUp={this.props.signUp} />
            <GoogleBtn signUp={this.props.signUp}/>
            <div className={css.closeBtn} onClick={this.closeLoginModal}>Close</div>
          </div>
        </Modal>
      </div>
    )
  }
}
