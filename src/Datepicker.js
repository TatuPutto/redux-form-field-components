import React from 'react'
import { bool, object, oneOfType, string } from 'prop-types'
import moment from 'moment'
import { momentObj } from 'react-moment-proptypes'
import DatePicker from 'react-datepicker'

const DatePickerField = (props) =>  {
  const {
    input,
    alignPopperLeft = false,
    className = "form-control",
    disabled = false,
    label,
    maxDate = null,
    minDate = null,
    readOnly = false,
    required = false,
    toolTipText,
    valueDateFormat = "YYYY-MM-DD",
    meta: { error, warning }
  } = props

  const locale = moment().locale()
  const placeholder = props.placeholder ||
                      locale === 'FI' ? 'pp.kk.yyyy' : 'DD.MM.YYYY'


  console.log(<DatePicker
    locale={locale}
    className={className}
    disabled={disabled}
    readOnly={readOnly}
    showMonthDropdown
    showYearDropdown
    placeholderText={placeholder}
    dateFormat="DD.MM.YYYY"
    selected={input.value ? moment(input.value, valueDateFormat) : null}
    minDate={minDate ? moment(minDate, 'YYYY-MM-DD') : null}
    maxDate={maxDate ? moment(maxDate, 'YYYY-MM-DD') : null}
    popperPlacement={alignPopperLeft ? "bottom-end" : "bottom-start"}
    popperClassName={alignPopperLeft ? "react-datepicker-popper-align-left" : null}
    popperModifiers={{
      preventOverflow: {
        enabled: true,
        boundariesElement: "viewport"
      }
    }}
    onFocus={input.onFocus}
    onBlur={input.onBlur}
    onChange={input.onChange}
  />);

  return (
    <div>
      {label &&
        <div className="truncated">
          <label className="upper-label" data-tip={toolTipText}>
            {(error || warning) && required && input.value &&
              <span className="fas fa-asterisk text-danger" />
            }
            {!error && !warning && required && input.value &&
              <span className="fas fa-check text-success" />
            }
            {required && !input.value &&
              <span className="fas fa-asterisk text-danger" />
            }
            {label}
            {toolTipText &&
              <span className="fas fa-info-circle text-info ml-1" />
            }
          </label>
        </div>
      }
      <div style={{position: "relative"}}>
        <DatePicker
          locale={locale}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          showMonthDropdown
          showYearDropdown
          placeholderText={placeholder}
          dateFormat="DD.MM.YYYY"
          selected={input.value ? moment(input.value, valueDateFormat) : null}
          minDate={minDate ? moment(minDate, 'YYYY-MM-DD') : null}
          maxDate={maxDate ? moment(maxDate, 'YYYY-MM-DD') : null}
          popperPlacement={alignPopperLeft ? "bottom-end" : "bottom-start"}
          popperClassName={alignPopperLeft ? "react-datepicker-popper-align-left" : null}
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              boundariesElement: "viewport"
            }
          }}
          onChange={input.onChange}
        />
        {input.value && !disabled &&
          <button
            type="button"
            className="btn btn-link"
            tabIndex={-1}
            style={{
              position: "absolute",
              top: className.indexOf("lg") === -1 ? "0.4rem" : "0.55rem",
              right: "0.2rem",
              zIndex: 10,
              padding: "4px",
              fontSize: "0.7rem",
              color: "#5b5b5b"
            }}
            onClick={() => input.onChange(null)}
          >
            X
          </button>
        }
      </div>
    </div>
  );
};

DatePickerField.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  alignPopperLeft: bool,
  className: string,
  disabled: bool,
  label: string,
  maxDate: oneOfType([momentObj, string]),
  minDate: oneOfType([momentObj, string]),
  placeholder: string,
  readOnly: bool,
  required: bool,
  toolTipText: string,
  valueDateFormat: string
};

export default DatePickerField;
