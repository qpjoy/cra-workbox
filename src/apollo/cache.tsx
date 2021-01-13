import {
  InMemoryCache,
  Reference,
  defaultDataIdFromObject,
} from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import { AUTH_TOKEN } from '@/utils/constants';

export const cache: InMemoryCache = new InMemoryCache({
  dataIdFromObject: (object) => {
    let objectKey: any = '';
    switch (object.__typename) {
      case 'DisplayUserInfo':
        objectKey = object['userID'];
        break;
      default:
        objectKey =
          defaultDataIdFromObject(object) ||
          `${object.__typename}: ${object._id}`;
    }
    return objectKey;
  },
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        allPosts: concatPagination(),
      },
    },
  },
  possibleTypes: {
    Node: [
      'Client',
    ],
    AttendeesAllResult: ['AttendeesAll', 'ErrorMessage'],
  },
});

export const isLoggedInVar = cache.makeVar<boolean>(
  !!localStorage.getItem(AUTH_TOKEN),
);
export const cartItemsVar = cache.makeVar<string[]>([]);
export const getLoginLoadingVar = cache.makeVar(false);
export const resetInfoVar = cache.makeVar({} as any);
export const registerInfoVar = cache.makeVar({} as any);
export const userInfoVar = cache.makeVar({} as any);