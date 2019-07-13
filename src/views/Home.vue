<template>

</template>

<script>
    import aeternity from '../util/aeternity'
    import {detect} from 'detect-browser'

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                selectedClient: 'ledger'
            }
        },
        methods: {
            setError(e) {
                console.error(e)
            },
            async connectWallet() {
                if (this.selectedClient === 'baseaepp') {
                    if (window.parent !== window) {
                        const success = await aeternity.initBase()
                        if (!success) {
                            this.setError('An error occured while connecting to the Base aepp. Please make sure your Base aepp is up to date.')
                        }
                    } else {
                        this.setError(
                            'For the best Base æpp experience please open the æpp inside the Base æpp on your mobile device.',
                            this.removeError,
                            'Using aeternity Base æpp'
                        )
                    }
                }

                if (this.selectedClient === 'ledger') {

                    const browser = detect()
                    console.log("browser", browser)
                    if (browser && browser.name.indexOf('chrome') === -1) {
                        return this.setError('The ledger connection currently only works in google chrome or chromium.')
                    }

                    if (this.isMobile()) {
                        return this.setError('The ledger connection currently only works on the desktop.')
                    }

                    // Try Ledger
                    const success = await aeternity.initLedger()
                    if (!success) {
                        this.setError('An error occured while connecting to your ledger or phone through the base-aepp. If you have the base-aepp open on your desktop, close it now and try again.')
                    }
                }
            },
            isMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            }
        },
        async mounted() {
            console.log('is iframe', window.parent !== window)
            console.log('is mobile', this.isMobile(), navigator.userAgent)

            await this.connectWallet()
        }
    }
</script>

<style scoped>
</style>
