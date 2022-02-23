// Hook para eventos com modais do sistema
import bus from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal () {
  // Faz a abertura do modal chamando o emit do evento
  function open (payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload })
  }

  // Fecha o modal chamando o emit do evento com status false
  function close (payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload })
  }

  // Listen escuta por um evento, recebe como parâmetro uma função
  function listen (fn) {
    bus.on(EVENT_NAME, fn)
  }

  // Off para de escutar determinado evento
  function off (fn) {
    bus.off(EVENT_NAME, fn)
  }

  return {
    open,
    close,
    listen,
    off
  }
}
