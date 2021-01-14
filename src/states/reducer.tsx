import { init } from "@/states/common";

function reducer(state: any, action: any) {
  const { type, payload } = action;
  const initialState = { ...state };
  const { commonInfo } = state;
  console.log(
    initialState,
    action,
    commonInfo,
    " - - - - - - this is initialState"
  );

  switch (type) {
    case "VERSION":
      return {
        ...state,
        version: action.version,
      };
    case "CLIENT":
      return {
        ...state,
        client: action.client,
      };
    case "RESET":
      return init(payload);
    default:
      state = { ...state, ...action };
      return state;
  }
}

export default reducer;
