const woundsReducerDefaultState = [];
const woundsReducer = (state = woundsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_WOUNDS":
      return action.wounds;
    case "UPDATE_WOUND":
      return [
        ...state.map(wound => {
          if (wound.id === action.woundId) {
            return {
              ...wound,
              attributes: {
                ...wound.attributes,
                ...action.updates
              }
            };
          } else {
            return wound;
          }
        })
      ];
    default:
      return state;
  }
};

export { woundsReducer };
