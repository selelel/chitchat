import { BaseQueryApi, createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { ClientError, GraphQLClient } from 'graphql-request';
import { HOST } from '@/constants/host';
import { LOCALSTORAGE } from '@/constants/localstorage';
const getHeaders = () => {
  const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

const client = new GraphQLClient(HOST.GRAFBASE);
const graphqlBaseQuery = graphqlRequestBaseQuery({ client });

const dynamicBaseQuery = async (args: any, api: BaseQueryApi, extraOptions: Partial<Pick<ClientError, "request" | "response">>) => {
  client.setHeaders(getHeaders());
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
