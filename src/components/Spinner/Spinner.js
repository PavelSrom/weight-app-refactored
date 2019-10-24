import React from 'react'
import './Spinner.css'

const spinner = props => (
  <div className="overlay">
    <p className="overlay-text">Fetching {props.description}...</p>
  </div>
)

export default spinner