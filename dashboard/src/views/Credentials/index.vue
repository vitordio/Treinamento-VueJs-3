<template>
  <div>
    <div class="flex justify-center w-full h-28 bg-brand-main">
      <header-logged />
    </div>

    <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
      <h1 class="text-4xl font-black text-center text-gray-800">
        Credenciais
      </h1>

      <p class="text-lg text-center text-gray-800 font-regular">
        Guia de instalação e geração de suas credenciais
      </p>
    </div>

    <div class="flex justify-center w-full h-full">
      <div class="flex flex-col w-4/5 max-w-6xl py-10">
        <h1 class="text-3xl font-black text-brand-graydark">
          Instalação e configuração
        </h1>

        <p class="mt-10 text-lg text-gray-800 font-regular]">
          Este aqui é a sua chave de api
        </p>

        <!--
          Deixamos de exibir o loading quando todas as informações foram carregadas ou
          quando o loading da página está carregando
        -->
        <content-loader
          v-if="store.Global.isLoading || state.isLoading"
          class="rounded"
          width="600px"
          height="50px"
        />
        <div
          v-else
          class="flex py-3 pl-5 pr-20 mt-2 justify-between rounded items-center bg-brand-gray w-full lg:w-8/12"
        >
          <span v-if="state.hasError">
            Erro ao carregar api key
          </span>
          <span v-else>{{ store.User.currentUser.apiKey }}</span>

          <div class="flex ml-20 mr-5" v-if="!state.hasError">
            <icon
              @click="copyToClipboard"
              name="copy"
              :color="brandColors.graydark"
              :size="24"
              class="cursor-pointer"
            />
            <icon
              @click="handleRegenerateApiKey"
              name="loading"
              :color="brandColors.graydark"
              :size="24"
              class="ml-3 cursor-pointer"
            />
          </div>
        </div>

        <p class="mt-5 text-lg text-gray-800 font-regular]">
          Coloque o script abaixo no seu site para começar a receber feedbacks
        </p>

        <content-loader
          v-if="store.Global.isLoading || state.isLoading"
          class="rounded"
          width="600px"
          height="50px"
        />
        <div
          v-else
          class="py-3 pl-5 pr-20 mt-2 rounded items-center bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
        >
          <span v-if="state.hasError">
            Erro ao carregar script
          </span>
          <pre v-else>&lt;script src="https://vitordio-feedbacker-widget.netlifly.app?api_key={{store.User.currentUser.apiKey}}"&gt;&lt;/script&gt;</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'

import Icon from '../../components/Icons'
import useStore from '../../hooks/useStore'
import pallete from '../../../palette'
import { reactive, watch } from 'vue'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { useToast } from 'vue-toastification'

export default {
  components: {
    HeaderLogged,
    ContentLoader,
    Icon
  },

  setup () {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      hasError: false,
      isLoading: false
    })

    // Escutamos o loading global e verificamos se exite apiKey definida,
    // se não existir, setamos o loading local como true e que há erro
    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error, toastMessage = false) {
      state.isLoading = false
      state.hasError = !!error

      if (toastMessage) {
        toast.error(toastMessage)
      }
    }

    async function handleRegenerateApiKey () {
      toast.clear()
      try {
        state.isLoading = true
        const { data } = await services.user.regenerateApiKey()
        setApiKey(data.apiKey)
        toast.success('Chave atualizada com sucesso!')

        state.isLoading = false
      } catch (error) {
        handleError(error, 'Erro ao atualizar chave de API')
      }
    }

    async function copyToClipboard () {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copiado com sucesso!')
      } catch (error) {
        handleError(error, 'Erro ao copiar chave de API')
      }
    }
    return {
      store,
      state,
      brandColors: pallete.brand,
      handleRegenerateApiKey,
      copyToClipboard
    }
  }
}
</script>
