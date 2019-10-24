import React from 'react'

const duration = props => {
  const { chosen, duration } = props

  return chosen ?
    <p style={{ color: 'red', fontWeight: 'bold' }} onClick={props.clicked}>{duration}min</p> :
    <p onClick={props.clicked}>{duration}min</p>
}

export default duration