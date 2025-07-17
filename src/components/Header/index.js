import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BsFillHouseDoorFill, BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link className="website-logo-btn" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>
      <ul className="mobile-nav-items">
        <li>
          <Link to="/" className="nav-link">
            <BsFillHouseDoorFill className="home-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <BsBriefcaseFill className="jobs-icon" />
          </Link>
        </li>
        <li>
          <button
            className="logout-icon-btn"
            onClick={onClickLogout}
            type="button"
          >
            <FiLogOut className="logout-icon" />
          </button>
        </li>
      </ul>
      <ul className="desktop-nav-items">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" onClick={onClickLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
