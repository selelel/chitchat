import { HOST } from "@/constants/host";
import { RefreshTokenQueryDocument } from "@/lib/features/auth/authQuery";
import { Query } from "@/lib/graphql/graphqlTypes";
import { GraphQLClient } from 'graphql-request';

export const fetchRefreshToken = async () => {
    const client = new GraphQLClient(HOST.GRAPHQL_URI, { credentials: 'include' });
    try {
        const response = await client.request(RefreshTokenQueryDocument) as { refresh: Query['refresh'] };
        return response?.refresh?.accesstoken;
    } catch (error) {
        throw error
    }
};
