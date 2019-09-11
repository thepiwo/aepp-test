<template>
    <div></div>
</template>

<script>
  import Universal from '@aeternity/aepp-sdk/es/ae/universal'
  import Aepp from '@aeternity/aepp-sdk/es/ae/aepp'
  import identitySource from './util/Identity.aes'

  export default {
    name: 'app',
    async mounted () {
      const client = await Aepp()
      /*
      const client = await Universal({
         url: 'http://localhost:3001',
         internalUrl: 'http://localhost:3001',
         compilerUrl:  'http://localhost:3080'
       });
      */
      const contract = await client.getContractInstance(identitySource)
      await contract.deploy()
      console.log(contract.deployInfo.address)

      console.log('Test')
      console.log(await contract.methods.main(0))
      console.log(await client.getNodeInfo())
    },
  }
</script>

<style scoped>

</style>
