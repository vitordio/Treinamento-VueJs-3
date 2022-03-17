<template>
  <teleport to='body'>
    <!-- Component is para trocarmos de componente quando abrirmos ou fecharmos o widget -->
    <component
      :is="state.component"
      @open-box="handleOpenBox"
      @close-box="handleCloseBox"
    />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

import Standby from './Standby.vue'
import Box from './Box.vue'
import useIframeControl from '../../hooks/iframe'

type State = {
  component: string
}

interface SetupReturn {
  state: State,
  handleOpenBox(): void
  handleCloseBox(): void
}

export default defineComponent({
  components: {
    Standby,
    Box
  },

  setup (): SetupReturn {
    const iframe = useIframeControl()
    const state = reactive<State>({
      component: 'Standby'
    })

    // Altera entre os componentes quando abrir ou fechar o widget
    function handleOpenBox (): void {
      iframe.notifyOpen()
      state.component = 'Box'
    }

    onMounted(() => {
      iframe.updateCoreValuesOnStore()
    })

    function handleCloseBox (): void {
      iframe.notifyClose()
      state.component = 'Standby'
    }

    return {
      state,
      handleOpenBox,
      handleCloseBox
    }
  }
})
</script>
