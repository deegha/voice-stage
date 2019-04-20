import { Header, FilterTab, CommentBox } from '../../components'
import { APP_BASE_URL, APP_NAME, APP_LOG } from '../../config/config'
import { makeid, uploadImage } from '../../services/helper'
import moment from 'moment'
import { FiImage } from 'react-icons/fi'
import css from './styles.scss'

export default class FeedsView extends React.PureComponent {

  state = {
    commentText: '',
    textAreaHeight: 20,
    media: {
      url: '',
      type: null,
      file: ''
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
    const { auth:{user}, feed } = this.props

    const id = makeid(10)

    const newComment = {
      feedId: feed.id,
      id: id ,
      parent: null,
      superParent: id,
      comment: this.state.commentText,
      comments: [],
      media: {
        url: await uploadImage(this.state.media.file),
        type: this.state.media.type
      },
      createdAt: moment().unix(),
      auther: {
        displayName: user.displayName,
        id: user.id,
        photoURL: user.photoURL
      }
    }

    this.setState({replyBox:false, 
      commentText: '', media: {}})
    
    this.props.addComment(newComment)  
  }

  render() {
    const { feed, auth, comments, reply, window:{width} } = this.props
    const { commentText, textAreaHeight, media} = this.state

    const clWrapper = width<700?css.wrapperMobile:css.wrapper
    const clWriteComment = width<700?css.writeCommentMobile:css.writeComment

    return (
      <div className={css.container}>
        <Header 
          ogImage={feed.media && feed.media.url !== '' ? feed.media.url:APP_LOG}
          url={`${APP_BASE_URL}/feed?slug=${feed.id}`}
          description={feed.title !==''?`${feed.title} - ${APP_NAME}`:APP_NAME}
          title={feed.title !==''?`${feed.title} - ${APP_NAME}`:APP_NAME} />
        <div className={css.containerInner}>
          <div className={clWrapper}>
            {feed.media && feed.media.url !== '' && (
            <div className={css.featuredImage}>
              <img src={feed.media.url} />
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
                  <FiImage style={{color: '#636e72', fontSize: '20px'}} />
                </div>
              </div>

              <div className={css.replyBtn} onClick={this.addComment}>Comment</div>
            </div>    
            {media && media.url !== '' && (
              <div className={css.commentImage}>
                <img src={media.url}  />
              </div>
            )}
            {comments.map(comment => <CommentBox reply={reply} auth={auth} key={comment.id} comment={comment}/>)}
            
          </div>
        </div>
      </div>
    )
  }
}
