
import css from './styles.scss'
import Link from 'next/link'
import moment from 'moment'

export class TopComments extends React.PureComponent {

  render() {
    const { comment } = this.props

    return (
      <div className={css.container}>
      <Link href={`/feed?slug=${comment.feedId}`}>
        <a>
        <h2 className={css.comment}>{comment.comment}</h2>
      
        {comment.media.url !== '' && (
          <img src={comment.media.url} />
        )}

          <p className={css.name}>{comment.auther.displayName} commented {moment.unix(comment.createdAt).fromNow()}</p>
        </a>
      </Link>
      </div>
    )
  }
}
