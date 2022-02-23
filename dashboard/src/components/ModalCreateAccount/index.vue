<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl font-black text-gray-800">Crie uma conta</h1>
      <button
        @click="closeModal"
        class="text-2xl text-gray-600 focus:outline-none"
      >
        &times;
      </button>
    </div>

    <div class="mt-10">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">Nome</span>
          <input
            v-model="state.name.value"
            type="text"
            class="block w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded"
            :class="{
              'border-brand-danger': !!state.name.errorMessage
            }"
            placeholder="'Vitor Dio"
          >
          <span
            v-if="!!state.name.errorMessage"
            class="block text-sm font-medium text-brand-danger mt-2"
          >
            {{ state.name.errorMessage }}
          </span>
        </label>

        <label class="block">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input
            v-model="state.email.value"
            type="email"
            class="block w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded"
            :class="{
              'border-brand-danger': !!state.email.errorMessage
            }"
            placeholder="'vitor.gracia@gmail.com"
          >
          <span
            v-if="!!state.email.errorMessage"
            class="block text-sm font-medium text-brand-danger mt-2"
          >
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block">
          <span class="text-lg font-medium text-gray-800">Senha</span>
          <input
            v-model="state.password.value"
            type="password"
            class="block w-full px-4 py-3 bg-gray-100 border-2 border-transparent rounded"
            :class="{
              'border-brand-danger': !!state.password.errorMessage
            }"
            placeholder="'*******"
          >
          <span
            v-if="!!state.password.errorMessage"
            class="block text-sm font-medium text-brand-danger mt-2"
          >
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button
          :disabled="state.isLoading"
          type="submit"
          class="px-10 py-3 mt-8 text-1xl text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
          :class="{
            'opacity-50': state.isLoading
          }"
        >
          <icon name='loading' class="animate-spin" v-if="state.isLoading" />
          <span v-else>
            Entrar
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import useModal from '../../hooks/useModal'
import { validateEmptyAndLength3, validateEmptyAndValidEmail } from '../../utils/validators'
import services from '../../services/index'
import Icon from '../Icons'

export default {
  components: {
    Icon
  },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    /**
     * Variáveis retiradas do vee-validate para validação dos campos de e-mail e senha
    */
    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmptyAndLength3)

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndValidEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    /** Ao realizar o submit de registro, faz o login do usuário se estiver tudo ok */
    async function login ({ email, password }) {
      const { data, errors } = await services.auth.login({ email, password })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }

      state.isLoading = false
    }

    /** Realiza o registro do usuário */
    async function handleSubmit () {
      toast.clear()
      try {
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await login({
            email: state.email.value,
            password: state.password.value
          })

          return
        }

        if (errors.status === 404) {
          toast.error('Preencha todos os campos corretamente.')
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o cadastro')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro ao fazer o cadastro')
      }
    }

    return {
      state,
      closeModal: modal.close,
      handleSubmit
    }
  }
}
</script>
