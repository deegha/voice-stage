
import css from './styles.scss'

export const Modal = ({visible, children}) => {

  if(!visible) {
    return null
  }

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {children}
      </div>
    </div>
  )
}