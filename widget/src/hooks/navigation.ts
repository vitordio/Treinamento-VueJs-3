import useStore from './store'
import {
  setCurrentComponent,
  setFeedbackType
} from '../store'

export interface Navigation {
  setSuccessState(): void
  setErrorState(): void
  next(): void
  back(): void
}

export default function useNavigation (): Navigation {
  const store = useStore()

  function setSuccessState (): void {
    setCurrentComponent('Success')
  }

  function setErrorState (): void {
    setCurrentComponent('Error')
  }

  function next (): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback')
    }
  }

  function back (): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType')
      setFeedbackType('')
    }
  }

  return {
    setSuccessState,
    setErrorState,
    next,
    back
  }
}
