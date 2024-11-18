import { GRAPHQL_URI } from "@/config/env";
import { RefreshTokenQueryDocument } from "@/lib/features/auth/authQuery";
import { Query } from "@/lib/graphql/graphqlTypes";
import { GraphQLClient } from 'graphql-request';

export const fetchRefreshToken = async () => {
    const client = new GraphQLClient(GRAPHQL_URI, { credentials: 'include' });
    try {
      const response = await client.request(RefreshTokenQueryDocument) as { refresh: Query['refresh'] };
      return response?.refresh?.accesstoken;
    } catch (error: unknown) {

        console.log(error, error instanceof Error)
      if (error instanceof Error) {
        if (error.message === 'INVALID_REFRESH_TOKEN') {
            console.log(error, error instanceof Error)
          window.location.href = '/login';
        }
      }
  
      throw error;
    }
  };
  