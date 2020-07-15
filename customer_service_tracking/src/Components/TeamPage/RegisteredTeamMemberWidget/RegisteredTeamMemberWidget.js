import React from 'react';
import PropTypes from 'prop-types';

class RegisteredTeamMemberWidget extends React.Component {
  static propTypes = {
    registeredTeamMember: PropTypes.object.isRequired,
  }

  render() {
    const { registeredTeamMember } = this.props;
    return (
      <div className="RegisteredTeamMemberWidget">
        <p>Team Member Widget</p>
        <p>{registeredTeamMember.firstName}</p>
      </div>
    );
  }
}

export default RegisteredTeamMemberWidget;
