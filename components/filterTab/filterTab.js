

import css from './styles.scss'

export const FilterTab = ({ title, selected, callback, prop, readOnly}) => {
  const styles = {
    backgroundColor: selected?'#ff4757':'#ced6e0'
  }

  const cls =  selected? css.selected: css.unselected

  if(readOnly) {
    return (
      <div className={[css.container,css.selected].join(' ')}>
        {title}
      </div>
    )
  }

  return (
    <div  onClick={callback(prop)} className={[css.container,cls].join(' ')}>
      {title}
    </div>
  )
}