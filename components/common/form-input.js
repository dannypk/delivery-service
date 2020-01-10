import React from 'react';
import PropTypes from 'prop-types';

import './form-input.less';

const FormInput = ({ onChange, value, placeholder, label }) => (
  <div className="FormInput">
    <label className="FormInput-label">{label}:</label>
    <input
        onChange={event => onChange(event.target.value)}
        value={value}
        placeholder={placeholder}
      />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string
};

FormInput.defaultProps = {
  placeholder: ''
};

export default FormInput;