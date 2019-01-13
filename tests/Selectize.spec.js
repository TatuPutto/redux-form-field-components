import React from 'react'
import { shallow } from 'enzyme'
import { Selectize } from '../src'

describe('RFAsyncSelect', () => {

  let props

  beforeEach(() => {
    props = {
      ...mockInput({}),
      meta: { error: null },
      isMulti: false,
      convertValue: true,
      options: [],
      placeholder: '',
      onChange: undefined
    }
  })

  describe('.convertValueToOptions()', () => {

    it('converts `input.value` to React-Select compatible option if ' +
       '`props.convertValue` is true and `props.isMulti` is false', () => {
      setProps({ ...mockInput({ id: 1, name: 'Takamäki Yhtiöt Ky' }) })

      const expectedValue = { value: 1, label: 'Takamäki Yhtiöt Ky' }
      const wrapper = shallowWrapper()
      const convertedValue = wrapper.instance().convertValueToOptions()

      expect(convertedValue).toEqual(expectedValue)
    })

    it('converts `input.value` to React-Select compatible option if ' +
       '`props.convertValue` is true and `props.isMulti` is true', () => {
      setProps({
        ...mockInput([
          { id: 1, name: 'Takamäki Yhtiöt Ky' },
          { id: 2, name: 'Fira Oy' }
        ]),
        isMulti: true
      })

      const expectedValue = [
        { value: 1, label: 'Takamäki Yhtiöt Ky' },
        { value: 2, label: 'Fira Oy' }
      ]
      const wrapper = shallowWrapper()
      const convertedValue = wrapper.instance().convertValueToOptions()

      expect(convertedValue).toEqual(expectedValue)
    })

    it('returns `input.value` as is if `props.convertValue` is false', () => {
      setProps({
        ...mockInput({ value: 1, label: 'Takamäki Yhtiöt Ky' }),
        convertValue: false
      })

      const expectedValue = { value: 1, label: 'Takamäki Yhtiöt Ky' }
      const wrapper = shallowWrapper()
      const nonConvertedValue = wrapper.instance().convertValueToOptions()

      expect(nonConvertedValue).toEqual(expectedValue)
    })

  })

  describe('.handleChange()', () => {

    it('converts selected options to ID-name pairs on change if ' +
       '`props.onChange` is undefined and `props.isMulti` is true', () => {
      setProps({ isMulti: true })

      const expectedValues = [
        { id: 1, name: 'Takamäki Yhtiöt Ky' },
        { id: 2, name: 'Fira Oy' }
      ]
      const wrapper = shallowWrapper()

      wrapper.instance().handleChange([
        { value: 1, label: 'Takamäki Yhtiöt Ky' },
        { value: 2, label: 'Fira Oy' }
      ])
      expect(props.input.onChange).toHaveBeenCalledWith(expectedValues)
    })

    it('converts selected option to ID-name pair on change if ' +
       '`props.onChange` is undefined and `props.isMulti` is false', () => {
      const expectedValue = { id: 1, name: 'Takamäki Yhtiöt Ky' }
      const wrapper = shallowWrapper()

      wrapper.instance().handleChange({ value: 1, label: 'Takamäki Yhtiöt Ky' })
      expect(props.input.onChange).toHaveBeenCalledWith(expectedValue)

      wrapper.instance().handleChange()
      expect(props.input.onChange).toHaveBeenCalledWith(null)
    })

    it('calls `input.onChange` with unmodified options if `props.convertValue` ' +
       'is false and `props.onChange` undefined', () => {
      setProps({ convertValue: false })

      const expectedValue = { value: 1, label: 'Takamäki Yhtiöt Ky' }
      const wrapper = shallowWrapper()

      wrapper.instance().handleChange({ value: 1, label: 'Takamäki Yhtiöt Ky' })

      expect(props.input.onChange).toHaveBeenCalledWith(expectedValue)
    })

    it('calls `props.onChange` with selected option(s) if `props.onChange` is specified', () => {
      setProps({ onChange: jest.fn(), isMulti: true })

      const expectedValue = { value: 1, label: 'Takamäki Yhtiöt Ky' }
      const wrapper = shallowWrapper()

      wrapper.instance().handleChange({ value: 1, label: 'Takamäki Yhtiöt Ky' })

      expect(props.input.onChange).not.toHaveBeenCalled()
      expect(props.onChange).toHaveBeenCalledWith(expectedValue)

      wrapper.instance().handleChange([])

      expect(props.input.onChange).not.toHaveBeenCalled()
      expect(props.onChange).toHaveBeenCalledWith([])
    })

  })

  ////

  const shallowWrapper = () => {
    return shallow(<Selectize {...props} />)
  }

  const setProps = (modifiedProps) => {
    props = { ...props, ...modifiedProps }
  }

  const mockInput = (modifiedValues) => {
    return {
      input: {
        onChange: jest.fn(),
        value: modifiedValues
      }
    }
  }

})
