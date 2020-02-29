import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }): string => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection()
  .then(() => {
    server.start(() => console.log("Server is running on localhost:4000"));
  })
  .catch(error => console.log(error));
