import React from 'react'
import { connect } from 'react-redux'
import { voteUpAction,voteDownAction } from '../../actions/feedsActions'
import { IoMdShare, IoIosHeart, IoIosHeartEmpty,  } from 'react-icons/io'

import css from './styles.scss'
class LikeBtn extends React.PureComponent {

  state = {
    liked: false,
    likeCount: 0
  }

  componentDidUpdate(props) {
    if(props.likeCount !== this.props.likeCount) {
      this.setState({likeCount: this.props.likeCount})
      this.animate()
    }
     

    if(props.liked !== this.props.liked ) 
      this.setState({liked: this.props.liked})
  }

  componentDidMount() {
   
    this.setState({liked: this.props.liked, likeCount: this.props.likeCount})
   
  }

  clickLike = (id) => () => {

   
    if(!this.props.authenticated) {
      this.props.login()
    }else {

      if(this.state.liked) {
        this.props.voteDown(id)

      }else {
        this.setState(preState => ({liked: true,likeCount: preState.likeCount+1 }),()=> this.animate())
        this.props.voteUp(id)
      }
    }

  }

  animate = () => {
    console.log('animate')
  }

  render() {
    const { feedId } = this.props
    const { likeFontSize, liked, likeCount } = this.state

    return (
      <div className={css.likeBtnContainer}>
        <div className={css.likeBtn} onClick={this.clickLike(feedId)}>
          {liked? (
            <IoIosHeart style={{color:'#d63031'}}/>
          ): (
            <IoIosHeartEmpty />
          )}
        </div>
        <span className={css.amount}>{likeCount}</span>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  voteUp: (feedid) => dispatch(voteUpAction(feedid)),
  voteDown: (feedid) => dispatch(voteDownAction(feedid)),
})

const mapStateToProps = ( { auth:{authenticated} } ) => ({
  authenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(LikeBtn)