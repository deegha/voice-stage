import React from 'react'
import Link from 'next/link'
import css from './styles.scss'

class Nav extends React.PureComponent {

  state = {
    moblieMenuOpen: false 
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node
  }
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({moblieMenuOpen: false})
    }
  }

  renderMenuItems = (auth) => {
    const items = <ul>
       {auth.authenticated && (
        <li>
          <Link href={`/profile?slug=${auth.user.id}`}>
            <a>Profile</a>
          </Link>
        </li>
       )}
     
      <li>
        <Link href="/contact-us">
          <a>Contact Us</a>
        </Link>
      </li>

      <li>
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
      </li>
      {auth.authenticated? (
        <li onClick={this.props.signOut}>Logout</li>
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
    const menu = isMobile? css.menuItemswrapperMobile: css.menuItemswrapper


    return(
      <nav ref={this.setWrapperRef}>
        <div className={css.mainMenu} onClick={this.togleMenu}>
          {auth.authenticated? (
            <img src={auth.user.photoURL} className={css.proPic} />
            ) : ( 
           <div>
              <div className={css.menuDot} />
              <div className={css.menuDot} />
              <div className={css.menuDot} />
           </div>
            )}
          
        </div>
       
        <div className={[clsMMenu, menu].join(' ')}>
          <div className={css.menuItems}>
          {this.renderMenuItems(auth)}
          </div>
        </div>
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