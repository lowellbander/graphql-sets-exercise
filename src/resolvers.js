// node-graphql/src/resolvers.js

const { prisma } =  require('./database.js');

const resolvers = {
  Set: {
      id: (parent, args, context, info) => parent.id,
      members: (parent) => parent.members,
      intersectingSets,
  },

  Query: {
    sets: (parent, args) => prisma.set.findMany(),
  },

  Mutation: {
    createSet,
  },
};

function intersectingSets(parent) {
  const idsToReturn = new Set();
  const setsToReturn = [];

  const {id: thisID, members: theseMembers} = parent;

  const memberships = prisma.membership.findMany({
    // id not this id AND member in theseMembers
    where: {
      containiningSetID: {
        not: thisID
      },
      member: {
        in: theseMembers,
      }
    }
  });

  console.log(memberships);

  // const {id: thisID, members: theseMembers} = parent;
  // for (const member of theseMembers.values()) {
  //   for (const candidateSet of membersToSets[member]) {
  //     if (candidateSet.id === thisID || idsToReturn.has(candidateSet.id)) {
  //       continue;
  //     }
  //     idsToReturn.add(candidateSet.id);
  //     setsToReturn.push(candidateSet);
  //   }
  // }
  return setsToReturn;
}

function createSet (parent, args) {

  const membersSet = new Set(args.input.members);

  const newSet = prisma.set.create({
    data: {
      members: Array.from(membersSet),
    }
  });

  for (const member of membersSet.values()) {
    prisma.membership.create({
      member,
      containingSetID: newSet.id,
    });
  }

  return newSet;
}

  module.exports = {
    resolvers,
  }
