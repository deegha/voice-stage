
/**
 * Created by Deegha on 23/03/2019
 */

import css from './styles.scss'
import PropTypes from 'prop-types'
import { validateEmail } from '../../services/helper'

export class TextInput extends React.PureComponent {

  state={
    type: 'text',
    error: '',
    value: ''
  }

  componentDidMount(){
    this.setState({type: this.props.type})
  }

  componentDidUpdate(preProps) {
    if(preProps.value !== this.props.value) {
      this.setState({value: this.props.value})
    }
  }

  onUpdateText = (e) => {
    const { onChange, name } = this.props
    this.validate(e.target.value)
    onChange(name, e.target.value)
  }

  setError = (erroText) => this.setState({error: erroText})

  validate = (text) => {
    const {lable,type } = this.props

    text === ""? this.setError(lable+' field is required'): this.setError('')

    if(type === 'email') {
      !validateEmail(text)? this.setError('Enter a valid email'): this.setError('')
    }
  }

  render() {
    const { type, value,error } = this.state 
    const { placeholder } = this.props

    if(type === 'largeText') {
     return(
      <React.Fragment>
      <div className={css.inputContainer}>
        <textarea value={value} placeholder={placeholder} onChange={this.onUpdateText} />
      </div>
      <div className={css.errorConatainer}>
        {error && <span>{error}</span>}
      </div>
      </React.Fragment>
     )
    }

    return(
      <React.Fragment>
      <div className={css.inputContainer}>
        <input 
          value={value}
          placeholder={placeholder}
          type={type} 
          onChange={this.onUpdateText}  />
      </div>
      <div className={css.errorConatainer}>
        {error && <span>{error}</span>}
      </div>
      </React.Fragment>
    )
  }
  
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  value:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool
}