<template>
  <div class="box animate__animated animate__fadeInUp animate_faster">
    <!-- Header -->
    <div
      class="relative w-full flex"
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo
      }"
    >
      <button
        v-if="canShowAdditionalControlAndInfo"
        @click="back"
        :disabled="canGoBack"
        :class="{
          invisible: canGoBack
        }"
        class="text-xl text-gray-800 focus: outline-none"
      >
        <icon name="back" :color="colors.gray['800']" />
      </button>

      <p
        v-if="canShowAdditionalControlAndInfo"
        class="text-xl font-black text-center text-brand-main"
      >
        {{ label }}
      </p>

      <button
        @click="() => emit('close-box')"
        class="text-xl text-gray-800 focus:outline-none"
      >
        <icon name="close" size="14" :color="colors.gray['800']" />
      </button>
    </div>

    <wizard />

    <!-- Copyright -->
    <div
      class="text-gray-800 text-sm flex"
      v-if="canShowAdditionalControlAndInfo"
    >
      <icon name="chat" class="mr-1" :color="brandColors.graydark" />
      widget by
      <span class="ml-1 font-bold">feedbacker</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue'
import { brand } from '../../../palette'
import colors from 'tailwindcss/colors'

import useStore from '../../hooks/store'
import useNavigation, { Navigation } from '../../hooks/navigation'

import Icon from '../../components/Icons/index.vue'
import Wizard from '../../components/Wizard/index.vue'

interface SetupReturn {
  emit: SetupContext['emit'],
  brandColors: Record<string, string>,
  colors: Record<string, string>,
  label: ComputedRef<string>,
  canGoBack: ComputedRef<boolean>,
  canShowAdditionalControlAndInfo: ComputedRef<boolean>,
  back: Navigation['back']
}

export default defineComponent({
  components: {
    Icon,
    Wizard
  },
  emits: ['close-box'],
  setup (_, { emit }: SetupContext): SetupReturn {
    const store = useStore()
    const { back } = useNavigation()

    // Variavel para exibirmos os títulos dos blocos
    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema'
      }

      if (store.feedbackType === 'IDEA') {
        return 'Nos fale a sua ideia'
      }

      if (store.feedbackType === 'OTHER') {
        return 'Abra sua mente'
      }

      return 'O que você tem em mente?'
    })

    // Variável para exibição do ícone de voltar
    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'SelectFeedbackType'
    })

    // Nos estados de sucesso e erro só exibimos o botão de fechar
    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return store.currentComponent !== 'Success' && store.currentComponent !== 'Error'
    })

    return {
      emit,
      colors,
      brandColors: brand,
      label,
      canGoBack,
      canShowAdditionalControlAndInfo,
      back
    }
  }

})
</script>

<style lang="postcss" scoped>
  .box {
    @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl
      py-5 px-5 flex flex-col items-center shadow-xl select-none;
    width: 400px;
  }
</style>
