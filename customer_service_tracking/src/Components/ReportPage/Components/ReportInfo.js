import React from 'react';
import moment from 'moment';
import { Header } from '../../Global';


function ReportInfo({ report }) {
  return (
    <div className="widget col-5 mt-0">
      <Header title={report.systemName} />
      <div className="widget-list">
        <p>Time Submitted: { moment(report.serviceDate).format('LLL')}</p>
        <p>Property: {report.property.displayName}</p>
        <p>Type: {report.type}</p>
        <p>Technician: {report.technician}</p>

        <p>Amount Remaining: {report.amountRemaining} inches</p>
        <p>Water Added: {report.inchesAdded} inches</p>
        <p>Solution Added: {report.solutionAdded}</p>
        {report.notes
          && <p>Notes: {report.notes}</p>
        }
      </div>
    </div>
  );
}

export default ReportInfo;
