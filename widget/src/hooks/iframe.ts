import {
  setApiKey,
  setCurrentPage,
  setFingerPrint
} from '../store'

interface IframeControl {
  updateCoreValuesOnStore(): void;
  notifyOpen(): void;
  notifyClose(): void;
}

export default function useIframeControl (): IframeControl {
  function updateCoreValuesOnStore (): void {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search)
      const apiKey = query.get('api_key') ?? ''
      const page = query.get('page') ?? ''
      const fingerprint = query.get('fingerprint') ?? ''

      setCurrentPage(page)
      setApiKey(apiKey)
      setFingerPrint(fingerprint)
      return
    }

    console.log('passou')

    setCurrentPage('https://playground-url.com')
    setApiKey('fcd5015c-10d3-4e9c-b395-ec7ed8850165')
    setFingerPrint('123123123123123')
  }

  function notifyOpen (): void {
    window.parent.postMessage({
      isWidget: true,
      isOpen: true
    }, '*')
  }

  function notifyClose (): void {
    window.parent.postMessage({
      isWidget: true,
      isOpen: false
    }, '*')
  }

  return {
    updateCoreValuesOnStore,
    notifyClose,
    notifyOpen
  }
}
