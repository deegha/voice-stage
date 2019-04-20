/**
 * Created by Deegha on 23/03/2019
 */

import { TextInput, Button, Header, FacebookBtn, GoogleBtn } from '../../components' 
import css from './styles.scss'
import { APP_NAME, APP_LOG, APP_DESCRIPTION } from '../../config/config'

const img = '../../static/images/2085405.png'
export class LoginPageView extends React.Component {

  render() {
    const { window:{width}, onChange, email, password, validForm, signUp } = this.props
    
    const clsImage = width < 800? css.imageMobile : css.image
    
    return (
      <div>
         <Header
          ogImage={APP_LOG}
          url={"/login"}
          title={`Login | ${APP_NAME}`} 
          description={APP_DESCRIPTION}/>
        <div className={css.container}>
          <div className={css.form}>
            <div className={css.formController}>
              <FacebookBtn />
            </div>
            <div className={css.formController}>
              <GoogleBtn signUp={signUp} />
            </div>
            <div className={css.seperator}>
            </div>

            <div className={clsImage}>
              <img src={img} />
            </div>

            {/*
            <div className={css.formController}>
              <TextInput 
                value={email}
                name={'email'}
                lable={"Email"}
                type={"text"} 
                placeholder="Enter email"
                onChange={onChange}/>
            </div>
            <div className={css.formController}>
              <TextInput 
                value={email}
                name={'password'}
                lable={"Password"}
                type={"text"} 
                placeholder="Enter password"
                onChange={onChange}/>
            </div>
            <div className={css.formController}>
              <Button 
                title={'Login'} 
                callBack={()=>console.log("hi")} 
                disabled={!validForm}
                color={'primary'} />
            </div>
            <div className={css.formController}>
              <Button 
                title={'Create a new account'} 
                callBack={()=>console.log("hi")} 
                color={'secondary'} />
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}