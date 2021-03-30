import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../Global';
import UserContext from '../../../Contexts/UserContext';

function NeedingServiceWidget() {
  const user = useContext(UserContext);
  return (
    <div className="widget">
      <Header title="Properties Needing Services" />
      <Link to='/jobs'>Assign Jobs</Link>
      <p>{user?.id}</p>
    </div>
  );
}

export default NeedingServiceWidget;
