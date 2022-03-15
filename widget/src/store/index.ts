import { reactive, readonly } from "vue"

export type StoreState = {
  currentComponent: String,
  message: String
  feedbackType: String
  fingerPrint: String
  apiKey: String
  currentPage: String
}

/**
 * Desenvolvimento dos estados do widget
 * - Fechado, Aberto e (Sucesso ou Erro)
*/
const initialState: StoreState = {
  currentComponent: 'SelectFeedbackType',
  message: '',
  feedbackType: '',
  fingerPrint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<StoreState>({ ...initialState })

/** Funções que modificam o estado */
export function setCurrentComponent (component: String): void {
  state.currentComponent = component
}

export function setMessage (message: String): void {
  state.message = message
}

export function setFeedbackType (feedbackType: String): void {
  state.feedbackType = feedbackType
}

export function setFingerPrint (fingerPrint: String): void {
  state.fingerPrint = fingerPrint
}

export function setApiKey (apiKey: String): void {
  state.apiKey = apiKey
}

export function setCurrentPage (currentPage: String): void {
  state.currentPage = currentPage
}

export function resetStore (): void {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setFeedbackType(initialState.feedbackType)
  setFingerPrint(initialState.fingerPrint)
  setApiKey(initialState.apiKey)
  setCurrentPage(initialState.currentPage)
}

export default readonly(state)
