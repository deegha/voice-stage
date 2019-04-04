import css from './styles.scss'
import PropTypes from 'prop-types'

export class Button extends React.PureComponent {

  render () {
    const { title, callback, color, disabled, loading } = this.props

    let cls = null

    if(disabled) {
      cls = css.btnDisabled
    }else if(color === 'primary') {
      cls = css.btnActivePrimary
    }
    else if(color === 'secondary') {
      cls = css.btnActiveSecondary
    }

    if(loading) {
      return (
        <div className={[css.loding, css.btn].join(' ')} onClick={callback}>{title}</div>
      )
    }

    return (
      <div className={[cls, css.btn].join(' ')} onClick={callback}>{title}</div>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  // callback: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
}