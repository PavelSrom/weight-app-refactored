import React from 'react'
import './SingleLog.css'

const singleLog = props => {
  const { weight, date, logID } = props

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <p>{weight}kg</p>
        <p>{date}</p>
        <i onClick={() => props.edit(logID)} className="fas fa-pen"></i>
      </div>
    </li>
  )
}

export default singleLog