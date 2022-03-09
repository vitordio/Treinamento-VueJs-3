<template>
  <span
    :class="`bg-${classColor}`"
    class="px-3 py-2 text-xs font-black text-white uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from '@vue/runtime-core'

const LABELS = {
  ISSUE: 'Problemas',
  IDEA: 'Ideias',
  OTHER: 'Outros'
}

const COLORS = {
  ISSUE: 'brand-danger',
  IDEA: 'brand-warning',
  OTHER: 'brand-graydark'
}

export default {
  props: {
    type: String
  },

  setup (props) {
    const label = computed(() => {
      return LABELS[props.type]
    })

    const classColor = computed(() => {
      return COLORS[props.type]
    })

    return {
      classColor,
      label
    }
  }
}
</script>
