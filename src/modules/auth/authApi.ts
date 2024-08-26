import { CheckUserExistsByEmailMutationDocument, LogInMutationDocument, LogOutQueryDocument, RefreshTokenQueryDocument, SignInMutationDocument, TestQueryDocument } from './authQuery';
import { baseApiWithGraphql } from '../graphql/graphqlBaseApi';
import { LoginUserInput, Mutation, Query, UserInput } from '../graphql/graphqlTypes';
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
    SignIn: build.mutation<{userInput: Mutation['registerUser']}, UserInput>({
      query: (variables) => ({
        document: SignInMutationDocument,
        variables: { input: variables },  
      }),
      transformErrorResponse: (error) => {
        // Address this!
        return {...error, message : Parse_Message(error)}
      }
    }),
    CheckUserExistsByEmail: build.mutation<{checkUserExistsByEmail: Mutation['checkUserExistsByEmail']}, String>({
      query: (variables) => ({
        document: CheckUserExistsByEmailMutationDocument,
        variables: { input: variables },  
      }),
      transformErrorResponse: (error) => {
        // Address this!
        return {...error, message : Parse_Message(error)}
      }
    }),
  }),
  
})

export const { useLogInMutation, useLogOutMutation, useSignInMutation, useCheckUserExistsByEmailMutation} = injectedRtkApi;