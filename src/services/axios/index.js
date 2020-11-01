import axios from 'axios'

function parserJSON(response) {
    return null
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const request = (url, options) => {
  return axios({
    url,
    ...options,
  })
    .then(checkStatus)
    .catch(parserJSON)
}

export default request
