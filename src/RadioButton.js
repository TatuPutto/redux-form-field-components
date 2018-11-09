import React from 'react'
import { bool, object, oneOfType, string } from 'prop-types'
import classnames from 'classnames'

const RadioButton = (props) => {
  const {
    input,
    children,
    checkedValue,
    disabled,
    id,
    size,
  } = props

  console.log('RadioButton', input);

  const value = checkedValue || children.trim().toLowerCase()
  const checked = input.value === value
  const labelClassName = classnames('btn btn-outline-secondary', {
    "active": checked,
    "disabled": disabled,
    [`btn-${size}`]: size,
  })

  return (
    <label htmlFor={id} className={labelClassName}>
      <input
        {...input}
        type="radio"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={() => input.onChange(value)}
      />
      {children}
    </label>
  )
}

RadioButton.defaultProps = {
  disabled: false
}

RadioButton.propTypes = {
  input: object.isRequired,
  children: oneOfType([object, string]).isRequired,
  id: string.isRequired,
  checkedValue: string,
  disabled: bool,
  size: string
}

export default RadioButton
