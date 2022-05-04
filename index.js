const {ApolloServer, gql} = require('apollo-server');
const {books} = require('./db.js');




const typeDefs = gql`
  type Book {
    title: String!
    author: String
  }
  type Query {
    allBooks: [Book]
    numberOfBooks: Int
  }
`

const resolvers = {
  Query: {
    allBooks: () => books,
    numberOfBooks: () => books.length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen()
  .then(({ url }) => {
  console.log(`🚀 Servidor listo en ${url}`);
})