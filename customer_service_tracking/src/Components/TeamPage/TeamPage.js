import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';

import AddTeamMemberModal from '../Modals/NewTeamMemberModal/NewTeamMemberModal';
import TeamMemberWidget from './TeamMemberWidget/TeamMemberWidget';

import BusinessRequests from '../../Helpers/Data/BusinessRequests';

import './TeamPage.scss';

class TeamPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
  }

  state = {
    teamMembers: [],
    modalIsOpen: false,
  }

  pageLoad = () => {
    const { userObj } = this.props;
    BusinessRequests.getUnregisteredEmployees(userObj.businessId)
      .then((teamMembers) => this.setState({ teamMembers }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    // find employees of business
    this.pageLoad();
  }

  toggleModalOpen = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  }

  addTeamMember = (teamMember) => {
    BusinessRequests.addUnregisteredEmployee(teamMember)
      .then(this.pageLoad())
      .catch((err) => console.error(err));
  }

  render() {
    const { teamMembers } = this.state;
    const { userObj } = this.props;
    const { businessId } = userObj;
    const showTeamMembers = () => {
      if (teamMembers.length > 0) {
        return (
          teamMembers.map((teamMember) => (
            <TeamMemberWidget
            key={teamMember.id}
            teamMember={teamMember}
            />
          ))
        );
      }
      return <p>No team members to display, add some!</p>;
    };

    return (
      <div className="TeamPage">
        <h1>Team Page</h1>
        {showTeamMembers()}

        <button className="btn btn-info" onClick={this.toggleModalOpen}>Add a Team Member</button>
        <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModalOpen}>
          <ModalHeader toggle={this.modalIsOpen}>
            Add Team Member
          </ModalHeader>
            <AddTeamMemberModal
              toggleModalOpen={this.toggleModalOpen}
              businessId={businessId}
              addTeamMember={this.addTeamMember}
            />
        </Modal>
      </div>
    );
  }
}

export default TeamPage;
