const app = require("./app")
const connectDB =   require("./src/db/db")
const { ApolloServer} = require('apollo-server-express');
const userResolvers = require("./src/resolvers/userResolvers")
const userSchema = require("./src/schemas/userSchema")
connectDB()
  // Create an Apollo Server
const server = new ApolloServer({ typeDefs: [userSchema], resolvers: [userResolvers] });

const startServer = async () => {
    // Start the Apollo server
    await server.start();
  
    // Apply middleware
    server.applyMiddleware({ app });
  
    // Start the Express server
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  };
  
  startServer();