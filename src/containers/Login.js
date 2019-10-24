import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUserEmail } from '../store/actions/userInfoActions'
import axios from 'axios'
import Spinner from '../components/Spinner/Spinner'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [fetching, setFetching] = useState(false)

  const dispatch = useDispatch()

  // this method is executed when the user wants to go to their account
  const loginUser = () => {
    // show spinner while the request is processing
    setFetching(true)
    // extract email and password from our state
    // make a POST request to our endpoint, providing the email and password
    axios.post('/api/login', { email, password })
      .then(res => {
        // hide the spinner
        setFetching(false)
        // save token to local storage when the response is successful
        localStorage.setItem('authToken', res.headers.authtoken)
        // if we get the token back from local storage and there's no error,
        // redirect the user to dashboard and save their userID and email to Redux
        if (!error && localStorage.getItem('authToken')) {
          props.history.push('/me')
          dispatch(saveUserEmail(res.data.email))
        }
        // handle errors from here in UI
      })
      .catch(err => {
        setFetching(false)
        setError(true)
      })
  }

  // render stuff to the screen
  return (
    <div className="container">
      <h2 className="text-primary mb-5">Login page</h2>
      {error && <p>Incorrect email or password :(</p>}
      {fetching && <Spinner description="your account" />}

      <label htmlFor="email">Email</label>
      <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" name="email" />
      <label htmlFor="password">Password</label>
      <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" name="password" />

      <button className="btn btn-primary btn-block mt-5 mb-2" onClick={loginUser}>LOGIN</button>
      <Link to="/">
        <p className="text-center" style={{ cursor: 'pointer' }}>Not registered? Register instead!</p>
      </Link>
    </div>
  )
}

export default Login