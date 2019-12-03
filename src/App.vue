<template>
    <div></div>
</template>

<script>
  import Aepp from '@aeternity/aepp-sdk/es/ae/aepp'
  import identitySource from './util/Identity.aes'

  export default {
    name: 'app',
    async mounted () {
      const client = await Aepp.compose({deepConfiguration: {Ae: {methods: ['baseAppVersion']}}})();

      const contract = await client.getContractInstance(identitySource);
      await contract.deploy();
      console.log(contract.deployInfo.address);

      console.log('Test');
      console.log(await contract.methods.main(0));
      console.log(await client.getNodeInfo());
      console.log(await client.baseAppVersion());
    },
  }
</script>

<style scoped>

</style>
