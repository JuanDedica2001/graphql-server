
const generateUrl = (params) => {
  let endPoint = 'https://rickandmortyapi.com/api/character/';
  Object.keys(params).forEach((key, idx) => {
    if (idx === 0) { 
      endPoint += `?${key}=${params[key]}`;
    } else {
      endPoint += `&${key}=${params[key]}`;
    }
  })
  return endPoint;
}

module.exports = generateUrl;