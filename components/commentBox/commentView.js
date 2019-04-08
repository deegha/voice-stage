import { FiImage } from 'react-icons/fi'
import { CommentBox } from './commentBox'
import { makeid, uploadImage } from '../../services/helper'
import css from './styles.scss'

export class CommentView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
      textAreaHeight: 20,
      replyBox: false
    }
  }

  handleTitleChange = (e) => {
    this.setState({commentText: e.target.value})
  }

  setReplyBox = () => {
    this.setState({replyBox:true})
  }

  reply = () => {
    const { auth:{user} } = this.props
    
    const reply = {
      id: makeid(10),
      parent: this.props.comment.id,
      superParent: this.props.comment.superParent,
      comment: this.state.commentText,
      comments: [],
      auther: {
        displayName: user.displayName,
        id: user.id,
        photoURL: user.photoURL
      }
    }

    this.props.reply(reply)
    this.setState({replyBox:false, commentText: ''})
  }

  render () {
    const { comment, auth, reply } = this.props
    const { commentText, replyBox } = this.state
  
    const writeCommentCls = replyBox?[css.activeClass,css.writeComment].join(' '):css.writeComment

    const styleViewCat =  comment.parent === null?{borderLeft:'none'}:{borderLeft:'1px solid #ced6e0', marginLeft: '2px'} 
    return (
      <div className={css.commentView} style={styleViewCat}>
        <div>
          <div className={css.commentAuther}>
            <div style={{background: `url(${comment.auther.photoURL})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}} className={css.commentAutherImg} />
            <div className={css.commentName}>{comment.auther.displayName}</div>         
          </div>     
          <p>{comment.comment}</p>
          {comment.media && comment.media.url !== '' && (
            <div className={css.commentImage}>
              <img src={comment.media.url} />
            </div>
          )}
          {!replyBox && (
            <div>
              <div className={css.replyBtn} onClick={this.setReplyBox}>reply</div>
            </div>
          )}
        </div>
        {replyBox && (
          <div className={writeCommentCls}>
            <div className={css.textAreaWrapper}>
              <textarea 
                value={commentText}
                onChange={this.handleTitleChange}
                style={{height: 20}} 
                placeholder={'how do you feel about it'} />
    
              <div className={css.optionsArea}>
                <input type="file" onChange />
                <FiImage style={{color: '#636e72', fontSize: '20px'}} />
              </div>
            </div>

            <div className={css.replyBtn} onClick={this.reply}>reply</div>
          </div>
        )}
       
        {comment.comments.length > 0 && comment.comments.map(comment =>  <CommentBox auth={auth} reply={reply} key={comment.id} comment={comment}/>)}
      </div>
    )
  }
}
