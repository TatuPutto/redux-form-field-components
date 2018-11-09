import React from 'react'
import { bool, object, number } from 'prop-types'

const Checkbox = (props) => {
  const {
    input,
    disabled,
    tabIndex,
  } = props

  return (
    <input
      {...input}
      type="checkbox"
      id={input.name}
      checked={input.value === true}
      disabled={disabled}
      tabIndex={tabIndex}
    />
  )
}

Checkbox.defaultProps = {
  disabled: false,
  tabIndex: null
}

Checkbox.propTypes = {
  input: object.isRequired,
  disabled: bool,
  tabIndex: number
}

export default Checkbox
