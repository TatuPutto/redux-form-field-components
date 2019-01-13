import { array, bool, func, object, string } from 'prop-types'
import Select from 'react-select'
import createSelectize from './createSelectize'

const Selectize = createSelectize(Select)

Selectize.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  options: array.isRequired,
  backspaceRemovesValue: bool,
  convertValue: bool,
  isClearable: bool,
  isMulti: bool,
  onChange: func,
  placeholder: string
}

Selectize.defaultProps = {
  backspaceRemovesValue: false,
  convertValue: true,
  isClearable: true,
  isMulti: false
}

export default Selectize
