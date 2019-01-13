import { bool, func, object, string } from 'prop-types'
import AsyncSelect from 'react-select/lib/Async'
import createSelectize from './createSelectize'

const AsyncSelectize = createSelectize(AsyncSelect)

AsyncSelectize.propTypes = {
  input: object.isRequired,
  meta: object.isRequired,
  loadOptions: func.isRequired,
  backspaceRemovesValue: bool,
  convertValue: bool,
  defaultOptions: bool,
  isClearable: bool,
  isMulti: bool,
  onChange: func,
  placeholder: string
}

AsyncSelectize.defaultProps = {
  backspaceRemovesValue: false,
  convertValue: true,
  defaultOptions: false,
  isClearable: true,
  isMulti: false
}

export default AsyncSelectize
