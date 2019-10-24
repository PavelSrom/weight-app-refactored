import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNewestWeight, setOldestWeight } from '../store/actions/userInfoActions'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import Spinner from '../components/Spinner/Spinner'
import SingleLog from '../components/SingleLog/SingleLog'

const Logs = () => {
  const [logs, setLogs] = useState([])
  const [fetching, setFetching] = useState(false)
  const [updateWeightModalOpen, setUpdateWeightModalOpen] = useState(false)
  const [newWeight, setNewWeight] = useState('')
  const [updateWeight, setUpdateWeight] = useState('')
  const [chosenLogID, setChosenLogID] = useState(null)

  const dispatch = useDispatch()

  // when the component is mounted, make our GET request to get all logs
  useEffect(() => {
    const token = localStorage.getItem('authToken') // get token
    setFetching(true) // display spinner
    // make request
    axios.get('/api/me/logs', { headers: { 'authToken': token } })
      .then(res => {
        // once we get a response, sort the response array from newest to oldest logs
        const newestToOldestLogs = res.data.sort((a, b) => b.logID - a.logID)
        // dispatch actions to Redux only if the array is not empty (important!)
        if (newestToOldestLogs.length > 0) {
          dispatch(setOldestWeight(newestToOldestLogs[newestToOldestLogs.length - 1].weight))
          dispatch(setNewestWeight(newestToOldestLogs[0].weight))
        }
        // set the component state to our received array and hide the spinner
        setLogs(newestToOldestLogs)
        setFetching(false)
      })
      // hide the spinner even if we get errors
      .catch(err => setFetching(false))
  }, [])

  // submit the log to our database
  const submitNewLog = () => {
    const token = localStorage.getItem('authToken') // get token
    // make a POST request to the correct endpoint
    axios.post('/api/me/logs', {
      // don't forget to convert the weight (by default it's a string, because it's coming from a form input)
      weight: Number(newWeight),
      date: new Date().toLocaleDateString()
    }, {
      headers: { 'authToken': token }
    })
      .then(res => {
        // clear new weight state
        setNewWeight('')
        // once we get a response, dispatch that weight to Redux
        dispatch(setNewestWeight(res.data.weight))
        // if there are still no logs after having done the GET request, it's also the oldest weight
        if (logs.length === 0) dispatch(setOldestWeight(res.data.weight))
        // and add that log to our component state
        setLogs([res.data, ...logs])
      })
  }

  // display a modal when we want to edit a certain log
  const editExistingLog = logID => {
    setUpdateWeightModalOpen(true)
    setChosenLogID(logID)
  }

  // this is where we make the PUT request
  const submitNewWeight = () => {
    const token = localStorage.getItem('authToken')
    axios.put('/api/me/logs', {
      logID: chosenLogID,
      weight: updateWeight,
      date: new Date().toLocaleDateString()
    }, {
      headers: { 'authToken': token }
    })
      .then(res => {
        // remove old log from the state
        const oldLogRemoved = [...logs].filter(log => log.logID !== res.data.logID)
        // push updated log to the state and sort their logIDs in descending order again
        const newLogList = [...oldLogRemoved, res.data].sort((a, b) => b.logID - a.logID)
        // dispatch newest log (first item in the array)
        dispatch(setNewestWeight(newLogList[0].weight))
        // set state
        setLogs(newLogList)
        setUpdateWeightModalOpen(false)
      })
      .catch(err => setFetching(false))
  }

  // markup for the modal that pops up when we want to update a certain log
  const updateWeightModal = (
    <div className="overlay">
      <div className="container">
        <p className="text-white">Update weight:</p>
        <input
          onChange={e => setUpdateWeight(e.target.value)}
          type="text" className="form-control mb-2" placeholder="New weight..." />
        <div className="d-flex justify-content-around">
          <button onClick={submitNewWeight} className="btn btn-primary">CONFIRM</button>
          <button onClick={() => setUpdateWeightModalOpen(false)} className="btn btn-outline-secondary">CANCEL</button>
        </div>
      </div>
    </div>
  )

  // markup for all logs
  const allLogs = (
    <ul className="list-group">
      {logs.map(log => {
        return <SingleLog
          key={log.logID}
          logID={log.logID}
          weight={log.weight}
          date={log.date}
          edit={editExistingLog}
        />
      })}
    </ul>
  )

  // if there are no logs, this paragraph is rendered
  const noLogsFound = <p className="mt-5 text-center">You have no logs added.</p>

  return (
    <Fragment>
      <Header />
      <div className="container py-2" style={{ marginBottom: 70 }}>
        <h3 className="text-center">Your daily logs</h3>
        <div className="bg-secondary p-2 text-center mb-2">
          <p className="text-white">Add a new log:</p>
          <input
            onChange={e => setNewWeight(e.target.value)} value={newWeight}
            type="text" className="form-control px-2 w-50 d-block mx-auto" placeholder="Current weight..." />
          <button onClick={submitNewLog} className="btn btn-primary btn-block mt-2">SUBMIT LOG</button>
        </div>
        {!fetching && logs.length > 0 && allLogs}
        {!fetching && !logs.length > 0 && noLogsFound}
        {fetching && <Spinner description="your logs" />}
        {updateWeightModalOpen && updateWeightModal}
      </div>
      <Navbar />
    </Fragment>
  )
}

export default Logs