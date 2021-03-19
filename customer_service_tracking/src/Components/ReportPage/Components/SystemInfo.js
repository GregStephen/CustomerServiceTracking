import React from 'react';
import moment from 'moment';
import { Header } from '../../Global';


function SystemInfo({ system }) {
  return (
    <div className="widget col-5 mt-0">
      <Header title='System Info' />
      <div className="widget-list">
        <p>Day tank would be depleted: {moment(system.dayTankDepleted).format('L')}</p>
        <p>Nozzles: {system.nozzles}</p>
        <p>Spray Cycles: {system.sprayCycles}</p>
        <p>Spray Duration: {system.sprayDuration} seconds</p>
      </div>
      <h4>System Specifications</h4>
      <div className="widget-list">
        <p>Type: {system.systemInfo.type}</p>
        <p>Gallons: {system.systemInfo.gallons}</p>
        <p>Inches: {system.systemInfo.inches}</p>
      </div>

    </div>
  );
}

export default SystemInfo;
