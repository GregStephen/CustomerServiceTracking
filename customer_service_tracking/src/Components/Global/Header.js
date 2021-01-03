import React from 'react';

function Header({
  icon,
  title,
  subTitle,
  description,
  children,
}) {
  return (
    <div className="Header">
      <h1 className="header-title font-weight-bold mt-4">
        <i className={`header-icon fas mr-3 ${icon}`} />
        {title}
        {subTitle && <span className="fw-300">{subTitle}</span>}
        {description && <small className="header-description">{description}</small>}
      </h1>
      {children && <div className="header-block mt-3 mt-lg-0">{children}</div>}
    </div>
  );
}

export default Header;
