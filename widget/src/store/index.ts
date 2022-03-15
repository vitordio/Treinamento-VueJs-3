import { reactive, readonly } from 'vue'

export type StoreState = {
  currentComponent: string,
  message: string,
  feedbackType: string,
  fingerPrint: string,
  apiKey: string,
  currentPage: string
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
export function setCurrentComponent (component: string): void {
  state.currentComponent = component
}

export function setMessage (message: string): void {
  state.message = message
}

export function setFeedbackType (feedbackType: string): void {
  state.feedbackType = feedbackType
}

export function setFingerPrint (fingerPrint: string): void {
  state.fingerPrint = fingerPrint
}

export function setApiKey (apiKey: string): void {
  state.apiKey = apiKey
}

export function setCurrentPage (currentPage: string): void {
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
