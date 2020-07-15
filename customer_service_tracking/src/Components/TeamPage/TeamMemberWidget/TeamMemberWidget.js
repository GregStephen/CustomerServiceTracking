import React from 'react';

class TeamMemberWidget extends React.Component {
  render() {
    const { teamMember } = this.props;
    return (
      <div className="TeamMemberWidget">
        <p>Team Member Widget</p>
        <p>{teamMember.firstName}</p>
      </div>
    );
  }
}

export default TeamMemberWidget;
