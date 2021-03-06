import { FiImage } from 'react-icons/fi'
import { CommentBox } from './commentBox'
import { makeid, uploadImage } from '../../services/helper'
import { MdCancel } from 'react-icons/md'
import css from './styles.scss'
import moment from 'moment'

export class CommentView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: '',
      textAreaHeight: 20,
      replyBox: false,
      media: {
        url: "",
        type: 1,
        file: ""
      }
    }
  } 

  componentDidMount()  {
    if (document) {
      this.quill = require('react-quill')
    }
  }

  showlogin = () => {
    console.log('login')
  }

  handleTitleChange = (value) => {
    this.setState({commentText: value})
  }

  setReplyBox = () => {
    this.setState({replyBox:true})
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]
    const url = event.target.files.length > 0 ?URL.createObjectURL(event.target.files[0]): ""
    this.setState(preState=> ({
      ...preState,
      media:{
        url,
        type: 1,
        file
      }
    }))
  }

  reply = async () => {
    const { auth:{user, authenticated} } = this.props
     
    if(!authenticated) {
      this.showlogin()
    }else {

      if( this.state.commentText !== '' ||  this.state.media.file !== '') {
        const reply = {
          id: makeid(10),
          parent: this.props.comment.id,
          superParent: this.props.comment.superParent,
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
    
        this.props.reply(reply)
        this.setState({replyBox:false, commentText: '', media: {
          url: "",
          type: 1,
          file: ""
        }})
      }
    } 
  }

  removeMedia = () => {
    this.setState({media: {
      url: '',
      type: null,
      file: ''
    }})
  }

  render () {
    const { comment, auth, reply, width } = this.props
    const { commentText, replyBox, media } = this.state
  
    const writeCommentCls = replyBox?[css.activeClass,css.writeComment].join(' '):css.writeComment

    const styleViewCat =  comment.parent === null?{borderLeft:'none'}:{borderLeft:'1px solid #ced6e0', marginLeft: '2px'} 

    const replyBoxWidth= width<700? '90%': '100%'
    const Quill = this.quill
    return (
      <div className={css.commentView} style={styleViewCat}>
        <div>
          <div className={css.commentAuther}>
            <div style={{background: `url(${comment.auther.photoURL})`, backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'}} className={css.commentAutherImg} />
            <div className={css.commentName}>
              <strong>
              {comment.auther.displayName} 
              </strong>
              {` | `} 
              {moment.unix(comment.createdAt).fromNow()}</div>         
          </div>     

          <p className={css.comment}>
          <div dangerouslySetInnerHTML={{__html: comment.comment}} /></p>

          {comment.media && comment.media.url !== '' && (
            <div className={css.commentImage}>
              <img src={comment.media.url} />
            </div>
          )}

           {media && media.url !== '' && (
            <div className={css.commentImage}>
              <img src={media.url} />
              <MdCancel style={{color: '#e74c3c', fontSize: '20px', zIndex: '1'}} onClick={this.removeMedia} />
            </div>
          )}
          {!replyBox && (
            <div>
              <div className={css.replyBtn} onClick={this.setReplyBox}>reply</div>
            </div>
          )}
        </div>
        {replyBox && (
          <div className={writeCommentCls} style={{width:replyBoxWidth}}>
            <div className={css.textAreaWrapper}>
              <div className={css.editorWrapper}>
              {Quill ? (
                <Quill
                placeholder={"how do you feel about it"}
                className={css.editor}
                onChange={this.handleTitleChange}
                value={commentText} />
                  ):(<div />)}
              </div>
    
           
            </div>
            <div className={css.optionsArea}>
              <div  className={css.imageUpload}>
                <input type="file" onChange={this.handleFileChange} />
                <FiImage style={{color: '#636e72', fontSize: '25px'}} />
              </div>
              <div className={css.replyBtn} onClick={this.reply}>reply</div>
            </div>
          
          </div>
        )}
       
        {comment.comments.length > 0 && comment.comments.map(comment =>  <CommentBox auth={auth} reply={reply} key={comment.id} comment={comment}/>)}
      </div>
    )
  }
}
