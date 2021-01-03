import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

// import defaults from '../../Helpers/defaults';
import SystemNeedingServiceRow from './SystemNeedingServiceRow/SystemNeedingServiceRow';

import BusinessRequests from '../../Helpers/Data/BusinessRequests';
import JobRequests from '../../Helpers/Data/JobRequests';

import './ServiceNeededReport.scss';


class ServiceNeededReport extends React.Component {
  static propTypes = {
    businessId: PropTypes.string.isRequired,
  }

  state = {
    systemsNeedingService: [],
    employeeOptions: [],
  }

  componentDidMount() {
    const { businessId } = this.props;
    JobRequests.getJobsNeedingAssignment(businessId)
      .then((systems) => this.setState({ systemsNeedingService: systems }))
      .catch((err) => console.error(err));
    BusinessRequests.getRegisteredEmployees(businessId)
      .then((employees) => this.setState({ employeeOptions: employees }))
      .catch((err) => console.error(err));
  }

  render() {
    const { systemsNeedingService, employeeOptions } = this.state;
    const showSystemsNeedingService = systemsNeedingService.map((systemNeedingService) => (
      <SystemNeedingServiceRow
        systemNeedingService={systemNeedingService}
        employeeOptions={employeeOptions}
        key={systemNeedingService.system.id}
      />
    ));

    return (
      <div className="ServiceNeededReport widget col-8">
        <h3>Customers needing service in the next 7 days</h3>
        <div>
          {systemsNeedingService.length > 0
            ? <Table striped size="sm">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Days until Empty</th>
                  <th>Tech Assigned</th>
                  <th>Assign Job</th>
                </tr>
              </thead>
              <tbody>
                {showSystemsNeedingService}
              </tbody>
            </Table>
            : <p>No one needs service this week!</p>
          }
        </div>
      </div>
    );
  }
}

// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';

// import ReportsTable from '../ReportsPage/ReportsTable/ReportsTable';

// import BusinessRequests from '../../Helpers/Data/BusinessRequests';
// import JobRequests from '../../Helpers/Data/JobRequests';
// import Formatting from '../../Helpers/Functions/Formatting';

// import './ServiceNeededReport.scss';

// function ServiceNeededReport({ businessId }) {
//   const [systemsNeedingService, getSystemsNeedingService] = useState();
//   const [employeeOptions, getEmployeeOptions] = useState();

//   useEffect(() => {
//     JobRequests.getJobsNeedingAssignment(businessId)
//       .then((systems) => getSystemsNeedingService(systems))
//       .catch((err) => console.error(err));
//     BusinessRequests.getRegisteredEmployees(businessId)
//       .then((employees) => getEmployeeOptions(employees))
//       .catch((err) => console.error(err));
//   });

//   const tableData = useMemo(() => (systemsNeedingService || []), [systemsNeedingService]);

//   const tableColumns = useMemo(() => [
//     {
//       Header: 'Customer',
//       accessor: (r) => r.customer,
//       Cell: (r) => <Link to={{ pathname: `/customer/${r.customer?.id}` }}>{`${r.customer?.firstName} ${r.customer?.lastName}`}</Link>,
//     },
//     {
//       Header: 'Address',
//       accessor: (r) => r.customer.address,
//       Cell: (r) => <a rel="noopener noreferrer" target="_blank" href={Formatting.directionLink(r.customer?.address)}>{r.customer?.address?.addressLine1}</a>,
//     },
//     {
//       Header: 'Days Until Empty',
//       accessor: (r) => r.customer.firstName,
//     },
//     {
//       Header: 'Tech Assigned',
//       accessor: (r) => r.type,
//     },
//     {
//       Header: 'Assign Job',
//       accessor: (r) => r.type,
//     },
//   ], []);
//   return (
//     <div className="ServiceNeededReport widget col-8">
//       <h3>Customers needing service in the next 7 days</h3>
//       <div className="col-10">
//         <ReportsTable
//           columns={tableColumns}
//           data={tableData}
//         />
//         </div>
//     </div>
//   );
// }

export default ServiceNeededReport;
