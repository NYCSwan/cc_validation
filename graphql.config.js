/* eslint-env node */
module.exports = {
  projects: {
    app: {
      schema: ["schema.graphql"],
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:4000/graphql",
          },
        },
      },
    },
  },
};
