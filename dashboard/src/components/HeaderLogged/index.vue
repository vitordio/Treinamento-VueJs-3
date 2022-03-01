<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img src="../../assets/images/logo_white.png" class="w-full">
    </div>

    <div class="flex">
      <div class="flex list-none">
        <li
          @click="() => router.push({ name: 'Credentials' })"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Credenciais
        </li>
        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Feedbacks
        </li>
        <li
          @click="() => handleLogout()"
          class="px-6 py-2 font-bold bg-white text-brand-main rounded-full cursor-pointer focus:outline-none">
          {{ logoutLabel }}
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'
import { cleanCurrentUser } from '../../store/user'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    // Computed props do Vue para variáveis reativas
    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }

      return `${store.currentUser.name} (sair)`
    })

    // Logout function
    function handleLogout () {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
