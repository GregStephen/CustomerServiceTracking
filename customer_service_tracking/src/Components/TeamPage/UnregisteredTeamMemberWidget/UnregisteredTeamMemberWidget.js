import React from 'react';
import PropTypes from 'prop-types';

class UnregisteredTeamMemberWidget extends React.Component {
  static propTypes = {
    unregisteredTeamMember: PropTypes.object.isRequired,
  }

  render() {
    const { unregisteredTeamMember } = this.props;
    return (
      <div className="UnregisteredTeamMemberWidget">
        <p>Team Member Widget</p>
        <p>{unregisteredTeamMember.firstName}</p>
      </div>
    );
  }
}

export default UnregisteredTeamMemberWidget;
