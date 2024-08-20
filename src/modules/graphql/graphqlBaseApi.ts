import { BaseQueryApi, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { ClientError, GraphQLClient } from 'graphql-request';
import { HOST } from '@/constants/host';
import { RootState } from '@/lib/store';
import { getAccessToken, selectAccessToken } from '@/lib/features/app/appSlice';

const client = new GraphQLClient(HOST.GRAPHQL_URI, { credentials: 'include' });

const graphqlBaseQuery = graphqlRequestBaseQuery({ client });

const dynamicBaseQuery = async (args: any, api: BaseQueryApi, extraOptions: Partial<Pick<ClientError, "request" | "response">>) => {
  const state = api.getState() as RootState;
  const token = selectAccessToken(state);

  client.setHeaders({
    Authorization: token ? `Bearer ${token}` : '',
  });

  try {
    return await graphqlBaseQuery(args, api, extraOptions);
  } catch (error) {
    throw error;
  }
};

export const baseApiWithGraphql = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});

