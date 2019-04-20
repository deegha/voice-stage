import React from 'react'
import Link from 'next/link'
import css from './styles.scss'


class Nav extends React.PureComponent {

  state = {
    moblieMenuOpen: false 
  }

  renderMenuItems = (auth) => {

    console.log(auth.authenticated, "auth.authenticated")
    const items = <ul>

      {auth.authenticated? (
        <li>
          <img src={auth.user.photoURL} className={css.proPic} />
        </li>
      
      ) : (
         <li>  
         <Link prefetch href="/login">
           <a>Login</a>
         </Link>
       </li>
      )}
     
    </ul>

    return items
  }

  renderMenuItemsMobile = (auth) => {
    const items = <ul>

      <li>
        <Link>
          <a>Contact Us</a>
        </Link>
      </li>

      <li>
        <Link>
          <a>Privacy Policy</a>
        </Link>
      </li>
      {auth.authenticated? (
        <li>
          <img src={auth.user.photoURL} className={css.proPic} />
        </li>
      ) : (
         <li>  
         <Link prefetch href="/login">
           <a>Login</a>
         </Link>
       </li>
      )}
     
    </ul>

    return items
  }

  togleMenu = () => {
    this.setState(preState => ({moblieMenuOpen: !preState.moblieMenuOpen}))
  }

  render() {
    const { isMobile, auth } = this.props
    const {moblieMenuOpen} = this.state
    const clsMMenu = moblieMenuOpen?css.mMenuOpen:css.mMenuClose
    // const clsMMenu = css.mMenuOpen  
    if(isMobile)
      return (
        <div>
          <div className={css.mobileMenu} onClick={this.togleMenu}>
          {auth.authenticated? (
            <img src={auth.user.photoURL} className={css.proPic} />
            ) : ( 
           <div>
              <div className={css.mobileMenuDot} />
              <div className={css.mobileMenuDot} />
              <div className={css.mobileMenuDot} />
           </div>
            )}
          </div>
          <div className={clsMMenu}>
            <div className={css.menuItems}>
            {this.renderMenuItemsMobile(auth)}
            </div>
          </div>
        </div>
      )

    return(
      <nav className={css.mainMenu}>
        {this.renderMenuItems(auth)}
      </nav>
    )
  }
}


export default Nav



{/* <ul>
{links.map(({ key, href, label }) => (
  <li key={key}>
    <Link href={href}>
      <a>{label}</a>
    </Link>
  </li>
))}
</ul> */}