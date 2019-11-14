<template>
  <div></div>
</template>

<script>
    import Aepp from '@aeternity/aepp-sdk/es/ae/aepp'
    import identitySource from './util/Identity.aes'

    export default {
        name: 'app',
        async mounted() {
            const getWalletWindow = async () => {
                const iframe = document.createElement('iframe');
                iframe.src = 'https://base.aepps.com/';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                await new Promise(resolve => {
                    const handler = ({data}) => {
                        if (data.method !== 'ready') return;
                        window.removeEventListener('message', handler);
                        resolve()
                    };
                    window.addEventListener('message', handler)
                });
                return iframe.contentWindow
            };

            const client = await Aepp({
                parent: await getWalletWindow().catch(console.error)
            }).catch(console.error);

            console.log(await client.address().catch(console.error));
            console.log(await client.spend(100, "ak_5UWWK5zMw2BiADw5SAxbdGTj8KFrenqB4LM9KMvAR1snWzKjw").catch(console.error));

            const contract = await client.getContractInstance(identitySource).catch(console.error);
            await contract.deploy().catch(console.error);
            console.log(contract.deployInfo.address);

            console.log(await contract.methods.main(2).catch(console.error));
            console.log(await client.getNodeInfo());
        },
    }
</script>

<style scoped>

</style>
