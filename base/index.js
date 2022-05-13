const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { books } = require('./db.js');
const { v1 } = require('uuid');

const typeDefs = gql`
  type Query {
    allBooks: [Book]
    numberOfBooks: Int
    findBooks(title: String!): [Book]
  }
  type Book {
    id: ID
    title: String!
    author: String
    numberOfPages: Int
    APA: String
    age: Int
    editorial: String
    genre: String
  }
  
  interface Note {
    title: String!
    content: String!
    author: String
  }
  
  type BookNote implements Note{
    title: String!
    content: String!
    author: String
    numberPage: Int!
  }
  
  type ReviewNote implements Note {
    title: String!
    content: String!
    author: String
    age: Int
  }
  
  input Review {
    title: String!
    content: String!
    author: String
    numberPage: Int
    age: Int
  }
  type Mutation {
    addBook(title: String!, author: String, numberOfPages: Int): Book
    modifyTitle(id: ID!, title: String!): Book
    generateReview(content: Review!): Note
    generateComment(content: Review!): BookNote
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
  Book: {
    APA: (root) => {
      return `${root.author[0]}.${root.author.slice(root.author.indexOf(' '), root.author.length)} (${root.age || 's.f'}). ${root.title}${root.editorial ? '. ' + root.editorial : ''}${root.numberOfPages ? '. ' + root.numberOfPages.toString() + 'p' : ''}`;	
    }
  },
  Note: {
    __resolveType(Note) {
      if (Note.numberPage) {
        return 1;
      }
      if (Note.age) {
        return 2000;
      }
      return null
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
    },
    modifyTitle: (root, args) => {
      const book = books.find(book => book.id === args.id);
      if (!book) {
        throw new UserInputError(`Book with id ${args.id} not found`);
      }
      const modifiedBook = {
        ...book,
        title: args.title
      }
      books.map(book => book.id === args.id ? modifiedBook : book);
      return modifiedBook
    },
    generateReview: (root, args) => {
      console.log(args)
      return {
        title: args.content.title,
        content: args.content.content
      }
    },
    generateComment: (root, args) => {
      console.log(args)
      return {
        ...args.content
      }
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