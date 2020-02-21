const patientsReducerDefaultState = [];
const patientsReducer = (state = patientsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_PATIENTS': 
      return action.patients;
    default:
      return state;
  }
};

export {
  patientsReducer
}