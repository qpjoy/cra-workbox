function reducer(state: any, action: any) {
  const { type, payload } = action;
  const initialState = { ...state };
  console.log(initialState, action, " - - - - - - this is initialState");
  switch (type) {
    case "RESET":
      state.env = "dev";
      break;
    default:
      state = { ...state, ...action };
      return state;
  }

  return { ...state };
}

export default reducer;
