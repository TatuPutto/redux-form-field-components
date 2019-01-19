import React from 'react'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import RadioButton from '../src/RadioButton'
import RadioButtonTestForm from '../test-helpers/RadioButtonTestForm'
import { findChangeActionPayload, mockInput } from '../test-helpers/utils'

describe('RadioButton', () => {

  const mockStore = configureStore()
  let store
  let props

  beforeEach(() => {
    store = mockStore()
    props = {
      ...mockInput({}),
      name: 'role',
      checkedValue: 'admin',
    }
  })

  it('renders children (string)', () => {
    const wrapper = shallowWrapper()
    expect(wrapper.text()).toBe('Admin')
  })

  it('renders children (component)', () => {
    const wrapper = shallow(
      <RadioButton {...props}>
        <span>Admin</span>
      </RadioButton>
    )
    expect(wrapper.text()).toBe('Admin')
  })

  it('renders children (function)', () => {
    const wrapper = shallow(
      <RadioButton {...props}>
        {() => (
          <span>Admin</span>
        )}
      </RadioButton>
    )
    expect(wrapper.text()).toBe('Admin')
  })

  it('does not convert boolean values to string onChange', () => {
    const wrapper = mount(
      <Provider store={store}>
        <RadioButtonTestForm initialValues={{ fixedPeriod: false }} />
      </Provider>
    )

    // simulate redux-form onChange event
    wrapper.find('input').simulate('change')

    // find @@redux-form/CHANGE action payload
    const changeActionPayload = findChangeActionPayload(store)

    expect(typeof changeActionPayload).toBe('boolean')
    expect(changeActionPayload).toBe(true)
  })

  it('sets `active` class for label when field value equals `props.checkedValue`', () => {
    setProps({ ...mockInput('customer'), checkedValue: 'customer' })
    const wrapper = shallowWrapper()
    const labelWrapper = wrapper.find('label')
    expect(labelWrapper.hasClass('active')).toBe(true)
  })

  it('sets `disabled` class for label when `props.disabled` is true', () => {
    setProps({ disabled: true })
    const wrapper = shallowWrapper()
    const labelWrapper = wrapper.find('label')
    expect(labelWrapper.hasClass('disabled')).toBe(true)
  })

  it('disables radio when `props.disabled` is true', () => {
    setProps({ disabled: true })
    const wrapper = shallowWrapper()
    const radioWrapper = wrapper.find('input')
    expect(radioWrapper.props().disabled).toBe(true)
  })

  it('sets `btn-${size}` class for label if `props.size` is passed', () => {
    setProps({ size: 'lg' })
    const wrapper = shallowWrapper()
    const labelWrapper = wrapper.find('label')
    expect(labelWrapper.hasClass('btn-lg')).toBe(true)
  })

  ////

  const shallowWrapper = () => {
    return shallow(
      <RadioButton {...props}>
        Admin
      </RadioButton>
    )
  }

  const setProps = (modifiedProps) => {
    props = { ...props, ...modifiedProps }
  }

})
