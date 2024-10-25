/** @type {import('graphql-config').IGraphQLConfig } */
module.exports = {
  projects: {
    earth: {
      overwrite: true,
      schema: process.env.NEXT_PUBLIC_API_BASE_URL_EARTH + "/graphql",
      documents: "./src/graphql/earth/**/*.gql",
      extensions: {
        codegen: {
          generates: {
            "./src/graphql/earth/generated.ts": {
              plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
              config: { withHooks: true },
            },
          },
        },
        hooks: {
          afterAllFileWrite: ["eslint --fix"],
        },
      },
    },
  },
};
