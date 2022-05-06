const { ApolloServer, gql } = require('apollo-server');
const { allCharacters, findCharacter, filterCharacters } = require('./resolvers')

const typeDefs = gql`  
  enum Status {
    alive
    dead
    unknown
  }
  enum Gender {
    female
    male
    genderless
    unknown
  }
  type Origin {
    name: String
    url: String
  }
  type Character {
    id: Int!
    name: String!
    status: String!
    species: String!
    type: String
    gender: String
    origin: Origin
    location: Origin
    image: String
    episode: [String]
    url: String!
    created: String!
  }
  type Query {
    allCharacters(page: Int): [Character]
    filterCharacters(name: String!, status: Status, species: String, type: String, gender: Gender ): [Character]
    findCharacter(id: Int!): Character
  }
`
  const resolvers = {
    Query: {
      allCharacters,
      findCharacter,
      filterCharacters
    }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  
  server.listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(err => console.log(err));
  