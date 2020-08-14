export function makeActionCreator(type, ...rest) {
  return (...args) => {
    const action = rest.reduce((results, value, idx) => (
      Object.assign({}, results, { [value]: args[idx] })
    ), { type });
    return action;
  };
}
