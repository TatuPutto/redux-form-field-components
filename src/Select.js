import React from 'react'
import { array, bool, object, string } from 'prop-types'

const Select = (props) => {
  const {
    input,
    children,
    className,
    disabled,
    label,
    required,
    meta: { error, warning }
  } = props

  return (
    <div className="form-group">
      {label &&
        <label className="upper-label">
          {required && !error && !warning && input.value &&
            <span className="fas fa-check text-success" />
          }
          {(required && (error || warning || !input.value)) &&
            <span className="fas fa-asterisk text-danger" />
          }
          {label}
        </label>
      }
      <div>
        <select
          {...input}
          className={className}
          disabled={disabled}
        >
          {children}
        </select>
      </div>
    </div>
  )
}

Select.defaultProps = {
  className: "form-control",
  disabled: false
}

Select.propTypes = {
  input: object.isRequired,
  children: array.isRequired,
  meta: object.isRequired,
  className: string,
  disabled: bool,
  label: string,
  required: bool,
}

export default Select
