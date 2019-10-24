import React, { useReducer, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const initInputState = {
  email: '',
  password: '',
  firstName: '',
  desiredWeight: null,
  height: null,
  kcalIntake: null
}

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_FIRSTNAME':
      return { ...state, firstName: action.payload }
    case 'SET_DESIREDWEIGHT':
      return { ...state, desiredWeight: action.payload }
    case 'SET_HEIGHT':
      return { ...state, height: action.payload }
    case 'SET_KCALINTAKE':
      return { ...state, kcalIntake: action.payload }
    default:
      return state
  }
}

const Register = props => {
  const [inputState, inputDispatch] = useReducer(inputReducer, initInputState)

  // this method is executed when we want to register the user and redirect them to login 'page'
  const registerAndRedirectToLogin = () => {
    // extract our information from the state
    const { email, password, firstName, desiredWeight, height, kcalIntake } = inputState
    // make a POST request to the endpoint, providing the information
    axios.post('/api/register', {
      email,
      password,
      firstName,
      desiredWeight: parseFloat(desiredWeight).toFixed(1),
      height: Number(height),
      kcalIntake: Number(kcalIntake)
    })
      .then(res => props.history.push('/login'))
  }

  // custom dynamic inputs, can be outsourced to its own component
  const inputs = Object.keys(inputState)
  const dynamicInput = inputs.map(input => {
    return (
      <Fragment key={input}>
        <label htmlFor={input}>{input}</label>
        <input
          onChange={e => inputDispatch({ type: `SET_${input.toUpperCase()}`, payload: e.target.value })}
          type="text" className="form-control" name={input}
        />
      </Fragment>
    )
  })

  return (
    <div className="container">
      <h2 className="text-primary mb-5">Register page</h2>
      {dynamicInput}
      <button className="btn btn-primary btn-block mt-5 mb-2" onClick={registerAndRedirectToLogin}>SUBMIT AND PROCEED TO LOGIN</button>
      <Link to="/login">
        <p className="text-center" style={{ cursor: 'pointer' }}>Already registered? Sign in instead</p>
      </Link>
    </div>
  )
}

export default Register