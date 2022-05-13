const { v1 } = require('uuid');

//create an array of book objects
const books = [
  {
    id: v1(),
    title: 'Harry Potter and the Chamber of Secrets',
    age: 1998,
    author: 'J.K. Rowling',
    editorial: 'Blodhaven',
    numberOfPages: 341,
    genre: 'Fantasy'
  }, 
  {
    id: v1(),
    title: 'Jurassic Park',
    age: 1993,
    editorial: 'Blodhaven',
    author: 'Michael Crichton', 
    numberOfPages: 456,
    genre: 'Adventure'
  },
  {
    id: v1(),
    title: 'The Awakening',
    age: 2000,
    author: 'Kate Chopin',
    genre: 'Terror'
  },
  {
    id: v1(),
    title: 'City of Glass',
    age: 1993,
    author: 'Paul Auster',
    genre: 'Adventure'
  },
  {
    id: v1(),
    title: 'The Great Gatsby',
    age: 1925,
    author: 'F. Scott Fitzgerald',
  },
  {
    id: v1(),
    title: 'The Hobbit',
    age: 1937,
    author: 'J.R.R. Tolkien',
  },
  {
    id: v1(),
    title: 'The Hunger Games',
    age: 2008,
    author: 'Suzanne Collins',
    numberOfPages: 374
  }, 
  {
    id: v1(),
    title: 'The Catcher in the Rye',
    age: 1951,
    author: 'J.D. Salinger',
  }, 
  {
    id: v1(),
    title: 'The Fault in Our Stars',
    age: 2012,
    author: 'John Green',
  }, 
  {
    id: v1(),
    title: 'The Kite Runner',
    age: 2003,
    author: 'Khaled Hosseini',
  },
  {
    id: v1(),
    title: 'The Alchemist',
    age: 1827,
    editorial: 'Debolsillo',
    author: 'Paulo Coelho',
    numberOfPages: 163
  },
]

const notes = []

module.exports = {
  books,
  notes
};