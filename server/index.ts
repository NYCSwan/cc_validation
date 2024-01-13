import { ApolloServer, BaseContext } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { CreditCard, Resolvers } from './resolvers-types.generated';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const creditCard = {
  number: '1242345',
};
export interface CreditCardValidationContext extends BaseContext {
  Query: {
    creditCard: CreditCard;
  };
  Mutation: {
    validateCreditCard: (creditCardNumber: string) => boolean;
  };
}
// fix type
const resolvers: Resolvers<any> = {
  Query: {
    creditCard: () => creditCard,
  },
  Mutation: {
    validateCreditCard: async (_, args) => {
      const { creditCardNumber } = args;
      if (!creditCardNumber) {
        throw new Error('No card number provided');
      }
      const checksum = (c: number): number =>
        c < 10 ? c : checksum(Math.trunc(c / 10) + (c % 10));

      return (
        creditCardNumber
          .split('')
          .reverse()
          .map(Number)
          .map((c, i) => (i % 2 !== 0 ? checksum(c * 2) : c))
          .reduce((acc, digit) => acc + digit) %
          10 ===
        0
      );
    },
  },
};

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
