import css  from './styles.scss'

export class CreateFeedForm extends React.Component {

  state = {
    title: '',
    text: '',
    textAreaHeight: 20,
    maxCharactorLenght: false,
    step: 1
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
    if(e.target.value.length > 300) {
      this.setState({textMaxCharactorLenght: true})
    }else {
      this.setState({text: e.target.value, textMaxCharactorLenght: false})
    } 
  }

  startDiscussion = () => {
    this.setState({step: 2})
  } 

  render() {

    const { textAreaHeight, maxCharactorLenght, title, step, text }  = this.state
    return (
      <div className={css.createFormOuter}>
     
        <div className={css.createFeedConainer}>
          <textarea 
            value={title}
            onChange={this.handleTitleChange}
            style={{height: textAreaHeight}} placeholder={'Stage your voice. . .'} />
          {step === 1 && (
            <div className={css.buttonArea} onClick={this.startDiscussion}>
              <div className={css.buttonCreate}>Start discussion</div>
            </div>
          )}
          
        </div>
        {step === 2 && (
          <div className={css.secondForm}>
            <textarea 
              value={text}
              onChange={this.handleTextChange}
              placeholder={'Say more about it'} />
            <div className={css.actionsArea}>
              <div></div>
            </div>
          </div>
        )}

        {maxCharactorLenght && (
          <div className={css.maxCharactorWarning}>You have reached the max charactor length</div>
        )}
      </div>
    )
  }
}