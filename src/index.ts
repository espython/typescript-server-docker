import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String!
    iamnew(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }): string => `Hello from ${name} to world`,
    iamnew: (_, { name }): string => `Hi from new code ${name || "World"}`
  }
};

const connectDb = async (retries = 5) => {
  while (retries) {
    try {
      await createConnection();
      console.log(`connection has been created Successfully`);
      console.log(`test git-hub deployment`);
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
connectDb()
  .then(() => {
    server.start({ port: 4000 }, () => {
      console.log("Server is running on localhost:4000");
      console.log("web hooks works successfully");
    });
  })
  .catch(error => console.log(error));
