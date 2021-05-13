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

const splitCamelCase = (input) => {
  let output = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < input.length - 1; i++) {
    const thisChar = input[i];
    const nextChar = input[i + 1];

    output += thisChar;
    if (isNaN(Number(thisChar)) && isNaN(Number(nextChar))) {
      if (thisChar === thisChar.toLowerCase() && nextChar === nextChar.toUpperCase()) {
        output += ' ';
      } else if (thisChar === thisChar.toUpperCase() && nextChar === nextChar.toUpperCase()) {
        if (i < input.length - 2) {
          const nextNextChar = input[i + 2];
          if (isNaN(Number(nextNextChar)) && nextNextChar === nextNextChar.toLowerCase()) {
            output += ' ';
          }
        }
      }
    }
    if (i === input.length - 2) {
      output += nextChar;
    }
  }
  return output.trim();
};

export default {
  formatPhoneNumber,
  directionLink,
  formatAddressObj,
  formatContactInfo,
  formatAddressIntoQuery,
  splitCamelCase,
};
