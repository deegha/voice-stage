import {Fire} from '../../services/firebase'
import css  from './styles.scss'

export class GoogleBtn extends React.Component {

  contiueWithGoogle = () => {
    Fire().then(firebase => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(({ user }) => {

        this.props.signUp(user, 'google')
        console.log(user.displayName)
      })
      .catch(err => {
        console.log(err, 'at google button')
      })
    })
	}

  render() {
    return (
      <div className={css.google} onClick={this.contiueWithGoogle}>
        Continue with Google
      </div>
    )
  }
}
