import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import { startSetPatients } from "./../actions/patients";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }

  componentDidMount() {
    const { startSetPatients } = this.props;
    startSetPatients().then(() => {
      this.setState(() => ({ loadingData: false }));
    });
  }
  render() {
    const { patients } = this.props;
    const { loadingData } = this.state;
    return loadingData ? (
      <p>Loading</p>
    ) : (
      <Layout>
        <h1 className="h2 text-dark-blue">Patients</h1>
        <table className="table table-striped">
          <tbody>
            {patients.map(patient => {
              const { id } = patient;
              const { firstName, lastName, avatarUrl } = patient.attributes;

              return (
                <tr key={id} className="flex justify-content--space-between align-items--center">
                  <td className="flex align-items--center">
                    <img src={avatarUrl} alt={`${firstName}'s Avatar`} className="mr2" />
                    <p className="h2 text-blue-electric">{`${firstName} ${lastName}`}</p>
                  </td>
                  <td>
                    <Link className="btn btn-primary btn-lg" to={`/patients/${id}`}>Select</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Layout>
    );
  }
}

const mapStateToProps = ({ patients }) => ({
  patients
});
const mapDispatchToProps = dispatch => ({
  startSetPatients: () => dispatch(startSetPatients())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
