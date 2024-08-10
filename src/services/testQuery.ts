import { api as generatedApi } from "./generated"

export const testApi = generatedApi.enhanceEndpoints({
  endpoints: {
    TestQuery: {
      transformResponse: (res: any) => {
        return res;
      },
    },
  },
});

export const { useTestQueryQuery } = testApi;
