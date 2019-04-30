import { FiImage } from 'react-icons/fi'
import css from './styles.scss'

import { CommentView } from './commentView'


export class CommentBox extends React.PureComponent {
  
  render() {
    const { comment, auth, reply, width } = this.props

    return (
      <div className={css.container}>
        <div  className={css.comments}>
          <CommentView width={width} comment={comment} auth={auth} reply={reply}/>
        </div>
      </div>
    )
  }
}