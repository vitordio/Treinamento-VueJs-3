<template>
  <header class="header">
    <div class="header-group">
      <div class="flex flex-col">
        <div class="flex items-center justify-between py-10">
          <div class="w-28 lg:w-36">
            <img class="w-full" src="../../assets/images/logo_white.png" alt="Logo">
          </div>

          <div class="flex">
            <button
              @click="() => emit('create-account')"
              class="px-6 py-2 font-bold rounded-full text-white focus:outline-none"
            >
              Crie uma conta
            </button>

            <button
              @click="() => emit('login')"
              class="px-6 py-2 font-bold bg-white rounded-full text-brand-main border border-opacity-0 transition-all focus:outline-none hover:border-opacity-100 hover:bg-transparent hover:border-white hover:text-white"
            >
              Entrar
            </button>
          </div>
        </div>

        <div class="flex flex-col mt-28">
          <h1 class="text-4xl font-black text-white">
            Tenha um feedbacker<br>
            E faça seus clientes mais <br class="hidden lg:inline-block">
            felizes
          </h1>
          <p class="text-lg font-medium text-white">
            Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
            simples widget na página.
          </p>
          <div>
            <button class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main border border-opacity-0 transition-all focus:outline-none hover:border-opacity-100 hover:bg-transparent hover:border-white hover:text-white">
              Crie uma conta grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup (props, { emit }) {
    return { emit }
  }
}
</script>

<style lang="postcss" scoped>
  .header {
    @apply bg-brand-main w-full flex justify-center;
    height: 700px
  }

  .header-group {
    @apply flex flex-col w-4/5 max-w-6xl;
  }

  @media (min-width: 1100px) {
    .header-group {
      background-image: url(../../assets/images/blue_balloons.png);
      background-size: 628px;
      background-position: 90% 100%;
      background-repeat: no-repeat;
    }
  }
</style>
