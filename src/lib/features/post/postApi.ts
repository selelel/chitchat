import { Parse_Message } from "@/helper/error"
import { baseApiWithGraphql } from "@/lib/graphql/graphqlBaseApi"
import { Mutation, LoginUserInput, PostContentInput, PostOptionInput } from "@/lib/graphql/graphqlTypes"
import { LogInMutationDocument } from "../auth/authQuery"
import { CreateNewPostMutationDocument } from "./postQuery"

const injectedRtkApi = baseApiWithGraphql.injectEndpoints({
    endpoints: (build) => ({
      createNewPost: build.mutation<{ createNewPost: Mutation['createNewPost'] }, { contentInput: PostContentInput, optionInput: PostOptionInput }>({
        query: (variables) => ({
          document: CreateNewPostMutationDocument,
          variables,
        }),
        transformErrorResponse: (error) => {
          return { ...error, message: Parse_Message(error) };
        }
      })
    })
  });

export const { useCreateNewPostMutation } = injectedRtkApi;
    