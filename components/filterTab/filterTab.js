

import css from './styles.scss'

export const FilterTab = ({title, selected, callback, prop}) => {
  const styles = {
    backgroundColor: selected?'#ff4757':'#ced6e0'
  }

  const cls =  selected? css.selected: css.unselected

  return (
    <div onClick={callback(prop)} className={[css.container,cls].join(' ')}>
      {title}
    </div>
  )
}