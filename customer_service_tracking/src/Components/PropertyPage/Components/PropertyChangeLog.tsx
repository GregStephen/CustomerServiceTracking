import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../Global';
import { usePropertyChangeLog } from '../../../Helpers/Data/PropertyRequests';
import ChangeLogTable from '../../ChangeLog/ChangeLogTable';

function PropertyChangeLog() {
  const params = useParams<Routes.Property>();
  const changeLog = usePropertyChangeLog(params.propertyId);

  return (
    <div className="widget col-10 mb-4 mr-0 ml-0 mt-0 pt-0">
      <Header title="Change Log" icon="fa-exchange-alt" />
      <ChangeLogTable entityName="Property" logData={changeLog.data} />
    </div>
  );
}

export default PropertyChangeLog;
