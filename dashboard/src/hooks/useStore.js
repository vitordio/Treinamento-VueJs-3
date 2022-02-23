/**
 * Hook criado para utilização dos estados globais do Vue
 */
import Store from "../store";

export default function useStore (module) {
  if (module) {
    /**
     * Podemos passar por parâmetro o modulo que queremos, por exemplo
     * Store[user], caso não passamos, retornamos o store completo
    */
    return Store[module]
  }

  return Store
}
