import React from 'react';
import PropTypes from 'prop-types';

class UnregisteredTeamMemberWidget extends React.Component {
  static propTypes = {
    unregisteredTeamMembers: PropTypes.array.isRequired,
  }

  render() {
    const { unregisteredTeamMembers } = this.props;
    return (
      <div className="UnregisteredTeamMemberWidget widget">
        <h2>Unregistered Team</h2>
        {unregisteredTeamMembers.map((teamMember) => (
          <p>{teamMember.fullName}</p>
        ))
        }
      </div>
    );
  }
}

export default UnregisteredTeamMemberWidget;
