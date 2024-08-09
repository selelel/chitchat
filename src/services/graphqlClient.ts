import axios from 'axios';
import { HOST } from "@/constants/host";

const graphqlClient = async (query: string, variables = {}, authorization?: string) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (authorization) {
      headers['Authorization'] = authorization;
    }

    const response = await axios.post(HOST.GRAFBASE, {
      query,
      variables,
    }, {
      headers,
    });

    const data = response.data;

    if (data.errors) {
      const errorMessages = data.errors.map((error: { extensions: { originalError?: { message: string } }, message: string }) => {
        if (error.extensions?.originalError?.message) {
          return error.extensions.originalError.message;
        }
        return error.message;
      }).join(', ');

      throw new Error(errorMessages || 'Unknown GraphQL error');
    }

    return data.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
};

export default graphqlClient;
