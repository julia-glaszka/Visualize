const axios = require('axios')
// const dataForge = require('data-forge')

const getLabels = () => {

}

const getData = async () => {
  const data = await axios('https://jsonplaceholder.typicode.com/todos')
  // const data = new dataForge.DataFrame(response.data)
  console.log(data)
}

const sum = (data) => {
  return data.reduce((prev, next) => prev + next)
}
const avg = (data) => {
  return data.reduce((prev, next) => prev + next) / data.length
}
const maxm = (data) => {
  return Math.max(...data)
}

const minm = (data) => {
  return Math.min(...data)
}

export default {
  getLabels,
  getData,
  sum,
  avg,
  maxm,
  minm
}
