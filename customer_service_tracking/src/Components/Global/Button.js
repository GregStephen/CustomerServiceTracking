import React from 'react';
import {
  Button as ReactstrapButton,
} from 'reactstrap';
import Ripples from 'react-ripples';

const Button = ({
  className,
  icon = '',
  color = 'secondary',
  loading = false,
  error = '',
  success = false,
  title = '',
}) => {
  let classes = (className ? ` ${className}` : '');

  classes += 'd-inline-flex align-items-center';

  const options = {
    color,
    icon,
  };

  if (success) {
    options.color = 'success';
    options.icon = 'fa-check';
  }

  if (loading) {
    options.icon = 'fa-spin fa-spinner-third';
  }

  if (error) {
    options.color = 'danger';
    options.icon = 'fa-times';
  }

  if (options.icon.length > 0) {
    options.icon += ' fa-fw ml-n1';
  }

  return (
    <Ripples>
      <ReactstrapButton color={options.color} className={classes}>
        {options.icon ? <i className={`fa ${options.icon}`} style={{ marginRight: 0 }} /> : null}
        {title}
      </ReactstrapButton>
    </Ripples>
  );
};

export default Button;
