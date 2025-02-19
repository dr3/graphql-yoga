// src/index.mjs
import { createYoga, createSchema } from 'graphql-yoga'

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String
    }
  `,
  resolvers: {
    Query: {
      greetings: () => 'This is the `greetings` field of the root `Query` type',
    },
  },
})

export default {
  fetch(request: Request, env: Record<string, any>, ...rest: any[]) {
    const yoga = createYoga({
      graphqlEndpoint: env.GRAPHQL_ROUTE || '/graphql',
      landingPage: false,
      schema,
    })

    return yoga.fetch(request, env, ...rest)
  },
}
