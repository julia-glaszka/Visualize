const axios = require('axios')
const dataForge = require('data-forge')

const getLabels = () => {

}

const getData = async () => {
  const response = await axios('https://jsonplaceholder.typicode.com/todos')
  const data = new dataForge.DataFrame(response.data)
  console.log(data)
}

const artyhmetricSum = () => {

}
const avg = () => {

}

export default {
  getLabels,
  getData,
  artyhmetricSum,
  avg
}
