import axios from "axios";

const setWounds = wounds => ({
  type: "SET_WOUNDS",
  wounds
});

const startSetWounds = patientId => {
  return dispatch => {
    return axios
      .get(`http://localhost:3000/patients/${patientId}/wounds`)
      .then(response => {
        dispatch(setWounds(response.data.data));
        return response;
      });
  };
};

export const updateWound = ({ updates, woundId }) => dispatch => {
  return dispatch({
    type: "UPDATE_WOUND",
    updates,
    woundId
  });
};

export const startUpdateWound = ({ woundId, updates }) => dispatch => {
  const data = {
    type: "wounds",
    id: `${woundId}`,
    attributes: {
      ...updates
    }
  };

  return axios
    .patch(`http://localhost:3000/wounds/${woundId}`, {
      data
    })
    .then(response => {
      dispatch(updateWound({ woundId, updates }));
      return response;
    })
    .catch(e => {
      console.log(e);
    });
};

export { startSetWounds };
