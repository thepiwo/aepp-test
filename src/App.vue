<template>
  <div id="app" class="min-h-screen">

    <div class="min-h-screen">
      <div class="flex justify-center">
        <div class="mobile-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { AeMain } from '@aeternity/aepp-components'
  import AeHeader from '@aeternity/aepp-components/src/components/aeHeader/aeHeader'

  export default {
    name: 'app',
    components: { AeHeader, AeMain },
  }
</script>

<style scoped>
  .min-h-screen {
    min-height: 100vh;
    padding-bottom: 0;
    background: #F1F4F7;
    max-height: 100vh;
    overflow-y: auto;
  }

  .mobile-container {
    max-width: 500px
  }
</style>
