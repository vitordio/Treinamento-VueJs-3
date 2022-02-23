<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ModalFactory from './components/ModalFactory'
import services from './services'
import { setCurrentUser } from './store/user'

export default {
  components: {
    ModalFactory
  },
  setup () {
    /** Usamos o useRoute para pegar informações como: rota atual, path atual, etc */
    const router = useRouter()
    const route = useRoute()

    /** Usamos o watch para ficar escutando sempre que a rota mudar */
    watch(() => route.path, async () => {
      /** Verificamos as rotas que o usuário precisa estar logado para acessar */
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')

        if (!token) {
          router.push({ name: 'Home' })
          return
        }

        const { data } = await services.user.getMe()
        setCurrentUser(data)
      }
    })
  }
}
</script>
