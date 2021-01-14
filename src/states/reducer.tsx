function reducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case "LOCALE":
      return {
        ...state,
        locale: payload.locale,
      };
    case "VERSION":
      return {
        ...state,
        version: payload.version,
      };
    case "CLIENT":
      return {
        ...state,
        client: payload.client,
      };
    default:
      state = { ...state, ...action };
      return state;
  }
}

export default reducer;
