<template>
  <div
    @click="handleToggle"
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
  >
    <div
      class="flex items-center justify-between w-full mb-8"
    >
      <badge :type="feedback.type" />

      <span
        class="font-regular text-brand-graydark"
      >
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-sm font-medium text-gray-500">
      {{ feedback.text }}
    </div>

    <div
      :class="{
        animate__fadeOutUp: state.isClosing
      }"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none text-sm">Página</span>
          <span class="font-medium text-gray-700 text-sm">{{ feedback.page }} </span>
        </div>

        <div class="flex flex-col mt-4">
          <span class="font-bold text-gray-400 uppercase select-none text-sm">Dispositivo</span>
          <span class="font-medium text-gray-700 text-sm">{{ feedback.device }} </span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none text-sm">Usuário</span>
          <span class="font-medium text-gray-700 text-sm">{{ feedback.fingerprint }} </span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-else>
      <icon name="chevron-down" size="18" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import Badge from './Badge'
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'

import pallete from '../../../palette'
import { reactive } from '@vue/reactivity'

import Icon from '../Icons'
import { wait } from '../../utils/timeout'

export default {
  components: {
    Badge,
    Icon
  },

  props: {
    isOpened: { type: Boolean, default: false },
    feedback: { type: Object, required: true }
  },

  setup (props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened
    })

    async function handleToggle () {
      state.isClosing = true
      await wait(250)
      state.isOpen = !state.isOpen
      state.isClosing = false
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: pallete.brand
    }
  }
}
</script>
