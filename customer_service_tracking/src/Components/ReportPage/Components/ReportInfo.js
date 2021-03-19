import React from 'react';
import moment from 'moment';
import { Header } from '../../Global';


function ReportInfo({ report }) {
  return (
    <div className="widget col-5 mt-0">
      <Header title={`${report.property.displayName}: ${moment(report.serviceDate).format('L')}`} />
      <div className="widget-list">
      <p>Type: {report.type}</p>
      <p>Technician: {report.technician}</p>

      <p>Amount Remaining: {report.amountRemaining}</p>
      <p>Inches Added: {report.inchesAdded}</p>
      <p>Solution Added: {report.solutionAdded}</p>
      {report.notes
        && <p>Notes: {report.notes}</p>
        }
        </div>
    </div>
  );
}

export default ReportInfo;
