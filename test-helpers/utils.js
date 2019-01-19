// mock props passed by Field component
export const mockInput = (modifiedValues) => {
  return {
    input: {
      onChange: jest.fn(),
      value: modifiedValues
    }
  }
}

// find @@redux-from/CHANGE action payload
export const findChangeActionPayload = (store, occurence = 0) => {
  const changeActions = findChangeActions(store)
  return changeActions[occurence] && changeActions[occurence].payload || undefined
}

// find sent @@redux-from/CHANGE actions
export const findChangeActions = (store) => {
  return store.getActions().filter(action => action.type === '@@redux-form/CHANGE')
}
