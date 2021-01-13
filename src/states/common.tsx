import { ApolloProvider } from "@apollo/client";
import React, { createContext, useReducer, useEffect } from "react";
import reducer from "@/states/reducer";

export const CommonContext = createContext<any>(null);
export const init = (initialState: any) => {
  return initialState;
};

const CommonProvider = (props: any) => {
  const { client } = props;

  const initialState = {
    version: "v.0.0.0.1",
    client,
  };

  const [state, dispatch] = useReducer(reducer, initialState, init);

  // setTimeout(() => {
  //   dispatch({
  //     type: "RESET",
  //     payload: {
  //       msg: "123",
  //     },
  //   });
  // }, 5000);

  return (
    <CommonContext.Provider
      value={{
        ...state,
        a: "b",
        commonDispatch: dispatch,
      }}
    >
      <ApolloProvider client={client}>123321</ApolloProvider>
    </CommonContext.Provider>
  );
};

export default CommonProvider;
