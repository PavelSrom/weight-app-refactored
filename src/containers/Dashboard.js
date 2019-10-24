import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'

const Dashboard = () => {
  // grabbing stuff from Redux
  const {
    chosenExercise,
    exerciseDuration,
    firstWeight,
    newestWeight,
    desiredWeight
  } = useSelector(store => store.userInfo)

  // taking care of what to render
  const [allInfo, setAllInfo] = useState(false)
  useEffect(() => {
    const propsArr = [chosenExercise, exerciseDuration, firstWeight, newestWeight, desiredWeight]
    // propsArr.every(Boolean) returns either true or false, depending on whether we have all the values needed to render our graphs
    const shouldWeRenderGraphs = propsArr.every(Boolean)

    setAllInfo(shouldWeRenderGraphs)
  }, [])

  // It's been a long time since I've done any math, so please make sure this is correct :D
  const kgLeft = newestWeight - desiredWeight
  const kcalLeft = kgLeft * 7000
  const kcalPerSession = (exerciseDuration / 60) * chosenExercise

  const sessionsLeft = Math.ceil(kcalLeft / kcalPerSession)
  const kgLost = firstWeight - newestWeight

  // this thing renders if we don't have all the info we need to display our graphs
  const warningParagraph = (
    <div className="container">
      <h4 className="mt-2">Developer's note:</h4>
      <p>Please visit all other pages and choose your favorite exercise in order for this page to work properly. Also, make sure you have at least one log added. Thank you!</p>
    </div>
  )

  // if we have everything needed, we display this markup
  const graphContainer = (
    <div className="container">
      <h3 className="text-center my-3">Dashboard</h3>
      <div className="bg-light p-2">
        <div className="d-flex justify-content-between mt-3 bg-light">
          <div className="w-50 text-center">
            <h1>{sessionsLeft}</h1>
            <p>sessions left</p>
          </div>
          <div className="w-50 text-center">
            <h1>{kgLost}</h1>
            <p>kg lost</p>
          </div>
        </div>
        <div className="text-center mt-5 bg-light">
          <h1>{kgLeft}</h1>
          <p>kg to go</p>
        </div>
      </div>
    </div>
  )

  return (
    <Fragment>
      <Header />
      {!allInfo && warningParagraph}
      {allInfo && graphContainer}
      <Navbar />
    </Fragment>
  )
}

export default Dashboard