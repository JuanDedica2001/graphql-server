const { ApolloServer, gql } = require('apollo-server');
const { books } = require('./db.js');
const { v1 } = require('uuid');

const typeDefs = gql`
  type Book {
    id: ID
    title: String!
    author: String
    numberOfPages: Int
  }
  type Query {
    allBooks: [Book]
    numberOfBooks: Int
    findBooks(title: String!): [Book]
  }
  type Mutation {
    addBook(title: String!, author: String, numberOfPages: Int): Book
  }
`

const resolvers = {
  Query: {
    allBooks: () => books,
    numberOfBooks: () => books.length,
    findBooks: (root, args) => {
      return books.filter(book => book.title.toLowerCase().includes(args.title.toLowerCase()));
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const {title, author, numberOfPages} = args;
      const book = {
        id: v1(),
        title,
        author,
        numberOfPages
      }
      books.push(book);
      return book;
    }
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