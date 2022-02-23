/**
 * Arquivo utilizado para estados globais no VueJs.
 *
 * Estados globais não podem ser diretamente alterados, apenas lidos,
 * para alterá-los, chamamos o responsável por essa alteração, nesse caso os Modules,
 * e informamos o que deverá ser alterado para que o module realize a alteração.
 */
import { readonly } from 'vue'
import UserModule from './user'
import GlobalModule from './global'

export default readonly({
  User: UserModule,
  Global: GlobalModule
})
