<template>
  <!-- Telepor faz com que o componente seja criado dentro da tag que passamos (body, no caso) na última posição -->
  <teleport to='body'>
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      @click="handleModalToogle({ status: false })"
    >
      <div
        class="fixed mx-10"
        :class="DEFAULT_WIDTH"
        @click.stop
      >
        <div class="flex flex-col overflow-hidden bg-white rounded-md animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <!-- Como este é um componente factory, passamos como propriedade qual componente deve ser renderizado no conteúdo -->
            <component :is="state.component" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import useModal from '../../hooks/useModal'

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() => import('../ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin,
    ModalCreateAccount
  },
  setup () {
    const modal = useModal()
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    // Ao montar o componente, chama o hook para começar a ouvir os eventos
    onMounted(() => {
      modal.listen(handleModalToogle)
    })

    // Antres de fechar o componente, chama o hook para parar de ouvir os eventos
    onBeforeUnmount(() => {
      modal.off(handleModalToogle)
    })

    function handleModalToogle (payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
        state.isActive = payload.status
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
        state.isActive = false
      }
    }

    return {
      DEFAULT_WIDTH,
      state,
      handleModalToogle
    }
  }
}
</script>
