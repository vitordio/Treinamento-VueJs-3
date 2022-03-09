<template>
  <div>
    <content-loader
      class="flex items-center justify-between rounded"
      width="100%"
      height="50px"
    >
      <content-loader
        class="mt-3 rounded"
        width="20%"
        height="30px"
        animation-duration="2s"
      />

      <content-loader
        class="mt-3 rounded"
        width="30%"
        height="30px"
        animation-duration="2.3s"
      />
    </content-loader>

    <content-loader
      class="flex flex-col items-center rounded"
      width="100%"
      height="200px"
    >
      <content-loader
        class="mt-3 rounded"
        width="90%"
        height="30px"
        animation-duration="2s"
      />

      <content-loader
        class="mt-3 rounded"
        width="80%"
        height="30px"
        animation-duration="2.3s"
      />

      <content-loader
        class="mt-3 rounded"
        width="70%"
        height="30px"
        animation-duration="2.7s"
      />
    </content-loader>
  </div>
</template>

<script>
import ContentLoader from '../ContentLoader'
export default {
  components: {
    ContentLoader
  }
}
</script>
