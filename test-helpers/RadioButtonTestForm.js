import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderRadioButton from '../src/RadioButton'

const Form = () => (
  <form>
    <Field
      name="fixedPeriod"
      id="fixed"
      checkedValue={true}
      component={renderRadioButton}
    >
      {" Admin"}
    </Field>
  </form>
)

export default reduxForm({ form: 'radio-button-test-form' })(Form)
