import React from 'react';
import PropTypes from 'prop-types';

class RegisteredTeamMemberWidget extends React.Component {
  static propTypes = {
    registeredTeamMembers: PropTypes.array.isRequired,
  }

  render() {
    const { registeredTeamMembers } = this.props;
    return (
      <div className="RegisteredTeamMemberWidget widget col-8 mb-4">
        <h2>Registered Team</h2>
        {registeredTeamMembers.map((teamMember) => (
          <p>{teamMember.fullName}</p>
        ))
        }
      </div>
    );
  }
}

export default RegisteredTeamMemberWidget;
