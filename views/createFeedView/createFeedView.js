import css  from './styles.scss'
import { FiImage } from 'react-icons/fi'
import { MdCancel } from 'react-icons/md'
import {tags} from '../../components/tags'
import { FilterTab, Header, Modal, FacebookBtn, GoogleBtn } from '../../components'
import { POST_STATUS, APP_NAME, APP_LOG, APP_BASE_URL, APP_DESCRIPTION  }  from '../../config/config'
import Router from 'next/router'
import moment from 'moment'
import { makeid, uploadImage } from '../../services/helper'
import ReactPlayer from 'react-player'
// import ReactQuill from 'react-quill'

export class CreateFeedForm extends React.Component {

  state = {
    imageUloading: false,
    title: '',
    text: '',
    textMaxCharactorLenght: false,
    maxCharactorLenght: false,
    selectedTags: [],
    showLogin: false,
    media: {
      url: '',
      type: null,
      file: ''
    }
  }

  componentDidMount()  {
    if (document) {
      this.quill = require('react-quill')
    }
  }

  componentDidUpdate (preState) {
    const { authenticated } = this.props.auth
    if( authenticated && this.state.showLogin ) {
      this.setState({showLogin: false})
    }
  }

  setToInitialState = () => {
    this.setState({
      imageUloading: false,
      showLogin: false,
      title: '',
      text: '',
      maxCharactorLenght: false,
      selectedTags: [],
      showLogin: false,
      media: {
        url: '',
        type: null,
        file: ''
      }
    })
  }

  handleTitleChange = (e) => { 
 
    if(e.target.value.length > 100) {
      this.setState({maxCharactorLenght: true})
    }else {
      this.setState({title: e.target.value, maxCharactorLenght: false})
    } 
  }

  handleTextChange = (value) => {
    this.setState({text: value})
  }

  openLoginModal = () => {
    this.setState({showLogin: true})
  }

  handleImageUpload = async (file) => {
    try {
      this.setState({imageUloading: true})

      const url = await uploadImage(file)
      this.setState({imageUloading: false})
      
      return url
    }catch(err) {
      this.setState({imageUloading: false})
      return ''
    }
  }

  startDiscussion = async () => {
    const { auth:{user, authenticated}, createFeed } = this.props
    const { title, text,selectedTags, media } = this.state

    if(title !== '' || media.url !== '') {
      if(!authenticated) {
        this.openLoginModal()
        return false
      }

      const feed = {
        id : makeid(10),
        type: 1,
        auther: {
          id: user.id,
          photoURL: user.photoURL,
          displayName: user.displayName
        },
        media: {
          type: media.type !== null? media.type: null,
          url: media.url !== ''?await this.handleImageUpload(media.file): ''
        },
        text: text,
        title: title,
        tags: selectedTags,
        status: POST_STATUS.ACTIVE,
        createdAt: moment().unix(),
        likes: []
      }

      createFeed(feed)
      this.setToInitialState()
      Router.push("/")
    }
  } 

  selectTag = (tag)=> () => {
    const { selectedTags } = this.state
    const index = selectedTags.indexOf(tag)

    if(index != -1) {
      const tempTags = selectedTags
      tempTags.splice(index, 1)
      this.setState({selectedTags: tempTags})
    }else {

      if(selectedTags.length < 4) {
        this.setState(preState => ({
          selectedTags: [...preState.selectedTags, tag]
        }))
      }
    }
  }

  removeMedia = () => {
    this.setState(preState=> ({
      ...preState,
      media: {
        url: "",
        type: "",
        file: ''
      }
    }))
  }

  handleFileChange = (event) => {
    
    const file = event.target.files[0]
    const url = event.target.files.length > 0 ?URL.createObjectURL(event.target.files[0]): ""

    let type = 0
    if(file.type.indexOf("image") != -1) {
      type = 1
    }else if(file.type.indexOf("video") != -1)  {
      type = 2 
    }

    console.log(file)

    if(type == 1 && file.size > 10485760) {
      console.log('file too large')
      return false
    } 
    
    if(type !== 0) {
      this.setState(preState=> ({
        ...preState,
        media: {
          url,
          type: type,
          file
        }
      }))
    }
  }

  render() {

    const { title, text, selectedTags, media, imageUloading, showLogin }  = this.state
    const { window:{width} } = this.props
    const wrapper = width < 900?'wrapperMobiel': 'wrapper'
    const shareBtn = width < 900?'shareBtnMobiel': 'shareBtn'
    const Quill = this.quill

    return (
      <div className={css.container} >
         <Header
          title={`Create feed - ${APP_NAME}`}
          ogImage={APP_LOG}
          url={APP_BASE_URL}
          description={APP_DESCRIPTION} />
        <div className={css[wrapper]}>

          <div className={css.title}>
            <div className={css.textAreaWrapper}>
              <textarea 
                value={title}
                onChange={this.handleTitleChange}
                placeholder={'Set title for your story'} />
            </div>
          </div>


         {media.url !== '' ? (
            <div className={css.featureImage}>
              <img src={media.url} />
              <MdCancel style={{color: '#e74c3c', fontSize: '20px', zIndex: '1'}} onClick={this.removeMedia} />
            </div>
         ): (

          <div className={css.option}>
            <div className={css.imageUpload}>
              <input type="file" onChange={this.handleFileChange} />
              <FiImage style={{color: '#636e72', fontSize: '30px', zIndex: '1'}} />
            </div>
          </div>
         )}

          <div className={css.editorWrapper}>
            {Quill ? (
              <Quill
              placeholder={"Tell more on the story"}
              className={css.editor}
              onChange={this.handleTextChange}
              value={text} />
            ):(<div />)}
          </div>
         
          <div className={css.shareBtnWrapper}> 
            <div className={css[shareBtn]} onClick={this.startDiscussion}>Post</div>   
          </div>
        </div>

        <Modal visible={showLogin}>
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

