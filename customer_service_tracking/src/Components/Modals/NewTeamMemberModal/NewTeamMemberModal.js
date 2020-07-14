import React from 'react';
import {
  Form, Button, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

const defaultTeamMember = {
  businessId: '',
  firstName: '',
  email: '',
};

class NewTeamMemberModal extends React.Component {
  static propTypes = {
    businessId: PropTypes.string.isRequired,
    toggleModalOpen: PropTypes.func.isRequired,
    addTeamMember: PropTypes.func.isRequired,
  }

  state = {
    newTeamMember: defaultTeamMember,
  }

  toggleModal = (e) => {
    const { toggleModalOpen } = this.props;
    toggleModalOpen(e);
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { newTeamMember } = this.state;
    const { addTeamMember, businessId } = this.props;
    newTeamMember.businessId = businessId;
    addTeamMember(newTeamMember);
    this.toggleModal();
  };

  formFieldStringState = (e) => {
    const tempTeamMember = { ...this.state.newTeamMember };
    tempTeamMember[e.target.id] = e.target.value;
    this.setState({ newTeamMember: tempTeamMember });
  };

  render() {
    const { newTeamMember } = this.state;
    return (
      <div className="NewTeamMemberModal">
        <Form onSubmit={this.formSubmit}>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="input"
                className="form-control"
                id="firstName"
                value={newTeamMember.firstName}
                onChange={this.formFieldStringState}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={newTeamMember.email}
                onChange={this.formFieldStringState}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Add Team Member</Button>{' '}
            <Button color="secondary" value="info" onClick={this.toggleModal}>Cancel</Button>          </ModalFooter>
        </Form>
      </div>
    );
  }
}

export default NewTeamMemberModal;
