import React, { Fragment, useState, useReducer, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDesiredWeight } from '../store/actions/userInfoActions'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Spinner from '../components/Spinner/Spinner'
import Header from '../components/Header/Header'

const initUserState = {
  firstName: '',
  desiredWeight: null,
  height: null,
  kcalIntake: null
}

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload }
    case 'SET_DESIRED_WEIGHT':
      return { ...state, desiredWeight: action.payload }
    case 'SET_HEIGHT':
      return { ...state, height: action.payload }
    case 'SET_KCAL_INTAKE':
      return { ...state, kcalIntake: action.payload }
    default:
      return state
  }
}

const UserDetails = () => {
  const [userState, userDispatch] = useReducer(userReducer, initUserState)
  const [newDesiredWeight, setNewDesiredWeight] = useState(null)
  const [newKcalIntake, setNewKcalIntake] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [updatingMode, setUpdatingMode] = useState(false)

  const reduxDispatch = useDispatch()

  // GET request to userdetails when the component is mounted
  useEffect(() => {
    const token = localStorage.getItem('authToken') // get token
    setFetching(true) // display the overlay before sending our request
    axios.get('/api/me/userdetails', { headers: { 'authToken': token } }) // make a GET request
      .then(res => {
        setFetching(false)
        // when we get a response, send the desired weight to Redux so the Dashboard component can use it
        reduxDispatch(setDesiredWeight(res.data.desiredWeight))
        // extract everything from the response data and set component state accordingly
        const { firstName, desiredWeight, height, kcalIntake } = res.data
        userDispatch({ type: 'SET_FIRST_NAME', payload: firstName })
        userDispatch({ type: 'SET_DESIRED_WEIGHT', payload: desiredWeight })
        userDispatch({ type: 'SET_HEIGHT', payload: height })
        userDispatch({ type: 'SET_KCAL_INTAKE', payload: kcalIntake })
      })
      .catch(err => this.setState({ fetching: false }))
  }, [])

  // this is where the PUT request happens
  const submitNewDetails = () => {
    const { desiredWeight, kcalIntake } = userState
    const token = localStorage.getItem('authToken')
    axios.put('/api/me/userdetails', { // make a PUT request, providing the info converted into numbers
      desiredWeight: Number(newDesiredWeight) || desiredWeight, // if new weight isn't provided, take the old one
      kcalIntake: Number(newKcalIntake) || kcalIntake // if new kcalIntake isn't provided, take the old one from the state
    }, {
      headers: { 'authToken': token }
    })
      .then(res => { // when we get a successful response, dispatch the new desired weight to Redux
        reduxDispatch(setDesiredWeight(res.data.desiredWeight))
        // and set state correctly (update desiredWeight, kcalIntake, and hide the form)
        setUpdatingMode(false)
        userDispatch({ type: 'SET_DESIRED_WEIGHT', payload: res.data.desiredWeight })
        userDispatch({ type: 'SET_KCAL_INTAKE', payload: res.data.kcalIntake })
      })
  }

  // markup for user details
  const userDetails = (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-between">
        <p>First name:</p>
        <p>{userState.firstName}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Desired weight:</p>
        <p>{userState.desiredWeight}kg</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Height:</p>
        <p>{userState.height}cm</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Caloric intake:</p>
        <p>{userState.kcalIntake}kcal per day</p>
      </div>
      <button onClick={() => setUpdatingMode(!updatingMode)} className="btn btn-outline-info btn-block my-2">EDIT</button>
    </div>
  )

  // markup for the form that pops up when we want to edit something
  const updateDetailsModal = (
    <div className="container-fluid bg-light py-2">
      <label htmlFor="newDesiredWeight">New desired weight:</label>
      <input onChange={e => setNewDesiredWeight(e.target.value)} type="text" className="form-control" name="newDesiredWeight" />

      <label htmlFor="newKcalIntake">New caloric intake:</label>
      <input onChange={e => setNewKcalIntake(e.target.value)} type="text" className="form-control" name="newKcalIntake" />

      <button onClick={submitNewDetails} className="btn btn-primary mx-auto mt-2 d-block">SUBMIT NEW DETAILS</button>
    </div>
  )

  // render stuff to the screen
  return (
    <Fragment>
      <Header />
      <div className="container py-2" style={{ marginBottom: 70 }}>
        <h3 className="text-center">Your user details</h3>
        {!fetching && userDetails}
        {updatingMode && updateDetailsModal}
        {fetching && <Spinner description="your details" />}
      </div >
      <Navbar />
    </Fragment>
  )
}

export default UserDetails