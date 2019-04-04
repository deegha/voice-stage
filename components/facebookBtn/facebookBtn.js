import {Fire} from '../../services/firebase'
import css  from './styles.scss'

export class FacebookBtn extends React.Component {

  contiueWithFacebook = () => {
    Fire().then(firebase => {
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(({ user }) => {
        console.log(user)
      })
      .catch(err => {
        console.log(err, 'at facebook button')
      })
    })
	}

  render() {
    return (
      <div className={css.fb} onClick={this.contiueWithFacebook}>
        Continue with facebook
      </div>
    )
  }
}