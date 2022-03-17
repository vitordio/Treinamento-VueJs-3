import { reactive, readonly } from 'vue'

export type StoreState = {
  currentComponent: string,
  message: string,
  feedbackType: string,
  fingerprint: string,
  apiKey: string,
  page: string
}

/**
 * Desenvolvimento dos estados do widget
 * - Fechado, Aberto e (Sucesso ou Erro)
*/
const initialState: StoreState = {
  currentComponent: 'SelectFeedbackType',
  message: '',
  feedbackType: '',
  fingerprint: '',
  apiKey: '',
  page: ''
}

const state = reactive<StoreState>({ ...initialState })

/** Funções que modificam o estado */
export function setCurrentComponent (component: string): void {
  state.currentComponent = component
}

export function setMessage (message: string): void {
  state.message = message
}

export function setFeedbackType (feedbackType: string): void {
  state.feedbackType = feedbackType
}

export function setFingerPrint (fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function setApiKey (apiKey: string): void {
  state.apiKey = apiKey
}

export function setCurrentPage (page: string): void {
  state.page = page
}

export function resetStore (): void {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setFeedbackType(initialState.feedbackType)
  setFingerPrint(initialState.fingerprint)
  setApiKey(initialState.apiKey)
  setCurrentPage(initialState.page)
}

export default readonly(state)
