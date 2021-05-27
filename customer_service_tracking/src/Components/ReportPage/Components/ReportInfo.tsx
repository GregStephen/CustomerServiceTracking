import React from 'react';
import moment from 'moment';
import { Header } from '../../Global';

interface Props {
  report: Property.Report;
}
function ReportInfo({ report }: Props) {
  return (
    <div className="widget col-5 mt-0">
      <Header title="Report Info" />
      <div className="widget-list">
        <p>Time Submitted: { moment.utc(report.serviceDate).local().format('LLL')}</p>
        <p>Service Type: {report.type}</p>
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
