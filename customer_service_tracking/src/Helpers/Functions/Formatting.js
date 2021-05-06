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

const formatAddressIntoQuery = (addressObj) => `${addressObj.addressLine1.replace(/\s/g, '+')}${addressObj.addressLine2 ? `+ ${addressObj.addressLine2.replace(/\s/g, '+')}` : ''}+${addressObj.city}+${addressObj.state}+${addressObj.zipCode}`;

const formatContactInfo = (customerObj) => {
  const createEmails = () => {
    if (customerObj.emails) {
      return customerObj.emails.map((email) => (
      <p>{email}</p>
      ));
    }
    return '';
  };
  const createPhoneNumbers = () => {
    if (customerObj.phoneNumbers) {
      return customerObj.phoneNumbers.map((number) => (
        <p>{formatPhoneNumber(number.number)}</p>
      ));
    }
    return '';
  };
  return (
  <div>
      {createEmails()}
      {createPhoneNumbers()}
  </div>
  );
};

export default {
  formatPhoneNumber,
  directionLink,
  formatAddressObj,
  formatContactInfo,
  formatAddressIntoQuery,
};
