import { ApolloClient, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";

import { getIn } from "@/utils/index";
import { cache } from "./cache";

export function apolloSetClient(options: any) {
  const { api } = options;
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError((error) => {
        const { graphQLErrors, networkError } = error;
        if (graphQLErrors) {
          for (let err of graphQLErrors) {
            const { message, locations, path } = err;
            const errcode = getIn(err, "extensions", "errcode");
            if (errcode && (errcode === 1029 || errcode === 1028)) {
              console.log("token校验过期！");
            }
          }
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),
      new RetryLink({
        delay: {
          initial: 300,
          max: Infinity,
          jitter: true,
        },
        attempts: (count, operation, error) => {
          console.log(`第${count}次重试${operation.operationName}`);
          return ["QueryTeamInvite", "QueryTeamInfo"].indexOf(
            operation.operationName
          ) > -1
            ? count < 6
            : !!error && count < 3;
        },
      }),

      setContext((_, { headers }) => {
        let token = "";
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      }),

      new HttpLink({
        uri: api,
      }),
    ]),
  });

  return client;
}
