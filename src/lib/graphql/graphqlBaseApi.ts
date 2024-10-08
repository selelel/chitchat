import { createApi, BaseQueryApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient, ClientError } from 'graphql-request';
import { AppDispatch, RootState } from '@/lib/store';
import { refreshToken, selectAccessToken } from '@/lib/features/app/appSlice';
import { Parse_Message } from '@/helper/error';
import { GRAPHQL_URI } from '@/config/env';

const client = new GraphQLClient(GRAPHQL_URI, { credentials: 'include' });

const setAuthorizationHeader = (token: string | undefined) => {
  client.setHeaders({
    Authorization: token ? `Bearer ${token}` : '',
  });
};

const graphqlBaseQuery = graphqlRequestBaseQuery({ client });


// this would be the middleware whenever the accesstoken is expired.
const dynamicBaseQuery = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: Partial<Pick<ClientError, 'request' | 'response'>>
) => {
  const state = api.getState() as RootState;
  const token = selectAccessToken(state);

  setAuthorizationHeader(token);

  let result = await graphqlBaseQuery(args, api, extraOptions);

  if (result.error) {
    const parsedMessage = await Parse_Message(result.error);

    if (parsedMessage === 'jwt expired') {
      const dispatch = api.dispatch as AppDispatch;
      try { 
        await dispatch(refreshToken()).unwrap();

        const newState = api.getState() as RootState;
        const newToken = selectAccessToken(newState);
        setAuthorizationHeader(newToken);

        result = await graphqlBaseQuery(args, api, extraOptions);
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw error;
      }
    }
  }

  return result;
};

export const baseApiWithGraphql = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});
