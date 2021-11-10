// node-graphql/src/resolvers.js

const { sets } =  require('./database.js');

const resolvers = {

    Set: {
        id: (parent, args, context, info) => parent.id,
        members: (parent) => parent.members,
        intersectingSets: (parent) => {throw new Error('unimplemented')},
    },

    Query: {
      sets: (parent, args) => {
        return sets;
      },
    },

    Mutation: {
      createSet: (parent, args) => {
        sets.push({
          id: sets.length + 1,
          members: new Set(args.input.members),
        })
        return sets[sets.length - 1];
      },
    },
  }

  module.exports = {
    resolvers,
  }
