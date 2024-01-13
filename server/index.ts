import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
type Query {
  creditCard:  () => CreditCard
}
  type Mutation {
    validateCreditCard(cardNumber: String!): Boolean
  }
  type CreditCard {
    cardNumber: String
  }
`;

const creditCard = {
  number: '1242345',
};
const resolvers = {
  Query: {
    creditCard: () => creditCard,
  },
  Mutation: {
    validateCreditCard: (parent, args) => {
      console.log(args.cardNumber);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
