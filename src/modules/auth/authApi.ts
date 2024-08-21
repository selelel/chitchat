import { LogInMutationDocument, LogOutQueryDocument, RefreshTokenQueryDocument, TestQueryDocument } from './authQuery';
import { baseApiWithGraphql } from '../graphql/graphqlBaseApi';
import { LoginUserInput, Mutation, Query } from '../graphql/graphqlTypes';
import { Parse_Message } from '@/helper/error';

export const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
  endpoints: (build) => ({
    LogIn: build.mutation<{loginUser: Mutation['loginUser']}, LoginUserInput>({
      query: (variables) => ({
        document: LogInMutationDocument,
        variables: { input: variables },  
      }),
      transformErrorResponse: (error) => {
        return {...error, message : Parse_Message(error)}
      }
    }),
    LogOut: build.mutation<Query['logoutDevice'], void>({
      query: () => ({
        document: LogOutQueryDocument,
      }),
    }),
  }),
  
})

export const { useLogInMutation, useLogOutMutation } = injectedRtkApi;
