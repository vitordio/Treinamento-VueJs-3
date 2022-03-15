import axios from 'axios'

const API_ENVS = {
  local: 'http://localhost:3000',
  production: 'https://backend-treinamento-vue3-tawny.vercel.app/'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

/** Só disparamos e interceptamos a exceção para alguns casos de erro, para os demais, tratamos na validação dos métodos */
httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const canThrowError = error.request.status === 0 || error.request.status === 500
  if (canThrowError) {
    throw new Error(error.message)
  }
  return error
})

export default {
}
