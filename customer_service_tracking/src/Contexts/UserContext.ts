import React from 'react';

const UserContext = React.createContext({
  id: '',
  admin: false,
  business: {} as Business.Business,
  businessId: '',
  businessName: '',
  firstName: '',
  lastName: '',
});

UserContext.displayName = 'UserContext';
export default UserContext;
