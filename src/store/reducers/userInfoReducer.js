const initialState = {
  email: '',
  chosenExercise: null,
  exerciseDuration: 30,
  newestWeight: null,
  firstWeight: null,
  desiredWeight: null,
}

// reducer that handles user information
const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_EMAIL':
      return {
        ...state,
        email: action.payload
      }
    case 'SELECT_CHOSEN_EXERCISE':
      return {
        ...state,
        chosenExercise: action.payload
      }
    case 'UPDATE_EXERCISE_DURATION':
      return {
        ...state,
        exerciseDuration: action.payload
      }
    case 'CLEAR_ALL_USER_STATE':
      return {
        email: '',
        firstWeight: null,
        desiredWeight: null,
        newestWeight: null,
        exerciseDuration: 30,
        chosenExercise: null
      }
    case 'SET_OLDEST_WEIGHT':
      return {
        ...state,
        firstWeight: action.payload
      }
    case 'SET_NEWEST_WEIGHT':
      return {
        ...state,
        newestWeight: action.payload
      }
    case 'SET_DESIRED_WEIGHT':
      return {
        ...state,
        desiredWeight: action.payload
      }
    default:
      return state
  }
}

export default userInfoReducer