import React from 'react';

const UserContext = React.createContext({
  id: '',
  admin: false,
  business: {},
  businessId: '',
  businessName: '',
  firstName: '',
  lastName: '',
});

UserContext.displayName = 'UserContext';
export default UserContext;
