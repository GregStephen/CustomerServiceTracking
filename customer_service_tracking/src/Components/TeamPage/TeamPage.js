import React from 'react';
import {
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { Page, Header } from '../Global';
import AddTeamMemberModal from '../Modals/NewTeamMemberModal/NewTeamMemberModal';
import UnregisteredTeamMemberWidget from './UnregisteredTeamMemberWidget/UnregisteredTeamMemberWidget';
import RegisteredTeamMemberWidget from './RegisteredTeamMemberWidget/RegisteredTeamMemberWidget';

import BusinessRequests from '../../Helpers/Data/BusinessRequests';
import UserRequests from '../../Helpers/Data/UserRequests';

import './TeamPage.scss';

class TeamPage extends React.Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    userObj: PropTypes.object.isRequired,
  }

  state = {
    unregisteredTeamMembers: [],
    registeredTeamMembers: [],
    modalIsOpen: false,
  }

  pageLoad = () => {
    const { userObj } = this.props;
    BusinessRequests.getUnregisteredEmployees(userObj.businessId)
      .then((unregisteredTeamMembers) => this.setState({ unregisteredTeamMembers }))
      .catch((err) => console.error(err));
    BusinessRequests.getRegisteredEmployees(userObj.businessId)
      .then((registeredTeamMembers) => this.setState({ registeredTeamMembers }))
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
    UserRequests.addUnregisteredEmployee(teamMember)
      .then(this.pageLoad())
      .catch((err) => console.error(err));
  }

  render() {
    const { unregisteredTeamMembers, registeredTeamMembers } = this.state;
    const { userObj } = this.props;
    const { businessId } = userObj;

    return (
      <Page>
        <div className="TeamPage">
          <Header title='Team' icon='fa-users' />
          <div className="d-flex row justify-content-end">
            <button className="btn btn-info mr-4 mb-4" onClick={this.toggleModalOpen}><i className="fa fa-user-plus"/>Add a Team Member</button>
          </div>
          {registeredTeamMembers.length > 0
            && <RegisteredTeamMemberWidget
              registeredTeamMembers={registeredTeamMembers} />}
          {unregisteredTeamMembers.length > 0
            && <UnregisteredTeamMemberWidget
              unregisteredTeamMembers={unregisteredTeamMembers} />}
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
      </Page>
    );
  }
}

export default TeamPage;
