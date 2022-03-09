import axios from 'axios'
import AuthService from './auth'
import UserService from './user'
import FeedbacksService from './feedbacks'
import router from '../router'
import { setGlobalLoading } from '../store/global'

const API_ENVS = {
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

/** Criamos um interceptor de request para enviar o Bearer token em toda requisição logada */
httpClient.interceptors.request.use(config => {
  /**
   * Importamos o estado global e usamos o setGlobalLoading para
   * sempre que uma requisição for realizada, exibir o loading
   */
  setGlobalLoading(true)

  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

/** Só disparamos e interceptamos a exceção para alguns casos de erro, para os demais, tratamos na validação dos métodos */
httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowError = error.request.status === 0 || error.request.status === 500
  if (canThrowError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  /** Se o token não for válido redirecionamos para Home */
  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  user: UserService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
