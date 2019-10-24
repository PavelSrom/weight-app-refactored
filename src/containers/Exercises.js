import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { updateExerciseDuration } from '../store/actions/userInfoActions'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import SingleExercise from '../components/SingleExercise/SingleExercise'
import Duration from '../components/Duration/Duration'
import Spinner from '../components/Spinner/Spinner'

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  // even if you don't use the setting function, it must be there
  const [durations, setDurations] = useState([15, 30, 45, 60])
  const [fetching, setFetching] = useState(false)

  const durationChosen = useSelector(store => store.userInfo.exerciseDuration)
  const dispatch = useDispatch()

  // GET request to '/api/exercises' happens here, when the component is mounted
  useEffect(() => {
    // get token from local storage
    const token = localStorage.getItem('authToken')
    // set 'fetching' to true => displays an overlay
    setFetching(true)
    // make a GET request to our endpoint, provide token
    axios.get('/api/exercises', { headers: { 'authToken': token } })
      // 'dowload' exercises to our state and hide the overlay
      .then(res => {
        setExercises(res.data)
        setFetching(false)
      })
      .catch(err => setFetching(false))
  }, [])

  // loop through our exercises and output each exercise as a standalone component
  const exerciseList = exercises.map(exercise => {
    return <SingleExercise
      key={exercise.id}
      name={exercise.name}
      kcalHour={exercise.kcalHour}
    />
  })

  // same for durations
  const durationList = (
    <div className="d-flex justify-content-between">
      {durations.map(duration => {
        return duration === durationChosen ?
          <Duration
            key={duration}
            duration={duration}
            chosen
            clicked={() => dispatch(updateExerciseDuration(duration))} /> :
          <Duration
            key={duration}
            duration={duration}
            clicked={() => dispatch(updateExerciseDuration(duration))} />
      })}
    </div>
  )

  // render stuff to the screen
  return (
    <Fragment>
      <Header />
      <div className="container" style={{ marginBottom: 70 }}>
        <div className="container-fluid">
          <p className="text-center">Set exercise duration:</p>
          {durationList}
        </div>
        <ul className="list-group">
          {exerciseList}
        </ul>
      </div>
      {fetching && <Spinner description="exercises" />}
      <Navbar />
    </Fragment>
  )
}

export default Exercises