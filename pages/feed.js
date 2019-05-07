import { connect } from 'react-redux'
import { getFeedById, createComment, getComments, replyComment } from '../services/backendClient'
// import { sendEmailOnComment } from '../services/mailer'
import FeedsView  from '../views/feedView/feedsView'
import { getFeeds, createFeed, deleteFeed } from '../actions/feedsActions'

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
    if(this.props.feeds.feeds.length < 1) {
      this.props.getFeeds()
    }
    const comments = await getComments(this.props.slug)
    this.setState({comments})
  }

  sendEmailToParent(comments, perentId) {
    comments.map(comment => {
      if(comment.id === perentId) {
        console.log('found perant')
      }else {
        this.sendEmailToParent(comment.comments, perentId)
      }
    })
  } 

  addComment = async(newComment) => {
    this.setState(preProps => ({
      comments:[newComment, ...preProps.comments]}))

      this.setState({commentLoading: true})
    try {
      const response = await createComment(newComment)
      console.log("on creating comments", newComment)
      if(newComment.parent !== null) {
        this.sendEmailToParent(this.state.comments, newComment.parent)
      }

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

          // sendEmailOnComment(comment, reply)
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

    const { feed, auth, slug, window, feeds } = this.props
    const { comments } = this.state

    return (
     <FeedsView 
      feeds={feeds.feeds}
      window={window}
      comments={comments} 
      reply={this.reply} 
      feed={feed.data} 
      auth={auth} 
      addComment={this.addComment}/>
    )
  }
}

const mapStateToProps = ({auth, window, feeds}) => ({
  auth,
  window,
  feeds
})

const mapDisptchToProps = (dispatch) => ({
  getFeeds: () => dispatch(getFeeds()),
})

export default connect(mapStateToProps, mapDisptchToProps)(Feed)