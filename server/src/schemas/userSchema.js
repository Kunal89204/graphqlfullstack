const { gql } = require("apollo-server-express");

const userSchema = gql`
  type Query {
    user(id: ID!): User
    users: [User]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id:ID!):User
  }
`;

module.exports = userSchema;
