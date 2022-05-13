const { ApolloServer, gql } = require('apollo-server');
const { allCharacters, findCharacter, filterCharacters } = require('./resolvers')

const typeDefs = gql`
  "Todos los status de vida dentro de la api"
  enum Status {
    ALIVE
    DEAD
    UNKNOWN
  }
  "Es por conveción poner los valores de los enum asi por que se podrían interpresar como constantes"
  enum Gender {
    FEMALE
    MALE
    GENDERLESS
    UNKNOWN
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
  
  input FilterCharacters {
    name: String
    status: Status
    species: String
    type: String
    gender: Gender
  }
  
  type Query {
    allCharacters(page: Int): [Character]
    filterCharacters(filter: FilterCharacters): [Character]
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
  