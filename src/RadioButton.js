import React from 'react'
import { bool, func, object, oneOfType, string } from 'prop-types'
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

  const checked = input.value === checkedValue
  const labelClassName = classnames('btn btn-outline-secondary', {
    "active": checked,
    "disabled": disabled,
    [`btn-${size}`]: size,
  })

  return (
    <label htmlFor={id || null} className={labelClassName}>
      <input
        type="radio"
        id={id || null}
        checked={checked}
        disabled={disabled}
        value={checkedValue}
        onChange={() => input.onChange(checkedValue)}
      />
      {typeof children === 'function' ? children() : children}
    </label>
  )
}

RadioButton.propTypes = {
  input: object.isRequired,
  checkedValue: oneOfType([bool, string]).isRequired,
  children: oneOfType([func, object, string]).isRequired,
  disabled: bool,
  id: string,
  size: string
}

RadioButton.defaultProps = {
  disabled: false
}

export default RadioButton
