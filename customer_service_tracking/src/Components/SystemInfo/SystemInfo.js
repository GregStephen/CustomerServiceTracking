import React from 'react';
import ServiceOptionEnums from '../../Helpers/Enums/ServiceOptionEnums.ts';
import { Header } from '../Global';

function SystemInfo({ system }) {
  return (
    <div className="widget col-5 mt-0">
      <Header title='System Info' />
      <div className="widget-list">
        <p>Nozzles: {system.nozzles}</p>
        <p>Spray Cycles: {system.sprayCycles}</p>
        <p>Spray Duration: {system.sprayDuration} seconds</p>
        <p>Service Interval: {ServiceOptionEnums[system.serviceOptionId]}</p>
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
