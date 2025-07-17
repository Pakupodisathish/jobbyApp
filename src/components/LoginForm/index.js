import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {isError: false, errorMsg: '', userName: '', password: ''}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {
      username: userName,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderInputUserField = () => {
    const {userName} = this.state
    return (
      <>
        <div className="input-container">
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="input"
            value={userName}
            placeholder="Username"
            onChange={this.onChangeUserName}
          />
        </div>
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <div className="input-container">
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            placeholder="Password"
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  render() {
    const {isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-page">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="website-logo"
              alt="website logo"
            />
          </div>
          {this.renderInputUserField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
