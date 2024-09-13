import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  // documents: './src/services/document.graphql',
  generates: {
    './src/modules/graphql/graphqlTypes.ts': {
      plugins: [
        'typescript',
        // 'typescript-resolvers',
      ],
    },
  },
}

export default config