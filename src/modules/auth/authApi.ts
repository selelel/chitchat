import { LogInMutationDocument, LogOutQueryDocument, RefreshTokenQueryDocument, TestQueryDocument } from './authQuery';
import { baseApiWithGraphql } from '../graphql/graphqlBaseApi';
import { LoginUserInput, Mutation, Query } from '../graphql/graphqlTypes';

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    LogIn: build.mutation<{loginUser: Mutation['loginUser']}, LoginUserInput>({
      query: (variables) => ({
        document: LogInMutationDocument,
        variables: { input: variables },  
      }),
      transformErrorResponse: (error) => {
        return {...error, message : JSON.stringify(error.message).replace('"', "").split(':')[0]}
      }
    }),
    LogOut: build.mutation<Query['logoutDevice'], void>({
      query: () => ({
        document: LogOutQueryDocument,
      }),
    }),
    RefreshToken : build.mutation<{refresh: Query['refresh']}, void>({
      query: () => ({
        document: RefreshTokenQueryDocument,
      }),
    })
  }),
  
})

export const { useLogInMutation, useLogOutMutation, useRefreshTokenMutation} = injectedRtkApi;
