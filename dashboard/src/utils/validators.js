/**
 * Validações gerais dos formulários
 */

/**
 * Campo e-mail não pode ser vazio e ser válido
 * @param {*} value
 */
export function validateEmptyAndValidEmail (value) {
  if (!value) {
    return '* Este campo é obrigatório'
  }

  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)
  if (!isValid) {
    return '* Este campo precisa ser um e-mail'
  }

  return true
}

/**
 * Campo name e senha não podem ser vazios e menor que 3
 *
 * @param {*} value
 */
export function validateEmptyAndLength3 (value) {
  if (!value) {
    return '* Este campo é obrigatório'
  }

  if (value.length < 3) {
    return '* Este campo precisa de no mínimo de 3 caracteres'
  }

  return true
}
