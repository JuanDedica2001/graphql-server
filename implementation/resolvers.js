const { default: axios } = require("axios");
const generateUrl = require("../helpers/generateUrl");

async function filterCharacters(root, args) {
  const url = generateUrl(args.filter);
  const response = await axios.get(url);
  return response.data.results;
}

async function allCharacters(root, args) {
  const { page = 1 } = args;
  const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const response = await axios.get(url);
  return response.data.results;
}


async function findCharacter(root, args) {
  const { id } = args;
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const response = await axios.get(url);
  return response.data;
}

module.exports = {
  filterCharacters,
  findCharacter,
  allCharacters
}