const { v1 } = require('uuid');

//create an array of book objects
const books = [
  {
    id: v1(),
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    numberOfPages: 341
  }, 
  {
    id: v1(),
    title: 'Jurassic Park',
    author: 'Michael Crichton', 
    numberOfPages: 456
  },
  {
    id: v1(),
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: v1(),
    title: 'City of Glass',
    author: 'Paul Auster',
  },
  {
    id: v1(),
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: v1(),
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
  {
    id: v1(),
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    numberOfPages: 374
  }, 
  {
    id: v1(),
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  }, 
  {
    id: v1(),
    title: 'The Fault in Our Stars',
    author: 'John Green',
  }, 
  {
    id: v1(),
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
  },
  {
    id: v1(),
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    numberOfPages: 163
  },
]

module.exports = {
  books
};