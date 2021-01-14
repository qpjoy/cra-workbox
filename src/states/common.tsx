import { ApolloProvider } from "@apollo/client";
import React, { createContext, useReducer, useEffect } from "react";
import reducer from "@/states/reducer";
import { IntlProvider } from "react-intl";
import Router from "@/router";

import i18n from "@/i18n";

export const CommonContext = createContext<any>(null);
// export const init = (initialState: any) => {
//   return initialState;
// };

const CommonProvider = (props: any) => {
  const { client } = props;

  const commonInfo = {
    version: "v.0.0.0.1",
  };

  const initialState = {
    commonInfo,
    locale: "en",
    client,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
        commonDispatch: dispatch,
      }}
    >
      <ApolloProvider client={client}>
        <IntlProvider locale={state.locale} messages={i18n[state.locale]}>
          <Router />
        </IntlProvider>
      </ApolloProvider>
    </CommonContext.Provider>
  );
};

export default CommonProvider;
