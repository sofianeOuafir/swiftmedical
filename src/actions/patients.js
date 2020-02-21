import axios from "axios";

const setPatients = patients => ({
  type: "SET_PATIENTS",
  patients
});

const startSetPatients = () => {
  return dispatch => {
    return axios.get(`http://localhost:3000/patients`).then(response => {
      dispatch(setPatients(response.data.data));
      return response;
    });
  };
};

export { startSetPatients };
