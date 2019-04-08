import { connect } from 'react-redux'
import { fetchFeed, getFeedById, createComment, getComments, replyComment } from '../services/backendClient'
import FeedsView  from '../views/feedView/feedsView'

class Feed extends React.Component {

  static async getInitialProps({query}) {
    const slug = query.slug
    try {
      const feed = await getFeedById(slug)
     
      return {slug, feed}
    }catch(err) {
      return {err}
    }
  }

  state = {
    commentLoading: false,
    comments: []
  }

  async componentDidMount() {
    const comments = await getComments(this.props.slug)
    this.setState({comments})
  }

  addComment = async(newComment) => {
    this.setState(preProps => ({
      comments:[newComment, ...preProps.comments]}))

      this.setState({commentLoading: true})
    try {
      const response = await createComment(newComment)
      this.setState({commentLoading: false})
    }catch(err) {
      console.log(err)
      this.setState({commentLoading: false})
    } 
  }

  checkArray = (comments, reply) => {
    comments.map( comment => {
      if(comment.id === reply.parent) {
        comment.comments.unshift(reply)
        try {
          const commentTree = this.state.comments.filter(cmt => cmt.id === comment.superParent)

          replyComment(comment.superParent, commentTree[0])
        }catch(err) {
          console.log(err)
        }
      }
      else {
        this.checkArray(comment.comments ,reply)
      }
    })
  }

  reply = async (reply) => {
    const { comments } = this.state
    this.checkArray(comments, reply)
  }

  render() {

    const { feed, auth } = this.props
    const { comments } = this.state
    return (
     <FeedsView comments={comments} reply={this.reply} feed={feed.data} auth={auth} addComment={this.addComment}/>
    )
  }
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(Feed)