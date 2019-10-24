import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearAllUserState } from '../../store/actions/userInfoActions'

const Header = props => {
  const userEmail = useSelector(store => store.userInfo.email)
  const dispatch = useDispatch()

  // this gets executed when we click 'SIGN OUT'
  const removeTokenAndSignOut = () => {
    localStorage.removeItem('authToken') // token gets removed from local storage
    props.history.replace('/') // we're redirected back to register page
    dispatch(clearAllUserState()) // cleanup in Redux
  }

  return (
    <header className="pt-1 pb-2 bg-dark">
      <div className="container">
        <p className="text-white text-center">Signed in as {userEmail}</p>
        <button
          onClick={removeTokenAndSignOut}
          className="btn btn-light d-block mx-auto">SIGN OUT
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)