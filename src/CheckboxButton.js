import React from 'react'
import { bool, object, oneOfType, number, string } from 'prop-types'
import classnames from 'classnames'

const CheckboxButton = (props) => {
  const {
    input,
    children,
    disabled,
    multiline,
    size,
    transparent,
    tabIndex,
  } = props
  
  const checked = input.value === true
  const labelClassName = classnames('clickable', {
    'btn btn-outline-secondary': !transparent,
    'btn-multiline text-left': multiline,
    [`btn-${size}`]: size,
    'active': checked,
    'disabled': disabled
  })

  return (
    <div className="form-group">
      <label htmlFor={input.name} className={labelClassName}>
        <input
          {...input}
          type="checkbox"
          id={input.name}
          checked={checked}
          disabled={disabled}
          tabIndex={tabIndex}
        />
        {children}
      </label>
    </div>
  )
}

CheckboxButton.defaultProps = {
  disabled: false,
  multiline: false,
  tabIndex: null,
  transparent: false
}

CheckboxButton.propTypes = {
  input: object.isRequired,
  children: oneOfType([object, string]).isRequired,
  disabled: bool,
  multiline: bool,
  size: string,
  tabIndex: number,
  transparent: bool
}

export default CheckboxButton
