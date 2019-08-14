<template>

</template>

<script>
    import Aepp from '@aeternity/aepp-sdk/es/ae/aepp'
    import identitySource from '../util/Identity.aes';

    export default {
        name: 'Home',
        components: {},
        async mounted() {
            const client = await Aepp();
            const contract = await client.getContractInstance(identitySource);
            await contract.deploy();
            console.log(await contract.methods.main(42));
            console.log(await client.getNodeInfo());
        }
    }
</script>

<style scoped>
</style>
