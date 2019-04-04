import React from 'react'
import Link from 'next/link'
import css from './styles.scss'


class Nav extends React.PureComponent {

  state = {
    moblieMenuOpen: false 
  }

  renderMenuItems = (auth) => {
    const items = <ul>
      <li>  
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
    
      <li>  
        <Link prefetch href="/contact-us">
          <a>Contact us</a>
        </Link>
      </li>
    
      <li>  
        <Link prefetch href="/privacy-policy">
          <a>Privacy policy</a>
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
            <div className={css.mobileMenuDot} />
            <div className={css.mobileMenuDot} />
            <div className={css.mobileMenuDot} />
          </div>
          <div className={clsMMenu}>
            <div className={css.menuItems}>
            {this.renderMenuItems(auth)}
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