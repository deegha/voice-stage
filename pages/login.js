/**
 * Created by Deegha on 23/03/2019
 */

import { connect } from 'react-redux' 
import { signUp } from '../actions/authUserActions'
import Router from 'next/router'
import { LoginPageView } from '../views/loginPageView/loginPageView'

class Login extends React.Component {

  state = { 
    width: 0, 
    height: 0 ,
    email: '',
    password: '',
    validForm: false
  }

  componentDidMount() {

    if(this.props.authenticated) {
      Router.push("/")
    }

    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentDidUpdate(preProps) {
    if(this.props.authenticated && preProps.authenticated !== this.props.authenticated) {
      Router.push("/")
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  onChange = (feild, value) => this.setState({
    [feild]: value
  },this.validateForm)

  validateForm = () => {
    const { email, password } = this.state
    if( email !== "" && password !== "" ) {
      this.setState({validForm: true})
    }else {
      this.setState({validForm: false})
    }

  }

  render () {
    const { signUp } = this.props
    return (
      <LoginPageView 
        signUp={signUp}
        {...this.state} onChange={this.onChange}/>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (user, provider) => dispatch(signUp(user, provider))
})

const mapStateToProps = ({auth: {authenticated}}) => ({
  authenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)