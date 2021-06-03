import React from 'react';
import { Header } from '../Global';
import { usePropertySystemChangeLog } from '../../Helpers/Data/PropertyRequests';
import ChangeLogTable from '../ChangeLog/ChangeLogTable';

function PropertySystemChangeLog() {
  const changeLog = usePropertySystemChangeLog();

  return (
    <div className="widget col-10 mb-4 mt-0 pt-0">
      <Header title="Change Log" icon="fa-exchange-alt" />
      <ChangeLogTable entityName="PropertySystem" logData={changeLog.data} />
    </div>
  );
}

export default PropertySystemChangeLog;
