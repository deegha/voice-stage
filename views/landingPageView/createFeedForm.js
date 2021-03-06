import css  from './styles.scss'
import { FiImage } from 'react-icons/fi'

import {tags} from '../../components/tags'
import { FilterTab } from '../../components'
import { POST_STATUS }  from '../../config/config'
import moment from 'moment'
import { makeid, uploadImage } from '../../services/helper'
import ReactPlayer from 'react-player'
export class CreateFeedForm extends React.Component {

  state = {
    title: '',
    text: '',
    textAreaHeight: 20,
    maxCharactorLenght: false,
    openText: false,
    step: 1,
    selectedTags: [],
    showLogin: false,
    media: {
      url: '',
      type: null
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
      title: '',
      text: '',
      textAreaHeight: 20,
      maxCharactorLenght: false,
      step: 1,
      selectedTags: [],
      showLogin: false,
      openText: false,
      media: {
        url: '',
        type: null,
        file: ''
      }
    })
  }

  changeHeight = () => {
    const chars_per_row = 100;
    const pixles_per_row = 40;
  
    const height = Math.round((this.state.title.length / chars_per_row) * pixles_per_row)
    if(height > 20) {
      this.setState({textAreaHeight:height})
    }else {
      this.setState({textAreaHeight:20})
    }
  }

  handleTitleChange = (e) => { 
 
    if(e.target.value.length > 100) {
      this.setState({maxCharactorLenght: true})
    }else {
      this.setState({title: e.target.value, maxCharactorLenght: false}, this.changeHeight())
    } 
  }

  handleTextChange = (e) => {
    if(e.target.value.length > 400) {
      this.setState({textMaxCharactorLenght: true})
    }else {
      this.setState({text: e.target.value, textMaxCharactorLenght: false})
    } 
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
        this.props.openLoginModal()
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

  onMainTextFocus = () => {
    this.setState({openText: true})
  }

  render() {

    const { openText, textAreaHeight, maxCharactorLenght, title, text, selectedTags, media, showLogin,imageUloading }  = this.state
    const { window:{width} } = this.props

    const hasContent = (title.length > 0 || media.url !== '')
    const outerCls = openText ?[css.createFormOuter,css.boxBorder].join(' '): css.createFormOuter

    const extraStyles = width < 900? {width: '100%'}:{}
    return (
      <div className={outerCls} style={extraStyles}>
     
        <div className={css.createFeedConainer}>
          <div className={css.textAreaWrapper}>
          <textarea 
            onFocus={this.onMainTextFocus}
            value={title}
            onChange={this.handleTitleChange}
            style={{height: textAreaHeight}} placeholder={'Stage your voice. . .'} />

           <div className={css.option}>
            <input type="file" onChange={this.handleFileChange} />
            <FiImage style={{color: '#636e72', fontSize: '20px', zIndex: '1'}} />
          </div>
          </div>
          {imageUloading? (
            <div className={css.posting}>Posting</div>
          ): (
            <div className={css.buttonArea} onClick={this.startDiscussion}>
            <div className={!hasContent?css.buttonCreateDis:css.buttonCreate}>
            {!hasContent?'...':'Post'}</div>
          </div>
          )}
         
        </div>

        <div className={css.optionsBar}>
          {media.url !== '' && media.type === 1 && (
            <div className={css.feedImage}>
              <img src={media.url} />
            </div>
          )}

          {media.url !== '' && media.type === 2 && (
            <div className={css.feedImage}>
              <ReactPlayer url={media.url} playing />
            </div>
          )}
          {openText && (
            <div className={css.optionsBarTags}>
            <div>#addATag:</div>
            {tags.map( tag => (
              <FilterTab 
                key={tag.tagKey}
                callback={this.selectTag}
                selected={selectedTags.indexOf(tag.tagKey) != -1? true: false}
                prop={tag.tagKey}
                title={tag.tag} />
            ) )}
            </div>
          ) } 
         
          <div>

          </div>
        </div>

        {openText && (
          <div className={css.secondForm}>
            <textarea 
              value={text}
              onChange={this.handleTextChange}
              placeholder={'Say more about it here. . .'} />
            <div className={css.actionsArea}>
              <div></div>
            </div>
          </div>
        )}
        
       
      </div>
    )
  }
}

