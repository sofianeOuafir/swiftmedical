import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Toggle from "react-toggle";
import moment from "moment";

import { startSetWounds, startUpdateWound } from "./../actions/wounds";
import Layout from "./Layout";

class PatientPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      patient: { attributes: {} },
      wounds: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { startSetWounds } = this.props;
    Promise.all([
      axios.get(`http://localhost:3000/patients/${id}`),
      startSetWounds(id)
    ]).then(([PatientResponse, woundsReponse]) => {
      this.setState(() => ({
        patient: PatientResponse.data.data,
        wounds: woundsReponse.data.data,
        loadingData: false
      }));
    });
  }

  onResolve = ({ e, woundId }) => {
    const { startUpdateWound } = this.props;
    startUpdateWound({
      woundId,
      updates: { resolved: e.target.checked }
    });
  };

  render() {
    const { loadingData, patient, wounds } = this.state;
    const {
      avatarUrl,
      firstName,
      lastName,
      address,
      dateOfBirth,
      roomNumber,
      bedNumber
    } = patient.attributes;
    return loadingData ? (
      <p>Loading</p>
    ) : (
      <Layout>
        <Link className="btn btn-secondary btn-lg mb1" to="/">
          &larr; Back
        </Link>
        <div className="flex align-items--center">
          <img src={avatarUrl} alt="Avatar" width="200" className="mr2" />
          <h1 className="text-dark-blue h1">{`${firstName} ${lastName}`}</h1>
        </div>
        <div className="py2">
          <p className="m0 h3">Address: {address}</p>
          <p className="m0 h3">Date of birth: {moment(dateOfBirth).format('LL')}</p>
          <p className="m0 h3">Room number: {roomNumber}</p>
          <p className="m0 h3">Bed number: {bedNumber}</p>
        </div>
        <div>
          <h2 className="text-dark-blue">Wounds</h2>
          <table className="table table-striped center">
            <tbody>
              {wounds.map(wound => {
                const {
                  imageUrl,
                  bodyLocation,
                  inHouseAcquired,
                  type,
                  resolved
                } = wound.attributes;
                return (
                  <tr
                    key={wound.id}
                    className="flex justify-content--space-between align-items--center"
                  >
                    <td>
                      <img src={imageUrl} alt="Wound" width={200} />
                    </td>
                    <td>
                      <span className="h3 text-blue-electric">Type:</span> <br />
                      {type}
                    </td>
                    <td>
                      <span className="h3 text-blue-electric">Body location:</span>

                      <br />
                      {bodyLocation}
                    </td>
                    <td>
                      <span className="h3 text-blue-electric"> In house acquired?</span>

                      <br />
                      {inHouseAcquired ? "Yes" : "No"}
                    </td>
                    <td>
                      <span className="h3 text-blue-electric"> Resolved?</span>
                      <br />
                      <Toggle
                        defaultChecked={resolved}
                        onChange={e => this.onResolve({ e, woundId: wound.id })}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetWounds: patientId => dispatch(startSetWounds(patientId)),
  startUpdateWound: ({ woundId, updates }) =>
    dispatch(startUpdateWound({ woundId, updates }))
});

const mapStateToProps = ({ wounds }) => ({
  wounds
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientPage);
