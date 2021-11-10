//* node-graphql/src/schema.js

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Set {
    members: [Int!]!
    intersectingSets: [Set!]!
  }

  type Query {
    sets: [Set!]
  }

  input SetInput {
    members: [Int!]!
  }

  type Mutation {
    createSet(input: SetInput!): Set!
  }
`
module.exports = {
  typeDefs,
}