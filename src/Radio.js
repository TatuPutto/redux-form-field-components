import React from 'react'
import { bool, object, string } from 'prop-types'
import classnames from 'classnames'

const Radio = (props) => {
  const {
    input,
    disabled,
    id,
    size,
    text,
    valueToSet
  } = props

  const checked = input.value === valueToSet
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
        onChange={() => input.onChange(valueToSet)}
      />
      {" " + text}
    </label>
  )
}

Radio.defaultProps = {
  disabled: false
}

Radio.propTypes = {
  input: object.isRequired,
  id: string.isRequired,
  text: string.isRequired,
  valueToSet: string.isRequired,
  disabled: bool,
  size: string
}

export default Radio
