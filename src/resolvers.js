// node-graphql/src/resolvers.js

const { sets, membersToSets } =  require('./database.js');

const resolvers = {
  Set: {
      id: (parent, args, context, info) => parent.id,
      members: (parent) => parent.members,
      intersectingSets,
  },

  Query: {
    sets: (parent, args) => {
      return sets;
    },
  },

  Mutation: {
    createSet,
  },
};

function intersectingSets(parent) {
  const idsToReturn = new Set();
  const setsToReturn = [];
  const {id: thisID, members: theseMembers} = parent;
  for (const member of theseMembers.values()) {
    for (const candidateSet of membersToSets[member]) {
      if (candidateSet.id === thisID || idsToReturn.has(candidateSet.id)) {
        continue;
      }
      idsToReturn.add(candidateSet.id);
      setsToReturn.push(candidateSet);
    }
  }
  return setsToReturn;
}

function createSet (parent, args) {
  const newSet  = {
    id: sets.length + 1,
    members: new Set(args.input.members),
  };
  sets.push(newSet);
  for (const member of newSet.members.values()) {
    if (!membersToSets.hasOwnProperty(member)) {
      membersToSets[member] = [];
    }
    membersToSets[member].push(newSet);
  }
  return newSet;
}

  module.exports = {
    resolvers,
  }
