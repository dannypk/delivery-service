import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './button.less';

const Button = ({ className, label, onClick }) => (
  <button type="button" className={classnames('Button', className)} onClick={() => onClick()}>
    {label}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  className: ''
};

export default Button;