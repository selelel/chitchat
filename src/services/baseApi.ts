import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";
import { HOST } from "@/constants/host";

// Initialize the GraphQL client with the base URL
export const client = new GraphQLClient(HOST.GRAFBASE);

// Define the GraphQL base query
const graphqlBaseQuery = graphqlRequestBaseQuery({ client });

// Create the API with RTK Query
export const baseApiWithGraphql = createApi({
  baseQuery: graphqlBaseQuery,
  endpoints: () => ({}), // Define your endpoints here
  tagTypes: [], // Define your tag types here if needed
});


// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
// import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
// import { GraphQLClient } from "graphql-request"
// import { Mutex } from "async-mutex"
// import qs from "qs"
// import { HOST } from "@/constants/host"

// const HEADER_TYPE_APPLICATION_FORM = "application/x-www-form-urlencoded"

// export const client: any = new GraphQLClient(HOST.GRAFBASE)

// const mutex = new Mutex()
// const graphqlBaseQuery = graphqlRequestBaseQuery({ client });


// const authBaseQuery = fetchBaseQuery({
//   baseUrl: HOST.LOCALHOST,
// })

// // const graphqlBaseQuery = graphqlRequestBaseQuery({
// //   client,
// //   prepareHeaders: (headers, { getState }) => {
// //     const state: any = getState()
// //     const token = state.auth.accessToken
// //     if (token) {
// //       headers.set("authorization", `Bearer ${token}`)
// //     }

// //     return headers
// //   },
// // })

// export const baseQueryWithReauthGraphql: any = async (
//   { document, variables }: any,
//   api: any,
//   extraOptions: any,
// ) => {
//   await mutex.waitForUnlock()
//   let result
//   try {
//     result = await graphqlBaseQuery({ document, variables }, api, extraOptions)
//     return result
//   } catch (e: any) {
//     // Intercept HTTP 401 responses and do the refresh token call
//     if (e && e.response && e.response.status === 401) {
//       // Even if multiple apis fail simultaneously with 401
//       // only allow one api call to refresh the token
//       if (!mutex.isLocked()) {
//         const release = await mutex.acquire()
//         try {
//           const getState = api.getState as () => any
//           const refreshToken = getState().auth.refreshToken
//           // Use the proper refresh token request format here
//           const refreshResult: any = await authBaseQuery(
//             {
//               url: "/oauth2/token",
//               method: "POST",
//               body: qs.stringify({ refreshToken }),
//               headers: { "Content-Type": HEADER_TYPE_APPLICATION_FORM },
//             },
//             api,
//             extraOptions,
//           )

//           if (refreshResult.data) {
//             // TODO : Dispatch the updated token information
//             // api.dispatch(updateToken(refreshResult.data))

//             // Once the tokens are updated, do the failed api call again
//             result = await graphqlBaseQuery(
//               { document, variables },
//               api,
//               extraOptions,
//             )
//           } else {
//             // TODO : Dispatch an error if the refresh token call threw an error
//             // api.dispatch(updateRefreshTokenError(true))
//           }
//         } finally {
//           release()
//         }
//       } else {
//         await mutex.waitForUnlock()
//         result = await graphqlBaseQuery(
//           { document, variables },
//           api,
//           extraOptions,
//         )
//       }
//       return result
//     }
//   }
// }

// export const baseApiWithGraphql = createApi({
//   baseQuery: graphqlBaseQuery,
//   endpoints: () => ({}),
//   tagTypes: [],
// })