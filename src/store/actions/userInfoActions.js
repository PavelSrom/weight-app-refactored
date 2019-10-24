export const updateUserCredentials = credentials => {
  return {
    type: 'UPDATE_CREDENTIALS',
    payload: { id: credentials.id, email: credentials.email }
  }
}

export const updateUserDetails = details => {
  return {
    type: 'UPDATE_DETAILS',
    payload: {
      firstName: details.firstName,
      desiredWeight: details.desiredWeight,
      height: details.height,
      kcalIntake: details.kcalIntake
    }
  }
}

export const saveUserName = name => {
  return {
    type: 'SAVE_USER_NAME',
    payload: name
  }
}

export const saveUserEmail = email => {
  return {
    type: 'SAVE_USER_EMAIL',
    payload: email
  }
}

export const clearAllUserState = () => {
  return {
    type: 'CLEAR_ALL_USER_STATE'
  }
}

export const selectChosenExercise = exercise => {
  return {
    type: 'SELECT_CHOSEN_EXERCISE',
    payload: exercise
  }
}

export const updateExerciseDuration = duration => {
  return {
    type: 'UPDATE_EXERCISE_DURATION',
    payload: duration
  }
}

export const setOldestWeight = weight => {
  return {
    type: 'SET_OLDEST_WEIGHT',
    payload: weight
  }
}

export const setNewestWeight = weight => {
  return {
    type: 'SET_NEWEST_WEIGHT',
    payload: weight
  }
}

export const setDesiredWeight = weight => {
  return {
    type: 'SET_DESIRED_WEIGHT',
    payload: weight
  }
}