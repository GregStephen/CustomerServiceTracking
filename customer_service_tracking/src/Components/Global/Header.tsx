import React from 'react';

interface Props {
  icon?: string;
  title: string;
  subTitle?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

function Header({
  icon,
  title,
  subTitle,
  description,
  children,
}: Props) {
  return (
    <div className="Header">
      <h1 className="header-title font-weight-bold pt-2">
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
