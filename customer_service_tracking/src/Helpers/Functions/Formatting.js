import React from 'react';

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = (`${phoneNumberString}`).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

const directionLink = (addressObj) => {
  let addressStringToReturn = '';
  const addressString1 = addressObj?.addressLine1?.replace(/\s/g, '+');
  const city = addressObj?.city?.replace(/\s/g, '+');
  const state = addressObj?.state?.replace(/\s/g, '+');
  const zip = addressObj?.zipCode?.replace(/\s/g, '+');
  addressStringToReturn = `${addressString1}+${city}+${state}+${zip}`;
  return `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${addressStringToReturn}`;
};

const formatAddressObj = (addressObj) => (
    <div>
    <p>{addressObj.addressLine1}</p>
    {addressObj.addressLine2
      && <p>{addressObj.addressLine2}</p>
    }
    <p>{addressObj.city}, {addressObj.state} {addressObj.zipCode}</p>
    </div>
);

export default { formatPhoneNumber, directionLink, formatAddressObj };