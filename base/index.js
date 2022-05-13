const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { books, notes } = require('./db.js');
const { v1 } = require('uuid');

const typeDefs = gql`
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
  
  union BooksThings = Book | BookNote
  
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
  type Query {
    allBooks: [Book]
    numberOfBooks: Int
    findBooks(title: String!): [Book]
    allNotes: [Note]
    searchBookThings(contains: String): [BooksThings]
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
    },
    allNotes: () => notes,
    searchBookThings: (root, args) => {
      const filteredNotes = notes.filter(item => item.title.toLowerCase().includes(args.contains.toLowerCase()));
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(args.contains.toLowerCase()));
      return [...filteredBooks, ...filteredNotes]
    }
  },
  Book: {
    APA: (root) => {
      return `${root.author[0]}.${root.author.slice(root.author.indexOf(' '), root.author.length)} (${root.age || 's.f'}). ${root.title}${root.editorial ? '. ' + root.editorial : ''}${root.numberOfPages ? '. ' + root.numberOfPages.toString() + 'p' : ''}`;
    }
  },
  BooksThings: {
    __resolveType(obj) {
      if (obj.age){
        return 'Book';
      }
      if(obj.numberPage) {
        return 'BookNote';
      }
      return null;
    }
  },
  Note: {
    __resolveType(Note) {
      if (Note.age) {
        return 'ReviewNote'
      }
      if (Note.numberPage) {
        return 'BookNote'
      }
      return null;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        id: v1(),
        ...args
      }
      books.push(newBook);
      return newBook;
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
      return modifiedBook;
    },
    generateReview: (root, args) => {
      const newNote = {
        title: args.content.title,
        content: args.content.content,
        age: args.content.age
      }
      notes.push(newNote);
      return newNote
    },
    generateComment: (root, args) => {
      const newNote = {
        title: args.content.title,
        content: args.content.content,
        numberPage: args.content.numberPage
      }
      notes.push(newNote);
      return newNote;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen()
  .then(({ url }) => {
  console.log(`🚀 Servidor listo en ${url}`);
})