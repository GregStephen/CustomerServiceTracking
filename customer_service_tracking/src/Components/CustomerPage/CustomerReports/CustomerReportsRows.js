import React from 'react';
import PropTypes from 'prop-types';

class CustomerReportsRows extends React.Component {
  static propTypes = {
    customerReport: PropTypes.object.isRequired,
  }

  render() {
    const { customerReport } = this.props;
    return (
      <tr>
        <td>{customerReport.serviceDate}</td>
        <td>{customerReport.type}</td>
        <td>{customerReport.technician}</td>
      </tr>
    );
  }
}

export default CustomerReportsRows;
