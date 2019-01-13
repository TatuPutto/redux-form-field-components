import React, { PureComponent } from 'react'
import { bool, func, object } from 'prop-types'

const createSelectize = (WrappedSelectize) => {
  return class Selectize extends PureComponent {
    static propTypes = {
      input: object.isRequired,
      meta: object.isRequired,
      convertValue: bool,
      isMulti: bool,
      includeValueAsSubLabel: bool,
      onChange: func,
    };

    static defaultProps = {
      isMulti: false,
      convertValue: true
    };

    createIdNamePair = (option) => {
      return {
        id: option.value,
        name: option.label
      }
    }

    createOption = (object) => {
      return {
        value: object.id,
        label: object.name
      }
    }

    convertValueToOptions = () => {
      const { input, convertValue, isMulti } = this.props
      const value = input.value

      if (!convertValue) {
        return value
      }

      if (isMulti) {
        if (Array.isArray(value)) {
          return value.map(this.createOption)
        } else {
          return []
        }
      }

      if (value) {
        return this.createOption(value)
      }
    }

    handleChange = (newValue) => {
      const {
        input,
        convertValue,
        isMulti,
        onChange
      } = this.props

      if (onChange) {
        return onChange(newValue)
      }

      if (!convertValue) {
        return input.onChange(newValue)
      }

      if (isMulti) {
        return input.onChange(newValue.map(this.createIdNamePair))
      }

      if (newValue) {
        return input.onChange(this.createIdNamePair(newValue))
      } else {
        return input.onChange(null)
      }
    }

    createCustomOptionLabel = (option, { context }) => {
      if (context === 'menu') {
        return (
          <div key={option.value}>
            <div>{option.label}</div>
            <small>{option.value}</small>
          </div>
        )
      } else {
        return (
          <div key={option.value}>
            <div>{option.label}</div>
          </div>
        )
      }
    }

    render() {
      return (
        <WrappedSelectize
          {...this.props}
          value={this.convertValueToOptions()}
          formatOptionLabel={this.props.includeValueAsSubLabel ? this.createCustomOptionLabel : null}
          onChange={this.handleChange}
        />
      )
    }
  }
}

export default createSelectize
