import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: './src/services/document.graphql',
  generates: {
    './src/services/generated.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        // {
        //   'typescript-rtk-query': {
        //     importBaseApiFrom: './baseApi',
        //     importBaseApiAlternateName: 'baseApiWithGraphql',
        //     exportHooks: true,
        //   },
        // },
      ],
    },
  },
}

export default config