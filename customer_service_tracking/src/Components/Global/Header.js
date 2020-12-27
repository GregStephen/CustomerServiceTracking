import React from 'react';

function Header({ header }) {
  return (
    <div className="Header col-12 row justify-content-start">
      <h1>{header}</h1>
    </div>
  );
}

export default Header;
