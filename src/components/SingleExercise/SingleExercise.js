import React from 'react'
import { connect } from 'react-redux'
import { selectChosenExercise } from '../../store/actions/userInfoActions'

const singleExercise = props => {
  const { name, kcalHour, selectExercise } = props

  return (
    <li className="list-group-item my-1">
      <div className="d-flex justify-content-between">
        <p>{name.toUpperCase()}</p>
        <p>{kcalHour}kcal / h</p>
      </div>
      <button
        className="btn btn-block btn-outline-info"
        onClick={() => selectExercise(kcalHour)}>CHOOSE AS DEFAULT EXERCISE
      </button>
    </li>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    selectExercise: kcalPerHour => dispatch(selectChosenExercise(kcalPerHour))
  }
}

export default connect(null, mapDispatchToProps)(singleExercise)