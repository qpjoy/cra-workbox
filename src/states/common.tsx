import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

export const CommonContext = createContext<any>(null);

const CommonProvider = () => {
  const initialState = {
    version: "v.0.0.0.1",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  setTimeout(() => {
    dispatch({
      type: "RESET",
      payload: {
        msg: "123",
      },
    });
  }, 5000);

  return (
    <CommonContext.Provider
      value={{
        a: "b",
      }}
    >
      123
    </CommonContext.Provider>
  );
};

export default CommonProvider;
