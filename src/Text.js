import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const defaultStyles = {
  border: '1px solid whitesmoke',
  borderRadius: '3px'
}

const renderTextInput = (props) => {
  console.log(props);
  const {
    input,
    className,
    disabled,
    label,
    labelClassName,
    noAutoComplete,
    required,
    meta: { error, warning },
  } = props;

  /*
  {(error || warning) &&
    <span>*</span>
  }
  */

  return (
    <Fragment>
      {label &&
        <label htmlFor={input.name} className={labelClassName}>
          {required &&
            <span>{"* "}</span>
          }
          {label}
        </label>
      }
      <div>
        <input
          {...input}
          id={input.name}
          type="text"
          className={className}
          style={defaultStyles}
        />
      </div>
    </Fragment>
  );
}


renderTextInput.defaultProps = {
  noAutoComplete: false,
  className: "form-control",
  capitalize: false,
  labelClassName: "upper-label",
  required: true
  // disabled = false,
  // displayErrorMessage = false,
  // input,
  // label,
  // autoCompleteOff = false,
  // meta: { error, warning },
  // placeholder,
  // readOnly = false,
  // required,
  // style = null,
  // tabIndex = null,
  // uppercase = false
}

renderTextInput.propTypes = {
};



export default renderTextInput;
